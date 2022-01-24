import React, { useState } from 'react';
import EditInfo from '../edit-info/EditInfo';
import EditSettings from '../edit-settings-info/EditSettingsInfo';
import '../settings-edit-info-tab/SettingsEditInfoTab.css';
const SettingEditInfoTab = () => {
    const [editState, setEditState] = useState("infoTab");
    const handleEditClick = (e) => {
        e.preventDefault();
        setEditState("editTab");
    }
    const handleEditCancelClick = (e) => {
        e.preventDefault();
        setEditState("infoTab");
    }
    return <div className='edit-info-settings'>
        <h2>General Account Settings</h2>
        <div className='edit-info-container'>
            {/* <label htmlFor='first-name-setiings'>First Name:</label>
            <input type='text' name='first-name-settings' id='first-name-settings' placeholder='Juan' readOnly='readonly' />
            <label htmlFor='last-name-setiings'>Last Name:</label>
            <input type='text' name='last-name-settings' id='last-name-settings' placeholder='Dela Cruz' readOnly='readonly' />
            <label htmlFor='birthday-setiings'>Birthday:</label>
            <input type='text' name='birthday-settings' id='birthday-settings' placeholder='10/32/2022' readOnly='readonly' />
            <label htmlFor='gender-setiings'>Gender:</label>
            <input type='text' name='gender-setiings' id='gender-setiings' placeholder='Male' readOnly='readonly' /> */}
            {editState === "infoTab" ? <EditInfo handleEditClick={handleEditClick} /> : <EditSettings handleEditCancelClick={handleEditCancelClick} />}
            {/* <button onClick={handleEditClick}>Edit</button> */}
        </div>
    </div>;
};
export default SettingEditInfoTab