import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

function AddLecture({setshowAdd,showAdd,onAdd,lecturers,fetchLecturers}) {
    const [lecture_name, setlecture_name] = useState('');
    const [classroom_code, setclassroom_code] = useState('');
    const [lecturer_id, setlecturer_id] = useState(0);
    const [lecture_year, setlecture_year] = useState(0);
    
    useEffect(() => {
        fetchLecturers();
    }, [])

    const onSubmit=(e)=>{
        e.preventDefault();

        if(!lecture_name||!classroom_code||!lecturer_id){
            alert('Please fill all the required fields');
            return;
        }

        console.log(lecturer_id);
        onAdd({lecture_name,classroom_code,lecturer_id,lecture_year});
        setlecture_name('')
        setclassroom_code('')
        setlecturer_id(0);
        setlecture_year(0);
    }

    function handleChange(e){
        console.log(e.target.value);
        setlecturer_id(e.target.value);
    }

    return (
        <div>
            <div>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-controlx'>
                    <label>Lecture Name</label>
                    <input type='text' placeholder='Add Lecture Name'
                    value={lecture_name}
                    onChange={(e)=> setlecture_name(e.target.value)}
                    >
                    </input>
                </div>

                <div className='form-controlx'>
                    <label>Classroom Code</label>
                    <input type='text'
                    placeholder='Add Classroom Code'
                    value={classroom_code}
                    onChange={(e)=> setclassroom_code(e.target.value)}
                    >
                    </input>
                </div>

                <select value={lecturer_id}  onChange={handleChange} className="form-control">
                    <option></option>
                    {
                        showAdd&&
                        lecturers.map((teacher)=><option key={teacher.id} 
                        value={teacher.id}>
                            {"Id : "+teacher.id+"  |  Full name  : " +teacher.first_name +" "+teacher.last_name}
                        </option>)
                    }
                </select>

                <div className='form-controlx'>
                    <label>Lecture's Year</label>
                    <input type='number' placeholder='Enter Lecture Year'
                    value={lecture_year}
                    onChange={(e)=> setlecture_year(e.target.value)}
                    >
                    </input>
                </div>

                <input type='submit' value='Save Lecture' className='btn btn-primary'></input>
            </form>
        </div>
        </div>
    )
}

export default AddLecture
