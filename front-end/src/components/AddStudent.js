import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

function AddStudent({setshowAdd,showAdd,onAdd}) {

    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [age, setage] = useState(0);
    const [school_number, setschool_number] = useState(0);
    const [class_year, setclass_year] = useState(0);

    useEffect(() => {
        setshowAdd(true);
    }, [])

    const onSubmit=(e)=>{
        e.preventDefault();

        if(!first_name||!last_name||!age||!school_number||!class_year){
            alert('Please fill all the fields');
            return;
        }

        onAdd({first_name,last_name,age,school_number,class_year});
        setfirst_name('')
        setlast_name('')
        setage(0);
        setschool_number(0);
        setclass_year(0);
    }
    return (
        <div>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-controlx'>
                    <label>First Name</label>
                    <input type='text' placeholder='Add First Name'
                    value={first_name}
                    onChange={(e)=> setfirst_name(e.target.value)}
                    >
                    </input>
                </div>

                <div className='form-controlx'>
                    <label>Last Name</label>
                    <input type='text'
                    placeholder='Add Last Name'
                    value={last_name}
                    onChange={(e)=> setlast_name(e.target.value)}
                    >
                    </input>
                </div>

                <div className='form-controlx'>
                    <label>Age</label>
                    <input type='number' placeholder='Enter Age'
                    value={age}
                    onChange={(e)=> setage(e.target.value)}
                    >
                    </input>
                </div>

                <div className='form-controlx'>
                    <label>School Number</label>
                    <input type='number' placeholder='Enter School Number'
                    value={school_number}
                    onChange={(e)=> setschool_number(e.target.value)}
                    >
                    </input>
                </div>

                <div className='form-controlx'>
                    <label>Class Year</label>
                    <input type='number' placeholder='Add Class Year'
                    value={class_year}
                    onChange={(e)=> setclass_year(e.target.value)}
                    >
                    </input>
                </div>

                <input type='submit' value='Save Student' className='btn btn-primary'></input>
            </form>
        </div>
    )
}

export default AddStudent
