import React from 'react';
import '../edit-info/EditInfo.css'

const EditInfo = ({ handleEditClick }) => {
    return <div className='edit-info'>
        <label htmlFor='first-name-setiings'>First Name:</label>
        <input type='text' name='first-name-settings' id='first-name-settings' value='Juan' readOnly='readonly' />
        {/* <p>Juan</p> */}
        <label htmlFor='last-name-setiings'>Last Name:</label>
        <input type='text' name='last-name-settings' id='last-name-settings' value='Dela Cruz' readOnly='readonly' />
        {/* <p>Dela Cruz</p> */}
        <label htmlFor='birthday-setiings'>Birthday:</label>
        <input type='text' name='birthday-settings' id='birthday-settings' value='10/32/2022' readOnly='readonly' />
        {/* <p>2/30/1998</p> */}
        <label htmlFor='gender-setiings'>Gender:</label>
        <input type='text' name='gender-setiings' id='gender-setiings' value='Male' readOnly='readonly' />
        {/* <p>Male</p> */}
        <button onClick={(e) => handleEditClick(e)}>Edit</button>
    </div>;
};

export default EditInfo;
