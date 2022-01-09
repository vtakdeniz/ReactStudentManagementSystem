import React from 'react'
import { useState } from 'react'
import TeacherInspect from './TeacherInspect'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import TeacherForm from './TeacherForm';

function Teacher({teacher,deleteTeacher,editOnAdd}) {

    let navigate = useNavigate();

    const [showInspect, setshowInspect] = useState(false)
    const [showDelete, setshowDelete] = useState(false)
    const [showEdit, setshowEdit] = useState(false)

    function navigateInspect(){
        if(!showInspect){
            navigate(`Inspect/${String(teacher.id)}`)
        }
        else{
            navigate("/teachers")
        }
        setshowInspect(!showInspect);
        setshowEdit(false);
    }

    function navigateEdit(){

            if(!showEdit){
                navigate(`Edit/${String(teacher.id)}`);
            }
            else{
                navigate("/teachers");
            }
            setshowEdit(!showEdit)
            setshowInspect(false);
        
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
                        <td style={{display:"flex",justifyContent:"space-evenly"}}><a className={showInspect?'btn btn-danger':'btn btn-success'}
                             onClick={()=>navigateInspect()}>{showInspect?'Close':'Inspect'}</a>
                            <a className='btn btn-danger' 
                            onClick={()=>{setshowDelete(!showDelete);deleteTeacher(teacher.id)}}>Delete</a>
                            <a className={showEdit?'btn btn-danger':'btn btn-warning'} 
                            onClick={navigateEdit}>{showEdit?'Close':'Edit'} </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            {
                 <Routes>
                    <Route path={`Inspect/${String(teacher.id)}`} element={
                           <TeacherInspect teacher={teacher}/>
                    }>
                    </Route>
                    <Route path={`Edit/${String(teacher.id)}`} element={
                            <TeacherForm  isEdit={true}
                             teacher={teacher} onAdd={editOnAdd}/>
                        }>
                    </Route>
                 </Routes>
            }
        </div>
    )
}

export default Teacher
