import React from 'react';
import './HomeFriends.css';
import { FaUserFriends } from 'react-icons/fa';


const HomeFriends = () => {
  return (
    <div id="home-friends">
      <a id="friends-anchor" href="#">
        <FaUserFriends
          id="home-friends-icon"
          size={25}
        />
        <h4>Friends</h4>
      </a>
    </div>);
};

export default HomeFriends;
