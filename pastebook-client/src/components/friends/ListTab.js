import React from 'react';
import './ListTab.css';
import FriendCard from '../name-pic-card/NamePicCard';
import FriendPhotoMock from '../../images/logo.svg';

const ListTab = () => {

    const friendName1 = "Juan dela Cruz"

    return (
      <div className='friends-content-list'>
          <div className='friends-content-list-item'>
            <FriendCard userPhoto={FriendPhotoMock} userName={friendName1} />
          </div>
          <div className='friends-content-list-item'>
            <FriendCard userPhoto={FriendPhotoMock} userName={friendName1} />
          </div>
          <div className='friends-content-list-item'>
            <FriendCard userPhoto={FriendPhotoMock} userName={friendName1} />
          </div>
          <div className='friends-content-list-item'>
            <FriendCard userPhoto={FriendPhotoMock} userName={friendName1} />
          </div>
          <div className='friends-content-list-item'>
            <FriendCard userPhoto={FriendPhotoMock} userName={friendName1} />
          </div>
          <div className='friends-content-list-item'>
            <FriendCard userPhoto={FriendPhotoMock} userName={friendName1} />
          </div>
          <div className='friends-content-list-item'>
            <FriendCard userPhoto={FriendPhotoMock} userName={friendName1} />
          </div>
          <div className='friends-content-list-item'>
            <FriendCard userPhoto={FriendPhotoMock} userName={friendName1} />
          </div>
      </div>
    );
};

export default ListTab;
