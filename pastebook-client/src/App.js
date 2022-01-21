import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Settings from './pages/settings/Settings';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/settings' element={<Settings/>} />
    </Routes >
  );
};


export default App;
