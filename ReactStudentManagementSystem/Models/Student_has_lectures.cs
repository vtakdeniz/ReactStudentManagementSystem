using System;
using System.Text.Json.Serialization;

namespace ReactStudentManagementSystem.Models
{
    public class Student_has_lectures
    {
        [JsonIgnore]
        public int student_id{ get; set; }

        [JsonIgnore]
        public Student student { get; set; }

        [JsonIgnore]
        public int lecture_id { get; set; }

        public Lecture lecture { get; set; }

    }
}
