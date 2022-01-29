import React from 'react';
import '../edit-settings-sec/EditSettingsSec.css'

const EditSettingsSec = ({ handeleCancelEditSecClick, userData,getUserData }) => {
    const baseurl = "http://localhost:5000";
    const checkEmailIfExist = async () => {
        // e.preventDefault();
        var checkVal = false;
        var email = document.getElementById('new-email').value;
        const res = await fetch(`${baseurl}/register/` + email, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (res.status === 200) {
            alert("already taken ")
            return checkVal;
        } else if (res.status === 401) {
            return checkVal = true;
        }

    };
    const checkPassword = async () => {
        var password = document.getElementById('confirm-pass').value;
        const res = await fetch(`${baseurl}/userUpdate`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                User_ID: `${userData.User_ID}`,
                Password: `${password}`
            })
        });
        if (res.status === 200) {
            return true;
        }else{return false}
        // if (res.status === 200) {
        //     var hello = await res.status();
        //     return hello;
        // }
        // else {
        //     return false;

        // }
    }
    // const refreshPage = () => {
    //     window.location.reload();
    // }
    const updateEmail = async () => {
        var email = document.getElementById('new-email');
        const response = await fetch(`${baseurl}/updateEmail`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                User_ID: `${userData.User_ID}`,
                Email: `${email.value}`
            })
        });
        if (response.status === 200) {
            alert("yey");
            getUserData();
            // navigate("/settings", { replace: true });
        }
    }
    // const checkEmailIfTheSame = async (e) => {
    //     e.preventDefault();
    //     var email = document.getElementById('new-email');
    //     var email2 = document.getElementById('confirm-new-email');
    //     if (email.value === email2.value) {
    //         console.log("yes");
    //         var check = await checkEmailIfExist();
    //         var checkpass = await checkPassword();
    //         console.log(check + "calue ");
    //         console.log(checkpass + " valie");
    //         if (!check || !checkpass) {
    //             email2.value = " ";
    //             email.value = " ";
    //         } else {
    //             var emailupdate = await updateEmail(e);
    //             if (emailupdate) {
    //                 refreshPage();
    //             }
    //         }
    //     }
    //     else {
    //         alert("pls input one email");
    //         email2.value = " ";
    //         email.value = " ";
    //     }
    // }
    const checkEmailIfSame = () => {
        var email1 = document.getElementById('new-email').value;
        var email2 = document.getElementById('confirm-new-email').value;
        if (email1 === email2) {
            return true;
        }
        else {
            return false;
        }
    }
    const submitVal = async (e) => {
        e.preventDefault();
        var resEmail = checkEmailIfSame();
        // console.log(result + " bebe");
        if (resEmail) {
            let emailExistence = await checkEmailIfExist();
            let passtest = await checkPassword();
            console.log(passtest);
            console.log(emailExistence);
            if (passtest && emailExistence) {
                console.log("200 na siya");
                updateEmail().then(console.log);
            }
        }
    }
    return <div className='set-new-email'>
        <form onSubmit={(e) => submitVal(e)}>
            <label htmlFor='new-email'>New Email:</label>
            <input type='email' name='new-email' id='new-email' placeholder='New Email' />
            <label htmlFor='confirm-new-email'>Confirm New Email:</label>
            <input type='email' name='confirm-new-email' id='confirm-new-email' placeholder='Confirm New Email' />
            <label htmlFor='confirm-pass'>Confirm Password:</label>
            <input type='password' name='confirm-pass' id='confirm-pass' placeholder='Enter Password' />
            <div className='buttons-change-email'>
                <button onClick={(e) => handeleCancelEditSecClick(e)}>Cancel</button>
                <button type='submit'>Save</button>
            </div>
        </form>
    </div>;

};

export default EditSettingsSec;
