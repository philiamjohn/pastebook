import React from 'react';
import '../friends/friends.css';

const friends = () => {
  return (
    <div className='friends'>
        <div className='friends-title'>
            <h3>Friends</h3>
        </div>
        <div className='friends-nav'>
            <div className='friends-nav-list'><p>Lists</p></div>
            <div className='friends-nav-requests'><p>Requests</p></div>
        </div>
        <div className='friends-content'>Content</div>
    </div>   
  );
};

export default friends;
