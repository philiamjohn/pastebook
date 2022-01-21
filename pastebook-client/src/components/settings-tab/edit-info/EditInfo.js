import React from 'react';

const EditInfo = ({ handleEditClick }) => {
    return <div>
        <label htmlFor='first-name-setiings'>First Name:</label>
        <input type='text' name='first-name-settings' id='first-name-settings' placeholder='Juan' readOnly='readonly' />
        <label htmlFor='last-name-setiings'>Last Name:</label>
        <input type='text' name='last-name-settings' id='last-name-settings' placeholder='Dela Cruz' readOnly='readonly' />
        <label htmlFor='birthday-setiings'>Birthday:</label>
        <input type='text' name='birthday-settings' id='birthday-settings' placeholder='10/32/2022' readOnly='readonly' />
        <label htmlFor='gender-setiings'>Gender:</label>
        <input type='text' name='gender-setiings' id='gender-setiings' placeholder='Male' readOnly='readonly' />
        <button onClick={(e) => handleEditClick(e)}>Edit</button>
    </div>;
};

export default EditInfo;
