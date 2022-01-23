import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Settings from './pages/settings/Settings';
import Register from './pages/register/Register';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/settings' element={<Settings/>} />
      <Route path='/register' element={<Register/>} />
    </Routes>
  );
};


export default App;
