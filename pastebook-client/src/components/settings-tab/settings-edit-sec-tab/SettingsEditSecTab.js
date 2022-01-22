import React, { useState } from 'react';
import EditSec from '../edit-sec/EditSec';
import EditSettingsSec from '../edit-settings-sec/EditSettingsSec';
import '../settings-edit-sec-tab/SettingsEditSecTab.css'

const SettingEditSecTab = () => {
    const [editSecState, setEditSecState] = useState("secTab");
    const handeleEditSecClick = (e) => {
        e.preventDefault();
        setEditSecState("secSettingTab");
    }
    const handeleCancelEditSecClick = (e) => {
        e.preventDefault();
        setEditSecState("secTab");
    }

    return <div className='edit-pass'>
        <h2>Email and Password</h2>
        <div className='edit-email-with-pass'>
            {editSecState === "secTab" ? <EditSettingsSec handeleEditSecClick={handeleEditSecClick} /> : <EditSec handeleCancelEditSecClick={handeleCancelEditSecClick}  />}
        </div>
        <div className='borderline'>

        </div>
        <div className='edit-pass-new-pass'>
            <input type='password' required='require' placeholder='Old Password' />
            <input type='password' required='require' placeholder='New Password' />
            <input type='password' required='require' placeholder='Confirm New Password' />
            <button>Save?</button>
        </div>
    </div>;
};
export default SettingEditSecTab