import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import Teacher from './Teacher';

function Teachers() {
    
    const [teachers, setTeachers] = useState([]);

    useEffect(()=>{
        const fetchTeachers=async() =>{
            let response= await fetch('https://localhost:5001/api/Teacher');
            let data=await response.json();
            console.log(data);
            setTeachers(data);
        }
        fetchTeachers();
    },[]);

    const deleteTeacher=async(id)=>{
        const res = await fetch(`http://localhost:5000/api/Teacher/${id}`,{method:'DELETE'});
        setTeachers(teachers.filter(tc=>tc.id!==id));
    }

    return (
        <div className='object-container'>
            <button style={{marginLeft:"25px",marginTop:"15px"}} className='btn btn-success'>Add Teacher</button>
            {teachers.map((teacher)=>(<Teacher key={teacher.id} teacher={teacher} deleteTeacher={deleteTeacher}/>))}
        </div>
    )
}

export default Teachers
