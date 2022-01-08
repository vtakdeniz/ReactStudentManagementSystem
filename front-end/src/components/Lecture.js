import React from 'react'
import { useState } from 'react'

function Lecture({lecture,deleteLecture}) {
    const [showInspect, setshowInspect] = useState(false)
    const [showDelete, setshowDelete] = useState(false)

    return (
        <div className='object-box'>
            <table className="table table-bordered ">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Lecture's</th>
                        <th scope="col">Lecture Name</th>
                        <th scope="col">Lecture Year</th>
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
                        <td>{lecture.lecturer.first_name}</td>
                        <td>{lecture.classroom_code}</td>
                        <td style={{display:"flex",justifyContent:"space-evenly"}}><a className='btn btn-success' onClick={()=>setshowInspect(!showInspect)}>Inspect</a>
                            <a className='btn btn-danger' onClick={()=>{setshowDelete(!showDelete);deleteLecture(lecture.id)}}>Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Lecture
