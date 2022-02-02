import React from 'react';
import '../register/Register.css';
import { useNavigate } from 'react-router-dom';


const Register = ({baseUrl}) => {
  let navigate = useNavigate();
  const checkEmailIfExist = async (e) => {
    e.preventDefault();
    var emailInput = document.getElementById('email').value;
    const res = await fetch(`${baseUrl}/register/` + emailInput, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
    if (res.status === 200) {
      alert("The email is already been used!")

    } else if (res.status === 401) {
      hadleRegisterCredentials(e);
    }
  };
  const hadleRegisterCredentials = async (e) => {
    e.preventDefault();
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var emailInput = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    // Convert Date to timestamp 
    var dateEntry = document.getElementById('birthday');
    var birthDate = dateEntry.value.split("-")
    var timeStamp = parseInt(new Date(birthDate[0], birthDate[1] - 1, birthDate[2]).getTime()) / 1000;
    let timeStampVal = new Date(timeStamp * 1000).toLocaleDateString('en-US');
    //
    var fullname = firstName + lastName;
    //Convert the first letter to upper case
    var firstNameUpperFirst = firstName.split(/ /g).map(word =>
      `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
      .join(" ");
    var lastNameUpperFirst = lastName.split(/ /g).map(word =>
      `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
      .join(" ");
    //
    //remove the space 
    const removeSpace = fullname.replace(/ /g, '');
    var username = removeSpace.toString().toLowerCase();
    var phone = document.getElementById('phone').value;
    var genderSelect = document.getElementById('genderChoice');
    //send users credentials to the database
    const response = await fetch(`${baseUrl}/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
        FirstName: `${firstNameUpperFirst}`,
        LastName: `${lastNameUpperFirst}`,
        Email: `${emailInput}`,
        Password: `${password}`,
        Birthday: `${timeStampVal}`,
        Gender: `${genderSelect.value}`,
        Phone: `${phone}`,
        Username: `${username}`
      })
    });
    if (response.status === 200) {
      alert("Welcome , See your email for confirmation");
      navigate("/login", { replace: true });
    }

  }
  return <div className='reg-page'>
    <div className='register'>
      <div className='reg-title'>
        <h1>Register Now!</h1>
        <p>Easy and Free</p>
      </div>
      <form onSubmit={(e) => checkEmailIfExist(e)}>
        <div className='reg-credentials'>
          <div className='fullname'>
            <input type='text' name='firstName' id='first-name' placeholder='First Name' required='required' />
            <input type='text' name='lastName' id='last-name' placeholder='Last Name' required='required' />
          </div>
          <div className='credentials'>
            <input type='email' name='email' id='email' placeholder='Email' required='required' />
            <input type='text' name='phone' id='phone' placeholder='09XXXXXXXXX (Optional)' pattern="[0]{1}[9]{1}[0-9]{9}" />
            <input type='password' name='password' id='password' placeholder='Password' required='required' />
          </div>
          <div className='date'>
            <label htmlFor='birthday'>Birthday:</label>
            <input type='date' name='birthday' id='birthday' required='required' />
          </div>
          <div className='gender'>
            <select id='genderChoice'>
              <option value='not specified'>Select Gender (optional)</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </div>
        </div>
        <div className='reg-page-buttons'>
          <button id='reg-button-regpage' type='submit'>Register</button>
          <div className='dashlineRegPage'></div>
          <button id='login-button-regpage' onClick={() => { navigate("/login", { replace: true }) }}>Login</button>
        </div>
      </form>
    </div>
  </div >;
};

export default Register;