import React from 'react';
import './ListTab.css';
import FriendCard from '../name-pic-card/NamePicCard';
import FriendPhotoMock from '../../images/logo.svg';

const ListTab = () => {

    const friendName1 = "Juan dela Cruz"

    return (
      <div className='friends-content-list'>
          <FriendCard userPhoto={FriendPhotoMock} userName={friendName1} />
          <FriendCard userPhoto={FriendPhotoMock} userName={friendName1} />
          <FriendCard userPhoto={FriendPhotoMock} userName={friendName1} />
          <FriendCard userPhoto={FriendPhotoMock} userName={friendName1} />
          <FriendCard userPhoto={FriendPhotoMock} userName={friendName1} />
      </div>
    );
};

export default ListTab;
