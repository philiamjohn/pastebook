import { Routes, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/username/albums' element={<Album />} />
      <Route path='/username/albums/photos' element={<Photos />} />
      <Route path='/friends' element={<Friends />} />
      <Route path='/post' element={<Post />} />
      <Route path='/username' element={<Profile />} /> 
        {/* endpoint to be changed into userName = firstName+lastname+disambiguiator */}
      <Route path='/settings' element={<Settings/>} />
      <Route path='/register' element={<Register/>} />
    </Routes>
  );
};

export default App;