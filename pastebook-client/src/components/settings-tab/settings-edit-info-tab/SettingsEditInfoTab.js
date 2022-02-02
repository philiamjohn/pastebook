import React, { useState } from 'react';
import EditInfo from '../edit-info/EditInfo';
import EditSettings from '../edit-settings-info/EditSettingsInfo';
import '../settings-edit-info-tab/SettingsEditInfoTab.css';
const SettingEditInfoTab = ({ userData }) => {
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
            {/* show the non-editable infor  and the editable info */}
            {editState === "infoTab" ? <EditInfo handleEditClick={handleEditClick} userData={userData} /> : <EditSettings handleEditCancelClick={handleEditCancelClick} userData={userData} />}
        </div>
    </div>;
};
export default SettingEditInfoTab