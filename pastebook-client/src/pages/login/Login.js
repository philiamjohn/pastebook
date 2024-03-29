import React, { useEffect } from 'react';
import '../login/Login.css';
import logo from '../../images/pb.png'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  let navigate = useNavigate();
  const baseUrl = `http://localhost:5000`;

  const validateInputsAndLogin = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Kindly fill up the fields");
      return;
    }

    const userCredentials = {
      Email: email,
      Password: password
    }

    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials)
    });
    if (response.status === 500 || response.status === 401) {
      alert("Invalid username/password");
    }
    else if (response.status === 200) {
      const dataResponse = await response.json();
      const pastebookSessionId = await dataResponse.SessionId;

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

  useEffect(() => {
    //clear all setIntervals
    for (let id = 0; id <= 1000; id++) {
      window.clearInterval(id);
    }
  }, []);


  return <div className='loginPage'>
    <div className='imageLogo'>
      <img src={logo} />
      {/* <div className='someText'>
        <h2>Hello Connect to your Friends Now</h2>
      </div> */}
    </div>
    <form onSubmit={(e) => validateInputsAndLogin(e)}>
      <div className='login'>
        <div className='loginCredentials'>
          {/* pattern for email and phone number */}
          <input type='text' name='email' id='email' placeholder='Email' pattern="^([0-9]{11})|([A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,3})$" />
          <input type='password' name='password' id='password' placeholder='Password' />
        </div>
        <div className='loginPageButtonsLoginPage'>
          <button id='loginButtonLoginPage' type='submit'>Login</button>
          <div className='dashline'></div>
          <button id='registerButtonLoginPage' onClick={() => { navigate("/register", { replace: true }) }}>Register</button>
        </div>
      </div>
    </form>
  </div>;
};

export default Login;
