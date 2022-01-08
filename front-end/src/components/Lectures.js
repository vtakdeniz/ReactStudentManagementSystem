import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import AddLecture from './AddLecture';
import Lecture from './Lecture';

function Lectures() {
    
    const [lectures, setLectures] = useState([]);
    const [showAdd, setshowAdd] = useState(false)
    const [lecturers,setLecturers]=useState([]);

    useEffect(()=>{
        const fetchLectures=async() =>{
            let response= await fetch('https://localhost:5001/api/Lecture');
            let data=await response.json();
            console.log(data);
            setLectures(data);
        }
        fetchLectures();
    },[]);

    const deleteLecture=async(id)=>{
        const res = await fetch(`https://localhost:5001/api/Lecture/${id}`,{method:'DELETE'});
        setLectures(lectures.filter(l=>l.id!==id));
    }

    const fetchLecturers=async()=>{
        let response= await fetch('https://localhost:5001/api/Teacher/');
        let data=await response.json();
        setLecturers(data);
    }

    const onAdd=async(lecture)=>{
        console.log(lecture)
        console.log(JSON.stringify(lecture))
        const res = await fetch('https://localhost:5001/api/Lecture/',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(lecture)
        })
        
        const data = await res.json();
        setLectures([...lectures,data]);
    }

    return (
        <div className='object-container'>
            {
                showAdd&&
                <AddLecture setshowAdd={setshowAdd} showAdd={showAdd} onAdd={onAdd} lecturers={lecturers}/>
            }
            <button style={{marginLeft:"25px",marginTop:"15px"}} className={showAdd?"btn btn-danger":"btn btn-success"}
             onClick={()=>{setshowAdd(!showAdd);fetchLecturers()}}>{showAdd?"Close":"Add Lecture"}</button>
            {lectures.map((lecture)=>(<Lecture key={lecture.id} lecture={lecture} deleteLecture={deleteLecture}/>))}
        </div>
    )
}

export default Lectures
