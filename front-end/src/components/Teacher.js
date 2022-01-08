import React from 'react'
import { useState } from 'react'
import TeacherInspect from './TeacherInspect'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';

function Teacher({teacher,deleteTeacher}) {

    let navigate = useNavigate();

    const [showInspect, setshowInspect] = useState(false)
    const [showDelete, setshowDelete] = useState(false)

    function navigateInspect(){
        if(!showInspect){
            navigate(`Inspect/${String(teacher.id)}`)
        }
        else{
            navigate("/teachers")
        }
        setshowInspect(!showInspect);
    }

    return (
        <div className='object-box'>
            <table className="table table-bordered ">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Teacher's</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Age</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#</td>
                        <td>{teacher.first_name}</td>
                        <td>{teacher.last_name}</td>
                        <td>{teacher.age}</td>
                        <td style={{display:"flex",justifyContent:"space-evenly"}}><a className='btn btn-success'
                             onClick={()=>navigateInspect()}>Inspect</a>
                            <a className='btn btn-danger' 
                            onClick={()=>{setshowDelete(!showDelete);deleteTeacher(teacher.id)}}>Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            {
                 <Routes>
                    <Route path={`Inspect/${String(teacher.id)}`} element={
                           <TeacherInspect teacher={teacher}/>
                    }>
                        {console.log("test")}
                    </Route>
                 </Routes>
            }
        </div>
    )
}

export default Teacher
