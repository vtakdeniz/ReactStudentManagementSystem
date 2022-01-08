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
    [Route("api/[controller]")]
    [ApiController]
    public class LectureController : Controller
    {
        private readonly ManagementContext _db;

        public LectureController(ManagementContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult Index()
        {
            List<Lecture> lectures = _db.lectures.Include(le => le.lecturer).ToList();
            return Ok(lectures);
        }


        [HttpPost]
        public IActionResult Create(Lecture lecture)
        {
            if (lecture==null) {
                return BadRequest();
            }
            if (_db.teachers.FirstOrDefault(t=>t.Id==lecture.lecturer_id)==null) {
                return BadRequest();
            }

            _db.lectures.Add(lecture);
            _db.SaveChanges();
            return CreatedAtRoute(new { Id=lecture.Id},lecture);
        }

        [HttpPut]
        public IActionResult Edit(Lecture lecture)
        {
            var lectureFromRepo = _db.lectures.Find(lecture.Id);

            if (lecture == null||lectureFromRepo==null)
            {
                return BadRequest();
            }

            _db.lectures.Update(lecture);
            _db.SaveChanges();
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
            return NoContent();
        }

    }
}
