import React from 'react';
import './EditSettingsInfo.css'

const EditSettings = ({ handleEditCancelClick }) => {
    return <div className='edit-settings'>
        <label htmlFor='first-name-setiings'>First Name:</label>
        <input type='text' name='first-name-settings' id='first-name-settings' defaultValue='Juan' />
        <label htmlFor='last-name-setiings'>Last Name:</label>
        <input type='text' name='last-name-settings' id='last-name-settings' defaultValue='Dela Cruz' />
        <label htmlFor='birthday-setiings'>Birthday:</label>
        <input type='text' name='birthday-settings' id='birthday-settings' defaultValue='10/32/2022' />
        <label htmlFor='gender-setiings'>Gender:</label>
        <input type='text' name='gender-setiings' id='gender-setiings' defaultValue='Male' />
        <div className='button-change-info'>
            <button onClick={(e) => handleEditCancelClick(e)}>Cancel</button>
            <button>Save</button>
        </div>

    </div>;
};

export default EditSettings;
