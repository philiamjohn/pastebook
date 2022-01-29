import React, { useState } from 'react';
import EditSec from '../edit-sec/EditSec';
import EditSettingsSec from '../edit-settings-sec/EditSettingsSec';
import '../settings-edit-sec-tab/SettingsEditSecTab.css'

const SettingEditSecTab = ({ userData, getSessionId }) => {
    const baseurl = "http://localhost:5000";

    const [editSecState, setEditSecState] = useState("secTab");
    const handeleEditSecClick = (e) => {
        e.preventDefault();
        setEditSecState("secSettingTab");
    }
    const handeleCancelEditSecClick = (e) => {
        e.preventDefault();
        setEditSecState("secTab");
    }
    const changePass = async (e) => {
        e.preventDefault();
        var newPass = document.getElementById('new-password').value;
        console.log(newPass + " helllllo");
        const response = await fetch(`${baseurl}/changepass`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                User_ID: `${userData.User_ID}`,
                Password: `${newPass}`
            })
        });
        if(response.status ===200){
            refreshPage();
        }
    }
    const changeColor = (e) => {
        e.preventDefault();
        var newPass = document.getElementById('new-password').value;
        var conNewPass = document.getElementById('con-new-password');
        if (newPass != conNewPass.value) {
            conNewPass.className = 'active';
            setDisabled(true);

        } else {
            conNewPass.className = 'test';
            setDisabled(false);
        }
    }
    const checkPassIfMatch = async (e) => {
        e.preventDefault();
        var password = document.getElementById('old-password');
        const res = await fetch(`${baseurl}/userUpdate`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                User_ID: `${userData.User_ID}`,
                Password: `${password.value}`
            })
        });
        if (res.status === 200) {
            console.log("true");
            password.className = 'test';
        } else {
            console.log("false");
            password.className = 'active';
            alert("old password incorrect")
        }
    }
    const refreshPage = () => {
        window.location.reload();
    }
    const [disabled, setDisabled] = useState(true);
    return <div className='edit-pass'>
        <h2>Change Email</h2>
        <div className='edit-email-with-pass'>
            {editSecState === "secTab" ? <EditSec handeleEditSecClick={handeleEditSecClick} userData={userData} /> : <EditSettingsSec handeleCancelEditSecClick={handeleCancelEditSecClick} userData={userData} getSessionId={getSessionId} />}
        </div>
        <div className='borderline'>
        </div>
        <h2>Change Password</h2>
        <div className='edit-pass-new-pass'>
            <form onSubmit={(e) => changePass(e)}>
                <input type='password' required='require' placeholder='Old Password' id='old-password' onBlur={(e) => checkPassIfMatch(e)} className={''} />
                <input type='password' required='require' placeholder='New Password' id='new-password' onChange={(e) => changeColor(e)} />
                <input type='password' required='require' placeholder='Confirm New Password' id='con-new-password' onChange={(e) => changeColor(e)} className={''} />
                <button id='save-new-pass-button' type='submit' disabled={disabled}>Save</button>
            </form>
        </div>
    </div>;
};
export default SettingEditSecTab