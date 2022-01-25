import React from 'react';
import '../edit-settings-sec/EditSettingsSec.css'

const EditSettingsSec = ({ handeleCancelEditSecClick }) => {
    return <div className='set-new-email'>
        <label htmlFor='new-email'>New Email:</label>
        <input type='email' name='new-email' id='new-email' placeholder='New Email' />
        <label htmlFor='confirm-new-email'>Confirm New Email:</label>
        <input type='email' name='confirm-new-email' id='confirm-new-email' placeholder='Confirm New Email' />
        <label htmlFor='confirm-pass'>Confirm Password:</label>
        <input type='password' name='confirm-pass' id='confirm-pass' placeholder='Enter Password' />
        <div className='buttons-change-email'>
            <button onClick={(e) => handeleCancelEditSecClick(e)}>Cancel</button>
            <button>Save</button>
        </div>
    </div>;

};

export default EditSettingsSec;
