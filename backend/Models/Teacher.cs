using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ReactStudentManagementSystem.Models
{
    public class Teacher
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string first_name { get; set; }
        [Required]
        public string last_name { get; set; }
        [Required]
        public int age { get; set; }
        public List<Lecture> lectures;
    }
}
