import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import LectureForm from './LectureForm';
import Lecture from './Lecture';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import * as action from '../actions';

function Lectures() {
    let navigate=useNavigate();
        
    const [lectures, setLectures] = useState([]);
    const [showAdd, setshowAdd] = useState(false)
    const [lecturers,setLecturers]=useState([]);

    let counter=useSelector(state=>state.counter);
    const dispatch = useDispatch();

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
        dispatch(action.decrementLectureCount())
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
        dispatch(action.incrementLectureCount());
    }

    const editOnAdd=async (lecture)=>{
        const res = await fetch(`https://localhost:5001/api/Lecture/`,
        {
          method:'PUT',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify(lecture)
        })
    
        const data = await res.json();
        console.log(data);
    
        setLectures(
        lectures.map((element)=>element.id===lecture.id ? 
        data
          : element));
    }

    return (
        <div className='object-container'>
            <Routes>
                <Route path="addLecture" element={
                    <LectureForm setshowAdd={setshowAdd} showAdd={showAdd} onAdd={onAdd} lecturers={lecturers} fetchLecturers={fetchLecturers}/>
                }>
                </Route>
            </Routes>
            <button style={{marginLeft:"25px",marginTop:"15px"}} className={showAdd?"btn btn-danger":"btn btn-success"}
             onClick={()=>{showAdd?navigate("/lectures"):navigate("addLecture");setshowAdd(!showAdd)}}>
                 {showAdd?"Close":"Add Lecture"}</button>
            {lectures.map((lecture)=>(<Lecture key={lecture.id} lecture={lecture}
             deleteLecture={deleteLecture} editOnAdd={editOnAdd}/>))}
        </div>
    )
}

export default Lectures
