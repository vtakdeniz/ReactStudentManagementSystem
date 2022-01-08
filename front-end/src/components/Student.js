import React from 'react'
import { useState } from 'react'
import AddStudent from './AddStudent'
import StudentInspect from './StudentInspect'

function Student({student,deleteStudent}) {

    const [showInspect, setshowInspect] = useState(false)
    const [showDelete, setshowDelete] = useState(false)
    const [showAddLecture, setshowAddLecture] = useState(false)
    const [studentClasses, setStudentClasses] = useState([])

    const fetchStudentInspect=async(id)=>{
            let response= await fetch(`https://localhost:5001/api/Student/Inspect/${id}`);
            let data=await response.json();
            console.log(data);
            setStudentClasses(data.student_Has_Lectures);
    }

   

    return (

        <div className='object-box'>
            <table className="table table-bordered ">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Student's</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">School number</th>
                        <th scope="col">Class Year</th>
                        <th scope="col">Enrollment Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#</td>
                        <td>{student.first_name}</td>
                        <td>{student.last_name}</td>
                        <td>{student.age}</td>
                        <td>{student.school_number}</td>
                        <td>{student.class_year}</td>
                        <td>{student.enrollment_date}</td>
                        <td style={{display:"flex",justifyContent:"space-evenly"}}>
                            <a className='btn btn-success'
                            onClick={()=>{setshowInspect(!showInspect);fetchStudentInspect(student.id)}}>Inspect</a>
                            <a className='btn btn-danger' 
                            onClick={()=>{setshowDelete(!showDelete);deleteStudent(student.id)}}>
                                Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>

            {
                showInspect&&
                <StudentInspect studentLectures={studentClasses} setStudentClasses={setStudentClasses}/>
            }
            
        </div>
    )
}

export default Student
