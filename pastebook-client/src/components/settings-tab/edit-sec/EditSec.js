import React from 'react';
import '../edit-sec/EditSec.css';

const EditSec = ({ handeleCancelEditSecClick }) => {
    return <div className='set-new-email'>
        <label htmlFor='email'>Email:</label>
        <input type='email' name='email' id='email' placeholder='New Email' />
        <label htmlFor='confirm-pass'>Enter Password:</label>
        <input type='password' name='confirm-pass' id='confirm-pass' placeholder='Enter Password' />
        <button onClick={(e) => handeleCancelEditSecClick(e)}>Cancel</button>
        <button>Save</button>
    </div>;
};

export default EditSec;
