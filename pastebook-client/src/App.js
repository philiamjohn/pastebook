import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Album from './pages/album/Album';
import Post from './pages/post/Post';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';
import Register from './pages/register/Register';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/username/photos' element={<Album />} />
      <Route path='/post' element={<Post />} />
      <Route path='/username' element={<Profile />} /> 
        {/* endpoint to be changed into userName = firstName+lastname+disambiguiator */}
      <Route path='/settings' element={<Settings/>} />
      <Route path='/register' element={<Register/>} />
    </Routes>
  );
};

export default App;