using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ReactStudentManagementSystem.Models
{
    public class Lecture
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string lecture_name { get; set; }

        [Required]
        public string classroom_code { get; set; }

        [JsonIgnore]
        public Teacher lecturer { get; set; }

        [Required]
        public int lecturer_id { get; set; }

        public int lecture_year { get; set; }

        [JsonIgnore]
        public List<Student_has_lectures> lecture_Has_Students { get; set; }
    }
}
