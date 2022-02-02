import React, {  useState } from 'react';
import EditSec from '../edit-sec/EditSec';
import EditSettingsSec from '../edit-settings-sec/EditSettingsSec';
import '../settings-edit-sec-tab/SettingsEditSecTab.css'

const SettingEditSecTab = ({ userData, getSessionIdFromCookie, baseUrl }) => {
    const [editSecState, setEditSecState] = useState("secTab");
    const [disabled, setDisabled] = useState(true);
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
        const response = await fetch(`${baseUrl}/changepass`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                User_ID: `${userData.User_ID}`,
                Password: `${newPass}`
            })
        });
        if (response.status === 200) {
            alert("Done");
            window.location.reload();
        }
    }
    const changeColor = (e) => {
        e.preventDefault();
        var newPass = document.getElementById('new-password').value;
        var conNewPass = document.getElementById('con-new-password');
        if (newPass != conNewPass.value) {
            conNewPass.className = 'red';
            setDisabled(true);

        } else {
            conNewPass.className = 'green';
            setDisabled(false);
        }
    }
    const checkPassIfMatch = async (e) => {
        e.preventDefault();
        var password = document.getElementById('old-password');
        const res = await fetch(`${baseUrl}/userUpdate`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                User_ID: `${userData.User_ID}`,
                Password: `${password.value}`
            })
        });
        if (res.status === 200) {
            password.className = 'green';
        } else {
            password.className = 'red';
        }
    }
    const cancelEditPass = (e) => {
        e.preventDefault();
        document.getElementById('edit-pass-new-pass').style.display = "none";
        document.getElementById('edit-pass-button').style.display = "block";

    }
    const editPass = () => {
        const confirmAction = window.confirm("Proceed to Change Password?");
        if (!confirmAction) {
            //
        } else {
            document.getElementById('edit-pass-new-pass').style.display = "block";
            document.getElementById('edit-pass-button').style.display = "none";
        }
    }
    return <div className='edit-pass'>
        <h2>Change Email</h2>
        <div className='edit-email-with-pass'>
            {editSecState === "secTab" ? <EditSec handeleEditSecClick={handeleEditSecClick} userData={userData} /> : <EditSettingsSec handeleCancelEditSecClick={handeleCancelEditSecClick} userData={userData} getSessionIdFromCookie={getSessionIdFromCookie} />}
        </div>
        <div className='borderline'>
        </div>
        <h2>Change Password</h2>
        <button onClick={() => editPass()} id='edit-pass-button'>Edit Password</button>
        <div className='edit-pass-new-pass' id='edit-pass-new-pass' style={{display:"none"}}>
            <form onSubmit={(e) => changePass(e)}>
                <input type='password' required='require' placeholder='Old Password' id='old-password' onBlur={(e) => checkPassIfMatch(e)} className={''} />
                <input type='password' required='require' placeholder='New Password' id='new-password' onChange={(e) => changeColor(e)} />
                <input type='password' required='require' placeholder='Confirm New Password' id='con-new-password' onChange={(e) => changeColor(e)} className={''} />
                <div className='form-buttons'>
                    <button id='save-new-pass-button' type='submit' disabled={disabled}>Save</button>
                    <button onClick={(e) => cancelEditPass(e)}>Cancel</button>
                </div>
            </form>
        </div>
    </div>;
};
export default SettingEditSecTab