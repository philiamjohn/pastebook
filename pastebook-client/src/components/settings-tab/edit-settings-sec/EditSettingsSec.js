import React, { useState } from 'react';
import '../edit-settings-sec/EditSettingsSec.css'

const EditSettingsSec = ({ handeleCancelEditSecClick, userData, getSessionId }) => {
    const baseurl = "http://localhost:5000";
    const checkEmailIfExist = async (e) => {
        e.preventDefault();
        var email = document.getElementById('new-email').value;
        const res = await fetch(`${baseurl}/register/` + email, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (res.status === 200) {
            alert("already taken ")
            // setDisableButton(true);

        } else if (res.status === 401) {
            alert("available");
            // setDisableButton(false);

        }

    };
    // // const refreshPage = () => {
    // //     window.location.reload();
    // // }
    const updateEmailInSessions = async (e) => {
        e.preventDefault();
        var id = getSessionId();
        console.log(id.toString());
        var email = document.getElementById('new-email');
        console.log(email.value + " Email");
        const response = await fetch(`${baseurl}/updateEmailSessions`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                SessionId: `${id}`,
                Email: `${email.value}`
            })
        });
        if (response.status === 200) {
            alert("yeye");
            console.log(id + " idddddddd");
            // navigate("/settings", { replace: true });
        }

    }
    const updateEmail = async (e) => {
        e.preventDefault();
        updateEmailInSessions(e);
        var email = document.getElementById('new-email');
        const response = await fetch(`${baseurl}/updateEmail`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                User_ID: `${userData.User_ID}`,
                Email: `${email.value}`
            })
        });
        if (response.status === 200) {
            alert("yey");
            // navigate("/settings", { replace: true });
        }
    }
    const checkPasswordIfMatch = async (e) => {
        e.preventDefault();
        var password = document.getElementById('confirm-pass');
        const res = await fetch(`${baseurl}/userUpdate`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                User_ID: `${userData.User_ID}`,
                Password: `${password.value}`
            })
        });
        if (res.status === 200) {
            console.log("true");
            password.className = 'test';
            // setDisableButton(false);

        } else {
            console.log("false");
            password.className = 'active';
            alert("old password incorrect")
            // setDisableButton(true);
        }
    }
    const changeColor = (e) => {
        e.preventDefault();
        var newE = document.getElementById('new-email').value;
        var conNewE = document.getElementById('confirm-new-email');
        if ((newE != conNewE.value) && (newE != " " || conNewE.value != " ")) {
            conNewE.className = 'active';
            setDisableButton(true);

        } else {
            conNewE.className = 'test';
            setDisableButton(false);
        }
    }
    const [disableButton, setDisableButton] = useState(true);
    return <div className='set-new-email'>
        <form onSubmit={(e) => updateEmail(e)}>
            <label htmlFor='new-email'>New Email:</label>
            <input type='email' name='new-email' id='new-email' placeholder='New Email' onChange={(e) => changeColor(e)} onBlur={(e) => checkEmailIfExist(e)} className={''} />
            <label htmlFor='confirm-new-email'>Confirm New Email:</label>
            <input type='email' name='confirm-new-email' id='confirm-new-email' placeholder='Confirm New Email' onChange={(e) => changeColor(e)} className={''} />
            <label htmlFor='confirm-pass'>Confirm Password:</label>
            <input type='password' name='confirm-pass' id='confirm-pass' placeholder='Enter Password' onBlur={(e) => checkPasswordIfMatch(e)} />
            <div className='buttons-change-email'>
                <button onClick={(e) => handeleCancelEditSecClick(e)}>Cancel</button>
                <button type='submit' disabled={disableButton}>Save</button>
            </div>
        </form>
    </div>;

};

export default EditSettingsSec;
