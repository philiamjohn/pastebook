import React, { useEffect, useState } from 'react';
import './ListTab.css';
import FriendCard from '../name-pic-card/NamePicCard';
import FriendPhotoMock from '../../images/logo.svg';

const ListTab = ({ getSessionIdFromCookie, userData }) => {
  const baseUrl = `http://localhost:5000`;

  useEffect(() => {
    getFriendsList();
  }, []);

  const [friendsList, setFriendsList] = useState(null);
  const getFriendsList = async () => {
    //get the session and userId from cookie and localStorage
    const sessionId = getSessionIdFromCookie();
    const homeUserId = localStorage.getItem('homeUserId');

    const response = await fetch(`${baseUrl}/friendslist/${homeUserId}`, {
      method: 'GET',
      headers: {
        "X-SessionID": sessionId,
      },
    });

    if (response.status === 200) {
      const friendRequestList = await response.json();
      setFriendsList(friendRequestList);
    }
  }
  return (
    <div className='friends-content-list'>
      {friendsList ? friendsList.map((e) => {
        return (
          <div className='friends-content-list-item' key={e.User_ID}>
            <FriendCard username={e.UserName} profilePic={e.ProfilePicture} firstName={e.FirstName} lastName={e.LastName}   />
          </div>
        )
      })
      : <div>Fetching Friends, kindly wait...</div>//will show if fetching and no friends retrieve
    }
    </div>
  );
};

export default ListTab;
