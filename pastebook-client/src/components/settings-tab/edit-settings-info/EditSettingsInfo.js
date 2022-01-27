import React, { useState } from 'react';
import './EditSettingsInfo.css'

const EditSettings = ({ handleEditCancelClick, userData }) => {
    const [date, setDate] = useState(null);
    const testF = (e) => {
        e.preventDefault();
        var testData = userData.Birthday;
        console.log(Date.parse(testData));
        var datedate = new Date(Date.parse(testData));
        var convertedDate = datedate.getFullYear() + "-" + (datedate.getMonth() + 1) + "-" + datedate.getDate();
        var testDate = new Date(convertedDate);
        console.log(convertedDate);
        console.log(testDate);
        console.log(testDate.toISOString());
        setDate(convertedDate.toISOString());
        console.log(testDate.toISOString().substring(0, 10));
        // console.log(date);
        // return convertedDate.toISOString();
    }
    return <div className='edit-settings'>
        <label htmlFor='first-name-setiings'>First Name:</label>
        <input type='text' name='first-name-settings' id='first-name-settings' defaultValue={userData.FirstName} />
        <label htmlFor='last-name-setiings'>Last Name:</label>
        <input type='text' name='last-name-settings' id='last-name-settings' defaultValue={userData.LastName} />
        <label htmlFor='birthday-setiings'>Birthday:</label>
        <input type='date' name='birthday-settings' id='birthday-settings' defaultValue={date} />
        <label htmlFor='gender-setiings'>Gender:</label>
        <input type='text' name='gender-setiings' id='gender-setiings' defaultValue={userData.Gender} />
        <div className='button-change-info'>
            <button onClick={(e) => handleEditCancelClick(e)}>Cancel</button>
            <button onClick={(e) => testF(e)} >Save</button>
        </div>

    </div>;
};

export default EditSettings;
