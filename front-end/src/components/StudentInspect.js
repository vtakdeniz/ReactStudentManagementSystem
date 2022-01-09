import React from 'react'
import { useEffect } from 'react';

class StudentInspect extends React.Component {

    constructor(props) {
      super(props)
      console.log("props");
      console.log(this.props);
      this.props.fetchStudentInspect(this.props.student.id);
      this.state = {
        query: ''
      }
    }

    setClasses = async (e)=>{
        const res = await fetch(`https://localhost:5001/api/Student/removeLecture`,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                student_id:e.student_id,
                lecture_id:e.lecture_id
            })
        });
        this.props.setStudentClasses(this.props.studentLectures.filter(lec=>lec.lecture.id!==e.lecture_id));
    }

  
    render() {
      return (
        <div>
        <ul className="list-group object-inspect-list">
            {this.props.studentLectures.map((e,i)=>
                <li key={i} className="list-group-item object-inspect-list-item">
                    <h3>Lecture Name : {e.lecture_name} | Classroom Code : {e.lecture.classroom_code}</h3>
                    <a  className="btn btn-danger" 
                        onClick={()=>this.setClasses(e)}>
                        Delete class
                    </a>
                </li>
            )}
            
        </ul>
    </div>
      )
    }
  }


export default StudentInspect