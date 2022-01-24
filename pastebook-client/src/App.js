import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Friends from './pages/friends/Friends';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/friends' element={<Friends />} />

    </Routes>
  );
};


export default App;
