import React from 'react';
import './RequestsTab.css';
import FriendRequestCard from './FriendRequestCard';
import FriendPhotoMock from '../../images/logo.svg';

const RequestsTab = () => {

    const friendName1 = "Juan Pls Add me"
    return (
      <div className='friends-content-requests-list'>
          <div className='friends-content-requests-list-item'>
            <FriendRequestCard friendRequestPhoto={FriendPhotoMock} friendRequestName={friendName1} />
          </div>
          <div className='friends-content-requests-list-item'>
            <FriendRequestCard friendRequestPhoto={FriendPhotoMock} friendRequestName={friendName1} />
          </div>
          <div className='friends-content-requests-list-item'>
            <FriendRequestCard friendRequestPhoto={FriendPhotoMock} friendRequestName={friendName1} />
          </div>
          <div className='friends-content-requests-list-item'>
            <FriendRequestCard friendRequestPhoto={FriendPhotoMock} friendRequestName={friendName1} />
          </div>
      </div>
    );
};

export default RequestsTab;
