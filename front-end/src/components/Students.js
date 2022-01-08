import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import Student from './Student';
import AddStudent from './AddStudent';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function Students() {
    
    let navigate=useNavigate();
    
    const [students, setStudents] = useState([]);
    const [showAdd, setshowAdd] = useState(false)

    useEffect(()=>{
        const fetchStudents=async() =>{
            let response= await fetch('https://localhost:5001/api/Student/');
            let data=await response.json();
            console.log(data);
            setStudents(data);
        }
        fetchStudents();
    },[]);
 
    const deleteStudent=async(id)=>{
        const res = await fetch(`https://localhost:5001/api/Student/${id}`,{method:'DELETE'});
        setStudents(students.filter(st=>st.id!==id));
    }
    
    const onAdd=async(student)=>{
        const res = await fetch('https://localhost:5001/api/Student/',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(student)
        })

        const data = await res.json();
        setStudents([...students,data]);
    }

    return (
        <div className='object-container'>
            <Routes>
                <Route path="addStudent" element={
                    <AddStudent setshowAdd={setshowAdd} showAdd={showAdd} onAdd={onAdd}/>
                }>
                </Route>
            </Routes>
            <button style={{marginLeft:"25px",marginTop:"15px"}} className={showAdd?"btn btn-danger":"btn btn-success"}
            onClick={()=>{showAdd?navigate("student"):navigate("addStudent");setshowAdd(!showAdd)}}>{showAdd?"Close":"Add Student"}</button>
            {students.map((student)=>(<Student key={student.id} student={student} deleteStudent={deleteStudent}/>))}
        </div>
    )
}

export default Students
