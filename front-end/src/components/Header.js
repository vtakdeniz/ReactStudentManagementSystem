import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';


function Header({title , onLectureClick, onTeacherClick, onStudentClick}) {
    let navigate=useNavigate();
    let counter=useSelector(state=>state.counter);

    const dispatch = useDispatch();

    return (
        <div className='header-container'>
             <h2 style={{background:"#FFB133",borderRadius:"20px",padding:"30px",fontSize:"40px"}}>
                    {title}
             </h2><br></br>
             <p>
                 {"Registered Student : "+counter.student_count+" ; Lecture : "+counter.lecture_count+" ; Teacher : "+counter.teacher_count}
             </p>
             <div className="header-buttons btn-group btn-group-justified">
                <div className="btn-group">
                    <button type="button" className="btn btn-primary" onClick={()=>{navigate("/students")}}>Students</button>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-primary" onClick={()=>{navigate("/lectures")}}>Lectures</button>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-primary" onClick={()=>{navigate("/teachers")}}>Teachers</button>
                </div>
            </div>
        </div>
    )
}

export default Header
