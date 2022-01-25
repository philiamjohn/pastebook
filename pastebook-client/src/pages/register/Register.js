import React, { useState } from 'react';
import '../register/Register.css';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  let navigate = useNavigate();
  const baseurl = "http://localhost:5000";
  // const [genderValue, setgenderValue] = useState(null);
  // const handleChange = (e) => {
  //   setgenderValue(e.target.value);
  // };
  const handleRegisterInfo = async (e) => {
    e.preventDefault();
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var emailOrPhone = document.getElementById('email-or-phone').value;
    var password = document.getElementById('password').value;
    var dateEntry = document.getElementById('birthday');
    var birthDate = dateEntry.value.split("-")
    var timeStamp = parseInt(new Date(birthDate[0], birthDate[1] - 1, birthDate[2]).getTime()) / 1000;
    let timeStampVal = new Date(timeStamp * 1000).toLocaleDateString('en-US');
    console.log(timeStampVal);
    // console.log(genderValue);
    var fullname = firstName + lastName;
    const removeSpace = fullname.replace(/ /g, '');
    var username = removeSpace.toString().toLowerCase();
    console.log(username);
    console.log(fullname);
    console.log(removeSpace);
    var phone = document.getElementById('phone').value;
    var genderSelect = document.getElementById('genderChoice');
    console.log(genderSelect.value);
    console.log(phone);
    // var genderValue = genderSelect.options[genderSelect.selectedIndex];
    // console.log(genderValue);

    // var testResult = validateInputIfEmail(emailOrPhone);
    // console.log(testResult + " email ba to");
    // var testResultAgain = validateInputIfPhone(emailOrPhone);
    // console.log(testResultAgain + " phone ata");
    // if (validateInputIfEmail(emailOrPhone)) {
    //   emailOrPhone = emailOrPhone;
    //   phone = "none";
    // }
    // else if (validateInputIfPhone(emailOrPhone)) {
    //   phone = emailOrPhone;
    //   emailOrPhone = "none";
    // }
    const response = await fetch(`${baseurl}/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        FirstName: `${firstName}`,
        LastName: `${lastName}`,
        Email: `${emailOrPhone}`,
        Password: `${password}`,
        Birthday: `${timeStampVal}`,
        Gender: `${genderSelect.value}`,
        Phone: `${phone}`,
        Username: `${username}`
      })
    });
    let data = await response.json();
    console.log(data);
    if (response.status === 200) {
      // navigate("/login", { replace: true });
      alert("ok");
    }
  };
  // const validateInputIfEmail = (email) => {
  //   var re = /\S+@\S+\.\S+/;
  //   return re.test(email);
  // };
  // const validateInputIfPhone = (phone) => {
  //   return phone.match(/^\d+$/);
  // }
  return <div className='reg-page'>
    <div className='register'>
      <div className='reg-title'>
        <p>Register for Free!!!</p>
      </div>
      <form onSubmit={(e) => handleRegisterInfo(e)}>
        <div className='reg-credentials'>

          <div className='fullname'>
            <input type='text' name='firstName' id='first-name' placeholder='First Name' required='required' />
            <input type='text' name='lastName' id='last-name' placeholder='Last Name' required='required' />
          </div>
          <div className='credentials'>
            <input type='text' name='email' id='email-or-phone' placeholder='Email' required='required' />
            <input type='text' name='phone' id='phone' placeholder='Phone Number (optional)' />
            <input type='password' name='password' id='password' placeholder='Password' required='required' />
          </div>
          <div className='date'>
            <label htmlFor='birthday'>Birthday:</label>
            <input type='date' name='birthday' id='birthday' required='required' />
          </div>
          <div className='gender'>
            {/* <label htmlFor='gender'>Gender:</label> */}
            {/* <div className='gender-male gender-div'><label htmlFor='gender' >Male</label>
              <input type='radio' id='gender' name='gender' value='Male' onChange={handleChange} />
            </div>
            <div className='gender-female gender-div'>
              <label htmlFor='gender'>Female</label>
              <input type='radio' id='gender' name='gender' value='Female' onChange={handleChange} />
            </div> */}
            <select id='genderChoice'>
              <option value='not specified'>Select Gender (optional)</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </div>
        </div>
        <div className='reg-page-buttons'>
          <button id='reg-button-regpage' type='submit' /*onClick={() => handleRegisterInfo()}*/>Register</button>
          <div className='dashlineRegPage'></div>
          <button id='login-button-regpage' onClick={() => { navigate("/login", { replace: true }) }}>Login</button>
        </div>
      </form>
    </div>
  </div >;
};

export default Register;