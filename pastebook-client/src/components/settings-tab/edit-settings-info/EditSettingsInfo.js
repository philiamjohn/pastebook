import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './EditSettingsInfo.css'

const EditSettings = ({ handleEditCancelClick, userData }) => {
    const [date, setDate] = useState(null);
    const baseurl = "http://localhost:5000";
    useEffect(() => {
        //convert the timestamp(stringDate) to Date
        var stringDate = userData.Birthday;
        var convertToRealDate = new Date(Date.parse(stringDate));
        var parts = convertToRealDate.toString().split(" ");
        var months = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };
        var newDefaultDateVal = parts[3] + "-" + months[parts[1]] + "-" + parts[2];
        setDate(newDefaultDateVal);

    }, []);
    const sendEditedInfo = async (e) => {
        e.preventDefault();
        var fname = document.getElementById('first-name-settings').value;
        var lname = document.getElementById('last-name-settings').value;
        var birthday = document.getElementById('birthday-settings').value;
        var gender = document.getElementById('genderChoice').value;
        var birthDate = birthday.split("-")
        var timeStamp = parseInt(new Date(birthDate[0], birthDate[1] - 1, birthDate[2]).getTime()) / 1000;
        let timeStampVal = new Date(timeStamp * 1000).toLocaleDateString('en-US');
        var phone = document.getElementById('phone').value;
        if (phone != "") {
            phone = phone;
        } else {
            phone = userData.Phone;
        }
        const id = userData.User_ID;
        const response = await fetch(`${baseurl}/userUpdate`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                User_ID: `${id}`,
                FirstName: `${fname}`,
                LastName: `${lname}`,
                Birthday: `${timeStampVal}`,
                Gender: `${gender}`,
                Phone: `${phone}`
            })
        });
        if (response.status === 200) {
            alert("Done");
            window.location.reload();
        }
    }
    return <div className='edit-settings'>
        <form onSubmit={(e) => sendEditedInfo(e)}>
            <label htmlFor='first-name-setiings'>First Name:</label>
            <input type='text' name='first-name-settings' id='first-name-settings' defaultValue={userData.FirstName} />
            <label htmlFor='last-name-setiings'>Last Name:</label>
            <input type='text' name='last-name-settings' id='last-name-settings' defaultValue={userData.LastName} />
            <label htmlFor='birthday-setiings'>Birthday:</label>
            <input type='date' name='birthday-settings' id='birthday-settings' defaultValue={date} />
            <label htmlFor='genderChoice'>Gender:</label>
            <select id='genderChoice' name='genderChoice'>
                <option value='not specified'>Rather not say...</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
            </select>
            <label htmlFor='phone'>Phone:</label>
            <input type='text' name='phone' id='phone' placeholder={userData.Phone} pattern="[0]{1}[9]{1}[0-9]{9}" />
            <div className='button-change-info'>
                <button onClick={(e) => handleEditCancelClick(e)}>Cancel</button>
                <button  type='submit' id='save'>Save</button>
            </div>
        </form>
    </div>;
};

export default EditSettings;
