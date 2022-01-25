import React from 'react';
import '../register/Register.css';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  let navigate = useNavigate();

  return <div className='reg-page'>
    <div className='register'>
      <div className='reg-title'>
        <p>Register for FREE!!!</p>
      </div>
      <div className='reg-credentials'>
        <div className='fullname'>
          <input type='text' name='firstName' id='first-name' placeholder='First Name' />
          <input type='text' name='lastName' id='last-ame' placeholder='Last Name' />
        </div>
        <div className='credentials'>
          <input type='text' name='email' id='email' placeholder='Email Or Phone Number' />
          <input type='password' name='password' id='password' placeholder='Password' />
        </div>
        <div className='date'>
          <label htmlFor='birthday'>Birthday:</label>
          <input type='date' name='birthday' id='birthday' />
        </div>
        <div className='gender'>
          <label htmlFor='gender'>Gender:</label>
          <div className='gender-male gender-div'><label htmlFor='gender' >Male</label>
            <input type='radio' id='gender-male' name='gender' value='Male' />
          </div>
          <div className='gender-female gender-div'>
            <label htmlFor='gender'>Female</label>
            <input type='radio' id='gender-female' name='gender' value='Female' />
          </div>
        </div>
      </div>
      <div className='reg-page-buttons'>
        <button id='reg-button-regpage'>Register</button>
        <div className='dashlineRegPage'></div>
        <button id='login-button-regpage' onClick={() => { navigate("/login", { replace: true }) }}>Login</button>
      </div>
    </div>
  </div>;
};

export default Register;