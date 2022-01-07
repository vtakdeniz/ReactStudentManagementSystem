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
    public class TeacherController:Controller
    {
        private readonly ManagementContext _db;

        public TeacherController(ManagementContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            List<Teacher> teachers = _db.teachers.ToList();
            return Ok(teachers);
        }

        /*public IActionResult Create()
        {
            return View();
        }*/

        [HttpPost]
        public IActionResult Create(Teacher teacher)
        {
            if (ModelState.IsValid) { 
                _db.teachers.Add(teacher);
                _db.SaveChanges();
            }
            return CreatedAtRoute(new {Id=teacher.Id},teacher);
        }


        [HttpPut]
        public IActionResult Edit(Teacher teacher)
        {
            if (ModelState.IsValid)
            {
                _db.teachers.Update(teacher);
                _db.SaveChanges();
            }
            return NoContent();
        }

        public IActionResult Delete(int? id)
        {
            if (id == null || id == 0)
            {
                return NotFound();
            }

            var teacher= _db.teachers.FirstOrDefault(te=> te.Id == id);
            if (teacher== null)
            {
                return NotFound();
            }
            return View(teacher);
        }

        [HttpDelete]
        public IActionResult DeleteTeacher(int? id)
        {
            var teacher= _db.teachers.FirstOrDefault(te=> te.Id == id);

            if (teacher== null)
            {
                return NotFound();
            }
            _db.teachers.Remove(teacher);
            _db.SaveChanges();
            return NoContent();
        }
        
        public IActionResult Inspect(int? id)
        {
            var teacher = _db.teachers.FirstOrDefault(t=>t.Id==id);
            var lecturesOfTeacher = _db.lectures.Where(le => le.lecturer.Id == teacher.Id).ToList();
            ViewBag.lecturesOfTeacher = lecturesOfTeacher;
            return Ok(teacher);
        }

    }
}
