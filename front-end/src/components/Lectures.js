import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import Lecture from './Lecture';

function Lectures() {
    
    const [lectures, setLectures] = useState([]);

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
        const res = await fetch(`http://localhost:5000/api/Lecture/${id}`,{method:'DELETE'});
        setLectures(lectures.filter(l=>l.id!==id));
    }

    return (
        <div className='object-container'>
            <button style={{marginLeft:"25px",marginTop:"15px"}} className='btn btn-success'>Add Lecture</button>
            {lectures.map((lecture)=>(<Lecture key={lecture.id} lecture={lecture} deleteLecture={deleteLecture}/>))}
        </div>
    )
}

export default Lectures
