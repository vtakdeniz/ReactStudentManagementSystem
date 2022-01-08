using System;
using System.Collections.Generic;
using ReactStudentManagementSystem.Models;

namespace ReactStudentManagementSystem.Dto
{
    public class InspectTeacherDto
    {
        public Teacher teacher { get; set; }
        public List<Lecture> lectures { get; set; }
    }
}
