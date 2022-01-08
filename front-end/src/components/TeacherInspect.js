import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

function TeacherInspect({teacher}) {
    const [lectures, setlectures] = useState([]);

    useEffect(() => {
        console.log("test");
        const fetchTeacherLectures=async()=>{
            let response= await fetch(`https://localhost:5001/api/Teacher/Inspect/${teacher.id}`);
            let data=await response.json();
            console.log(data);
            setlectures(data.lectures);
        }
        fetchTeacherLectures();
    }, [])
    

    return (
        <div>
            <ul className="list-group object-inspect-list">
                {lectures.map((e,i)=>
                    <li key={i} className="list-group-item object-inspect-list-item">
                        <h3>Lecture Name : {e.lecture_name} | Classroom Code : {e.classroom_code}</h3>
                    </li>
                )}
                
            </ul>
        </div>
    )
}

export default TeacherInspect
