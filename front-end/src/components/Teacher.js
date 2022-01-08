import React from 'react'
import { useState } from 'react'

function Teacher({teacher,deleteTeacher}) {

    const [showInspect, setshowInspect] = useState(false)
    const [showDelete, setshowDelete] = useState(false)

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
                        <td style={{display:"flex",justifyContent:"space-evenly"}}><a className='btn btn-success'  onClick={()=>setshowInspect(!showInspect)}>Inspect</a>
                            <a className='btn btn-danger' 
                            onClick={()=>{setshowDelete(!showDelete);deleteTeacher(teacher.id)}}>Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div>

            </div>
        </div>
    )
}

export default Teacher
