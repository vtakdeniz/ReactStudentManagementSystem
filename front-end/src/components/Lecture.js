import React from 'react'
import { useState } from 'react'
import LectureForm from './LectureForm';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function Lecture({lecture,deleteLecture,editOnAdd}) {
    let navigate=useNavigate();
    const [showDelete, setshowDelete] = useState(false)
    const [showEdit, setshowEdit] = useState(false)

    function navigateEditLecture(){
        if(!showEdit){
            navigate(`Edit/${String(lecture.id)}`);
        }
        else{
            navigate("/lectures");
        }
        setshowEdit(!showEdit)
        setshowEdit(false);
    }
    return (
        <div className='object-box'>
            <table className="table table-bordered ">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Lecture's</th>
                        <th scope="col">Lecture Name</th>
                        <th scope="col">Lecture Year</th>
                        <th scope="col">Lecturer's Id</th>
                        <th scope="col">Lecturer's name</th>
                        <th scope="col">Lecture's classroom code</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#</td>
                        <td>{lecture.lecture_name}</td>
                        <td>{lecture.lecture_year}</td>
                        <td>{lecture.lecturer.id}</td>
                        <td>{lecture.lecturer.first_name}</td>
                        <td>{lecture.classroom_code}</td>
                        <td style={{display:"flex",justifyContent:"space-evenly"}}>
                            <a className='btn btn-danger' onClick={()=>{setshowDelete(!showDelete);deleteLecture(lecture.id)}}>Delete</a>
                            <a className={showEdit?'btn btn-danger':'btn btn-warning'} 
                            onClick={()=>{navigateEditLecture()}}>
                                {showEdit?'Close':'Edit Lecture'} </a>
                        </td>
                    </tr>
                </tbody>
            </table>


            {
                <Routes>
                    <Route path={`Edit/${String(lecture.id)}`} element={
                            <LectureForm  isEdit={true}
                             lecture={lecture} onAdd={editOnAdd}/>
                        }>
                    </Route>
                </Routes>

            }  

        </div>
    )
}

export default Lecture
