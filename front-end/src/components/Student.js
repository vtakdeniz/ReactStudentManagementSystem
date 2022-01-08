import React from 'react'
import { useState } from 'react'
import AddStudent from './AddStudent'
import StudentInspect from './StudentInspect'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

function Student({student,deleteStudent}) {

    let navigate = useNavigate();

    const [showInspect, setshowInspect] = useState(false)
    const [showDelete, setshowDelete] = useState(false)
    const [showAddLecture, setshowAddLecture] = useState(false)
    const [studentClasses, setStudentClasses] = useState([])
    const [availableLectures, setavailableLectures] = useState([])
    const [selectedCourse, setselectedCourse] = useState(0);

    useEffect(() => {
        fetchAvailableLectures(student.id)
    }, [])
    
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

    function navigateAddLecture(){
        if(!showAddLecture){
            navigate(`AddClass/${String(student.id)}`);
        }
        else{
            navigate("/students");
        }
        setshowAddLecture(!showAddLecture)
        setshowInspect(!showInspect)
    }

    function navigateInspect(){
        if(!showInspect){
            navigate(`Inspect/${String(student.id)}`)
        }
        else{
            navigate("/students")
        }
        setshowInspect(!showInspect)
        setshowAddLecture(!showAddLecture)
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
                            onClick={()=>{navigateInspect();fetchStudentInspect(student.id)}}>Inspect</a>
                            <a className='btn btn-primary' 
                            onClick={()=>{navigateAddLecture();fetchAvailableLectures(student.id)}}>
                                Add Class</a>
                            <a className='btn btn-danger' 
                            onClick={()=>{setshowDelete(!showDelete);deleteStudent(student.id)}}>
                                Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>

        
            {
                <Routes>
                    <Route path={`Inspect/${String(student.id)}`} element={
                            <StudentInspect studentLectures={studentClasses} setStudentClasses={setStudentClasses}
                            fetchStudentInspect={fetchStudentInspect} student={student}/>
                        }>
                    </Route>

                    <Route path={`AddClass/${String(student.id)}`} element={
                            <div>
                            <form className='add-form' onSubmit={onSubmit}>
                                <select value={selectedCourse}  onChange={handleChange} className="form-control">
                                    <option></option>
                                    {
                                        availableLectures.map((lecture)=><option key={lecture.id} 
                                        value={lecture.id}>
                                            {"Id : "+lecture.id+"  |  Lecture name  : " +lecture.lecture_name}
                                        </option>)
                                    }
                                </select>
                            <input type='submit' value='Save Lecture' className='btn btn-primary'></input>
                            </form>
                        </div>
                    }>
                    </Route>
                </Routes>

            }  
            
        </div>
    )
}

export default Student
