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
    public class TeacherController:Controller
    {
        private readonly ManagementContext _db;

        public TeacherController(ManagementContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult Index()
        {
            List<Teacher> teachers = _db.teachers.ToList();
            return Ok(teachers);
        }

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

        [HttpDelete("{id}")]
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

        [HttpGet("Inspect/{id}")]
        public IActionResult Inspect(int? id)
        {
            var teacher = _db.teachers.Include(t => t.lectures).FirstOrDefault(t=>t.Id==id);
            if (teacher==null)
            {
                return BadRequest();
            }
            return Ok(teacher);
        }

    }
}
