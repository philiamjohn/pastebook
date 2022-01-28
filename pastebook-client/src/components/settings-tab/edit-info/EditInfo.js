import React from 'react';
import '../edit-info/EditInfo.css'

const EditInfo = ({ handleEditClick, userData }) => {
    // const testF = (e) => {
    //     e.preventDefault();
    //     var testData = userData.Birthday;
    //     console.log(Date.parse(testData));
    //     var datedate = new Date(Date.parse(testData));
    //     var convertedDate = datedate.getFullYear() + "-" + (datedate.getMonth() + 1) + "-" + datedate.getDate();
    //     console.log(convertedDate);
    // }
    return <div className='edit-info'>
        <label htmlFor='first-name-setiings'>First Name:</label>
        <input type='text' name='first-name-settings' id='first-name-settings' value={userData.FirstName} readOnly='readonly' />
        {/* <p>Juan</p> */}
        <label htmlFor='last-name-setiings'>Last Name:</label>
        <input type='text' name='last-name-settings' id='last-name-settings' value={userData.LastName} readOnly='readonly' />
        {/* <p>Dela Cruz</p> */}
        <label htmlFor='birthday-setiings'>Birthday:</label>
        <input type='text' name='birthday-settings' id='birthday-settings' value={userData.Birthday} readOnly='readonly' />
        {/* <p>2/30/1998</p> */}
        <label htmlFor='gender-setiings'>Gender:</label>
        <input type='text' name='gender-setiings' id='gender-setiings' value={userData.Gender} readOnly='readonly' />
        <label htmlFor='phone'>Phone:</label>
        <input type='text' name='phone' id='phone' value={userData.Phone === " " ? "Add Number" : userData.Phone} readOnly='readonly' />

        {/* <p>Male</p> */}
        <button onClick={(e) => handleEditClick(e)}>Edit</button>   
        {/* <button onClick={(e) => testF(e)}>TEST</button> */}
    </div>;
};

export default EditInfo;
