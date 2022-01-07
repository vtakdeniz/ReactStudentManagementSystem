using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ReactStudentManagementSystem.Data;
using ReactStudentManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace ReactStudentManagementSystem.Controllers
{
    public class LectureController : Controller
    {
        private readonly ManagementContext _db;

        public LectureController(ManagementContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            List<Lecture> lectures = _db.lectures.Include(le => le.lecturer).ToList();
            return Ok(lectures);
        }


        [HttpPost]
        public IActionResult Create(Lecture lecture)
        {
            return Ok();
        }

        [HttpPut]
        public IActionResult Edit(Lecture lecture)
        {
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteLecture(int? id)
        {
            var lecture = _db.lectures.FirstOrDefault(st => st.Id == id);

            if (lecture == null)
            {
                return NotFound();
            }
            _db.lectures.Remove(lecture);
            _db.SaveChanges();
            return RedirectToAction("Index");
        }

    }
}
