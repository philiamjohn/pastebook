import React from 'react';
import '../login/Login.css';
import logo from '../../images/pb.png'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  let navigate = useNavigate();
  const baseUrl = `http://localhost:5000`;

  const validateInputsAndLogin = async () => {
    const emailOrPhone = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!emailOrPhone || !password) {
      alert("Kindly fill up the fields");
      return;
    }

    let userCredentials = {};
    //determine if email or phone
    if (emailOrPhone.includes("@")) {
      userCredentials = {
        Email: emailOrPhone,
        Phone: "",
        Password: password
      }
    }
    else {
      userCredentials = {
        Email: "",
        Phone: emailOrPhone,
        Password: password
      }
    }
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(await userCredentials)
    });
    if (response.status === 500 || response.status === 401) {
      alert("Invalid username/password");
    }
    else if (response.status === 200) {
      const pastebookSessionId = JSON.parse(await response.text()).Value.SessionId;
      // session id cookie expires in 3 days
      var expirationDate = new Date;
      expirationDate.setDate(expirationDate.getDate() + 3);

      document.cookie = `pastebookSessionId=${pastebookSessionId}; expires= ${expirationDate.toGMTString()}; path=/;`;
      alert("Successfully logged in!");
      navigate('/', { replace: true });
    }
    else {
      alert(response.status)
    }
  }

  return <div className='loginPage'>
    <div className='imageLogo'>
      <img src={logo} />
      {/* <div className='someText'>
        <h2>Hello Connect to your Friends Now</h2>
      </div> */}
    </div>

    <div className='login'>
      <div className='loginCredentials'>
        {/* pattern for email and phone number */}
        <input type='text' name='email' id='email' placeholder='Email or Phone' pattern="^([0-9]{11})|([A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,3})$" />
        <input type='password' name='password' id='password' placeholder='Password' />
      </div>
      <div className='loginPageButtonsLoginPage'>
        <button id='loginButtonLoginPage' onClick={validateInputsAndLogin}>Login</button>
        <div className='dashline'></div>
        <button id='registerButtonLoginPage' onClick={() => { navigate("/register", { replace: true }) }}>Register</button>
      </div>
    </div>

  </div>;
};

export default Login;
