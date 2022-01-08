import React from 'react'


function Header({title , onLectureClick, onTeacherClick, onStudentClick}) {
    return (
        <div className='header-container'>
             <h2 style={{background:"#FFB133",borderRadius:"20px",padding:"30px",fontSize:"40px"}}>
                    {title}
             </h2>
             <div className="header-buttons btn-group btn-group-justified">
                <div className="btn-group">
                    <button type="button" className="btn btn-primary" onClick={onStudentClick}>Students</button>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-primary" onClick={onLectureClick}>Lectures</button>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-primary" onClick={onTeacherClick}>Teachers</button>
                </div>
            </div>
        </div>
    )
}

export default Header
