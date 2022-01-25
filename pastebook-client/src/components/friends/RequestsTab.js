import React from 'react';
import FriendRequestCard from './FriendRequestCard';
import FriendPhotoMock from '../../images/logo.svg';

const RequestsTab = () => {

    const friendName1 = "Juan Pls Add me"
    return (
      <div className='friends-content-requests'>
          <FriendRequestCard friendRequestPhoto={FriendPhotoMock} friendRequestName={friendName1} />
          <FriendRequestCard friendRequestPhoto={FriendPhotoMock} friendRequestName={friendName1} />
          <FriendRequestCard friendRequestPhoto={FriendPhotoMock} friendRequestName={friendName1} />
          <FriendRequestCard friendRequestPhoto={FriendPhotoMock} friendRequestName={friendName1} />
      </div>
    );
};

export default RequestsTab;
