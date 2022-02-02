import React from 'react';
import '../edit-info/EditInfo.css'

const EditInfo = ({ handleEditClick, userData }) => {
    return <div className='edit-info'>
        <label htmlFor='first-name-setiings'>First Name:</label>
        <input type='text' name='first-name-settings' id='first-name-settings' value={userData.FirstName} readOnly='readonly' />
        <label htmlFor='last-name-setiings'>Last Name:</label>
        <input type='text' name='last-name-settings' id='last-name-settings' value={userData.LastName} readOnly='readonly' />
        <label htmlFor='birthday-setiings'>Birthday:</label>
        <input type='text' name='birthday-settings' id='birthday-settings' value={userData.Birthday} readOnly='readonly' />
        <label htmlFor='gender-setiings'>Gender:</label>
        <input type='text' name='gender-setiings' id='gender-setiings' value={userData.Gender} readOnly='readonly' />
        <label htmlFor='phone'>Phone:</label>
        <input type='text' name='phone' id='phone' value={userData.Phone === " " ? "Add Number" : userData.Phone} readOnly='readonly' />
        <button onClick={(e) => handleEditClick(e)}>Edit</button>   
    </div>;
};

export default EditInfo;
