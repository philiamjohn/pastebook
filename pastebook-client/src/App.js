import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/username' element={<Profile />} /> 
        {/* endpoint to be changed into userName = firstName+lastname+disambiguiator */}
    </Routes>
  );
};


export default App;
