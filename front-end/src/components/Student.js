import React from 'react'
import { useState } from 'react'
import AddStudent from './AddStudent'
import StudentInspect from './StudentInspect'

function Student({student,deleteStudent}) {

    const [showInspect, setshowInspect] = useState(false)
    const [showDelete, setshowDelete] = useState(false)
    const [showAddLecture, setshowAddLecture] = useState(false)
    const [studentClasses, setStudentClasses] = useState([])
    const [availableLectures, setavailableLectures] = useState([])
    const [selectedCourse, setselectedCourse] = useState(0);

    const fetchStudentInspect=async(id)=>{
            let response= await fetch(`https://localhost:5001/api/Student/Inspect/${id}`);
            let data=await response.json();
            console.log(data);
            setStudentClasses(data.student_Has_Lectures);
    }

    const fetchAvailableLectures=async(id)=>{
        let response= await fetch(`https://localhost:5001/api/Student/Available/${id}`);
        let data=await response.json();
        console.log(data);
        setavailableLectures(data);
    }
   
    function handleChange(e){
        console.log(e.target.value);
        setselectedCourse(e.target.value);
    }

    const onAdd=async(dto)=>{
        console.log(JSON.stringify(dto))
        const res = await fetch('https://localhost:5001/api/Student/AddLectureSt/',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(dto)
        })
        
        const data = await res.json();
        console.log(data);
        console.log(studentClasses);
        setStudentClasses([...studentClasses,{lecture:data}]);
    }

    function onSubmit(e){
        e.preventDefault();

        if(!selectedCourse){
            alert('Please fill all the required fields');
            return;
        }

        onAdd({lecture_id:selectedCourse,student_id:student.id});
        setselectedCourse(0)
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
                            <a className='btn btn-primary' 
                            onClick={()=>{setshowAddLecture(!showAddLecture);fetchAvailableLectures(student.id)}}>
                                Add Class</a>
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
            {
                showAddLecture&&
                <div>
                     <form className='add-form' onSubmit={onSubmit}>
                            <select value={selectedCourse}  onChange={handleChange} className="form-control">
                                <option></option>
                                {
                                    showAddLecture&&
                                    availableLectures.map((lecture)=><option key={lecture.id} 
                                    value={lecture.id}>
                                        {"Id : "+lecture.id+"  |  Lecture name  : " +lecture.lecture_name}
                                    </option>)
                                }
                            </select>
                        <input type='submit' value='Save Lecture' className='btn btn-primary'></input>
                    </form>
                </div>
            }
        </div>
    )
}

export default Student
