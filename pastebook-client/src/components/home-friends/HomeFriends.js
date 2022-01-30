import React from 'react';
import './HomeFriends.css';
import { FaUserFriends } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const HomeFriends = () => {
  return (
    <div id="home-friends">
      <a id="friends-anchor" href="/friends">
        <FaUserFriends
          id="home-friends-icon"
          size={25}
        />
        <h4>Friends</h4>
      </a>
    </div>);
};

export default HomeFriends;
