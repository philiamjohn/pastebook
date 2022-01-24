import React from 'react';
import '../login/Login.css';
import logo from '../../images/pb.png'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  let navigate = useNavigate();

  return <div className='loginPage'>
    <div className='imageLogo'>
      <img src={logo} />
      {/* <div className='someText'>
        <h2>Hello Connect to your Friends Now</h2>
      </div> */}
    </div>

    <div className='login'>
      <div className='loginCredentials'>
        <input type='text' name='email' id='email' placeholder='Email or Phone' />
        <input type='password' name='password' id='password' placeholder='Password' />
      </div>
      <div className='loginPageButtonsLoginPage'>
        <button id='loginButtonLoginPage'>Login</button>
        <div className='dashline'></div>
        <button id='registerButtonLoginPage' onClick={() => { navigate("/register", { replace: true }) }}>Register</button>
      </div>
    </div>

  </div>;
};

export default Login;
