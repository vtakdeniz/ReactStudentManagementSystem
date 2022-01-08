import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import AddTeacher from './AddTeacher';
import Teacher from './Teacher';

function Teachers() {
    
    const [teachers, setTeachers] = useState([]);
    const [showAdd, setshowAdd] = useState(false)

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
        const res = await fetch(`https://localhost:5001/api/Teacher/${id}`,{method:'DELETE'});
        setTeachers(teachers.filter(tc=>tc.id!==id));
    }

    const onAdd=async(teacher)=>{
        const res = await fetch('https://localhost:5001/api/Teacher/',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(teacher)
        })

        const data = await res.json();
        setTeachers([...teachers,data]);
    }

    return (
        <div className='object-container'>
             {
                showAdd&&
                <AddTeacher setshowAdd={setshowAdd} showAdd={showAdd} onAdd={onAdd} />
            }
            <button style={{marginLeft:"25px",marginTop:"15px"}} className={showAdd?"btn btn-danger":"btn btn-success"}
             onClick={()=>{setshowAdd(!showAdd)}}>{showAdd?"Close":"Add Teacher"}</button>
            {teachers.map((teacher)=>(<Teacher key={teacher.id} teacher={teacher} deleteTeacher={deleteTeacher}/>))}
        </div>
    )
}

export default Teachers
