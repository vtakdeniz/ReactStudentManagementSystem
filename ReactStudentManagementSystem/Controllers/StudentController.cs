using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ReactStudentManagementSystem.Data;
using ReactStudentManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
using ReactStudentManagementSystem.Dto;

namespace ReactStudentManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController:Controller
    {
        private readonly ManagementContext _db;

        public StudentController(ManagementContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult Index() {
            List<Student> students = _db.students.ToList();
            return Ok(students);
        }

        [HttpPost]
        public IActionResult Create(Student student)
        {

            if (_db.students.FirstOrDefault(st => st.school_number == student.school_number) != null) {
                return BadRequest();
            }

            _db.students.Add(student);
            _db.SaveChanges();
            
            return CreatedAtRoute(new { Id = student.Id }, student);
        }

        [HttpPut]
        public IActionResult Edit(Student student)
        {
            if (ModelState.IsValid) {
                _db.students.Update(student);
                _db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(student);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteStudent(int? id) {
            var student = _db.students.FirstOrDefault(st=>st.Id==id);

            if (student == null) {
                return NotFound();
            }
            _db.students.Remove(student);
            _db.SaveChanges();
            return NoContent();
        }

        [HttpGet("Inspect/{id}")]
        public IActionResult Inspect(int? id) {
            var student = _db.students.Include(st=>st.student_Has_Lectures).ThenInclude(sh=>sh.lecture).FirstOrDefault(st => st.Id == id);

            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        [HttpPost("AddLectureSt")]
        public IActionResult AddLectureToStudent(LectureStudentDto addLectureToStudentDto) {
            var student = _db.students.Include(st => st.student_Has_Lectures).ThenInclude(sh => sh.lecture).ThenInclude(le => le.lecturer).FirstOrDefault(st => st.Id == addLectureToStudentDto.student_id);
            var lecture = _db.lectures.FirstOrDefault(le => le.Id == addLectureToStudentDto.lecture_id);

            if (lecture==null||student==null) {
                return NotFound();
            }

            if (lecture.lecture_year > student.class_year)
            {
                return BadRequest();
            }

            foreach (var element in student.student_Has_Lectures)
            {
                if (lecture.Id == element.lecture_id)
                {
                    return BadRequest();
                }
            }

            var student_has_lecture = new Student_has_lectures { student_id = student.Id, student = student, lecture_id = lecture.Id, lecture = lecture };
            _db.student_Has_Lectures.Add(student_has_lecture);
            _db.students.Update(student);
            _db.SaveChanges();

            return Ok(lecture);
        }

        [HttpDelete("removeLecture")]
        public IActionResult RemoveLecture(LectureStudentDto lectureStudentDto) {
            var relation = _db.student_Has_Lectures.FirstOrDefault(r=>r.lecture_id==lectureStudentDto.lecture_id || r.student_id==lectureStudentDto.student_id );
            if (relation == null) {
                return NotFound();
            }

            _db.student_Has_Lectures.Remove(relation);
            _db.SaveChanges();
            return NoContent();
            
        }

        [HttpGet("available/{id}")]
        public IActionResult availableLectures(int? id) {
            var student = _db.students.Include(st => st.student_Has_Lectures).ThenInclude(sh => sh.lecture).ThenInclude(le => le.lecturer).FirstOrDefault(st => st.Id == id);
            if (student == null)
            {
                return NotFound();
            }

            var lectures = _db.lectures.ToList();

            if (lectures != null)
            {
                foreach (var element in student.student_Has_Lectures)
                {
                    var lecture_to_remove = lectures.Find(lc => lc.Id == element.lecture_id);
                    if (lecture_to_remove != null)
                    {
                        lectures.Remove(lecture_to_remove);
                    }
                }
            }

            return Ok(lectures);
        }

    }
}
