using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ReactStudentManagementSystem.Data;
using ReactStudentManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace StudentManagementSystem.Controllers
{
    public class StudentController:Controller
    {
        private readonly ManagementContext _db;

        public StudentController(ManagementContext db)
        {
            _db = db;
        }

        public IActionResult Index() {
            List<Student> students = _db.students.ToList();
            return Ok(students);
        }

        [HttpPost]
        public IActionResult Create(Student student)
        {
            if (ModelState.IsValid) {

                if (_db.students.FirstOrDefault(st => st.school_number == student.school_number) != null) {
                    TempData["isSchoolNumberDuplicate"] = true; 
                    return View(student);
                }

                _db.students.Add(student);
                _db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(student);
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

        [HttpDelete]
        public IActionResult DeleteStudent(int? id) {
            var student = _db.students.FirstOrDefault(st=>st.Id==id);

            if (student == null) {
                return NotFound();
            }
            _db.students.Remove(student);
            _db.SaveChanges();
            return RedirectToAction("Index");
        }

        [HttpGet("Inspect/{id}")]
        public IActionResult Inspect(int? id) {
            var student = _db.students.Include(st=>st.student_Has_Lectures).ThenInclude(sh=>sh.lecture).ThenInclude(le=>le.lecturer).FirstOrDefault(st => st.Id == id);

            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        [HttpPost]
        [HttpPost("AddLectureSt/{id}")]
        public IActionResult AddLectureToStudent(int id, Lecture lecture) {
            return Ok();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult RemoveLecture([FromForm]int lecture_id, [FromForm] int student_id) {
            var relation = _db.student_Has_Lectures.FirstOrDefault(r=>r.lecture_id==lecture_id || r.student_id==student_id );
            if (relation == null) {
                return NotFound();
            }

            _db.student_Has_Lectures.Remove(relation);
            _db.SaveChanges();
            return RedirectToAction("Inspect",new { id=student_id });
            
        }

    }
}
