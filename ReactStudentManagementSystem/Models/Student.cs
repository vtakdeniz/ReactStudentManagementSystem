using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ReactStudentManagementSystem.Models
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int school_number { get; set; }
        [Required]
        public string first_name { get; set; }
        [Required]
        public string last_name { get; set; }
        [Required]
        public int class_year { get; set; }
        public DateTime enrollment_date { get; set; } = DateTime.Now;
        [Required]
        public int age { get; set; }

        public List<Student_has_lectures> student_Has_Lectures{ get; set; }

    }
}
