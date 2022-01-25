import React from 'react';
import './ListTab.css';
import FriendCard from './FriendCard';
import FriendPhotoMock from '../../images/logo.svg';

const ListTab = () => {

    const friendName1 = "Juan dela Cruz"

    return (
      <div className='friends-content-list'>
          <FriendCard friendPhoto={FriendPhotoMock} friendName={friendName1} />
          <FriendCard friendPhoto={FriendPhotoMock} friendName={friendName1} />
          <FriendCard friendPhoto={FriendPhotoMock} friendName={friendName1} />
          <FriendCard friendPhoto={FriendPhotoMock} friendName={friendName1} />
          <FriendCard friendPhoto={FriendPhotoMock} friendName={friendName1} />
      </div>
    );
};

export default ListTab;
