import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';


function TeacherForm({setshowAdd,showAdd,onAdd,isEdit}) {
    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [age, setage] = useState(0);

    useEffect(() => {
        setshowAdd(true);
    }, [])
    
    const onSubmit=(e)=>{
        e.preventDefault();

        if(!first_name||!last_name||!age){
            alert('Please fill all the fields');
            return;
        }

        onAdd({first_name,last_name,age});
        setfirst_name('')
        setlast_name('')
        setage(0);
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

                <input type='submit' value='Save Teacher' className='btn btn-primary'></input>
            </form>
        </div>
    )
}

export default TeacherForm
