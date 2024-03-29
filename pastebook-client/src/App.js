import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Friends from './pages/friends/Friends';
import Album from './pages/album/Album';
import Post from './pages/post/Post';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';
import Register from './pages/register/Register';
import Photos from './pages/photos/Photos';
import Photo from './components/photo/Photo';
import { useState } from 'react';

const App = () => {
  let navigate = useNavigate();
  const baseUrl = `http://localhost:5000`;
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const sessionIdVal = getSessionIdFromCookie();
    const response = await fetch(`${baseUrl}/home`, { method: 'GET', headers: { 'X-SessionID': sessionIdVal } });
    if (response.status === 200) {
      const recUserDataVal = await response.json();
      setUserData(recUserDataVal);
    }
  }
  const getSessionIdFromCookie = () => {
    const searchCookie = 'pastebookSessionId=';
    var cookieVal = "";
    if (document.cookie.length > 0) {
      let getCookieVal = document.cookie.indexOf(searchCookie);
      if (getCookieVal !== -1) {
        getCookieVal += searchCookie.length;
        let end = document.cookie.indexOf(";", getCookieVal);
        if (end === -1) {
          end = document.cookie.length;
        }
        cookieVal = document.cookie.substring(getCookieVal, end);
        return cookieVal;
      }
    }
    else {
      navigate("/login", { replace: true });

    }
  }

  return (
    <Routes>
      <Route path='/' element={<Home getSessionIdFromCookie={getSessionIdFromCookie} baseUrl={baseUrl} getUserData={getUserData} userData={userData}  />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile/:username/albums' element={<Album getSessionIdFromCookie={getSessionIdFromCookie} baseUrl={baseUrl} getUserData={getUserData} userData={userData}/>} />
      <Route path='/profile/:username/albums/:albumId' element={<Photos getSessionIdFromCookie={getSessionIdFromCookie} baseUrl={baseUrl} getUserData={getUserData} userData={userData}/>} />
      <Route path='/profile/:username/albums/:albumId/photos/:photoId' element={<Photo />} />
      <Route path='/friends' element={<Friends getSessionIdFromCookie={getSessionIdFromCookie} getUserData={getUserData} userData={userData} />} />
      <Route path='/posts/:postId' element={<Post getSessionIdFromCookie={getSessionIdFromCookie} getUserData={getUserData} userData={userData}/>} />
      <Route path='/post' element={<Post />} />
      <Route path='/profile/:username' element={<Profile />} />
      <Route path='/settings' element={<Settings getSessionIdFromCookie={getSessionIdFromCookie} getUserData={getUserData} userData={userData} baseUrl={baseUrl} />} />
      <Route path='/register' element={<Register baseUrl={baseUrl} />} />
    </Routes>
  );
};

export default App;