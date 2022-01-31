import React, { useEffect, useState } from 'react';
import './ListTab.css';
import FriendCard from '../name-pic-card/NamePicCard';
import FriendPhotoMock from '../../images/logo.svg';

const ListTab = ({ getSessionIdFromCookie, userData }) => {
  const baseUrl = `http://localhost:5000`;

  const friendName1 = "Juan dela Cruz"
  useEffect(() => {

    console.log(getSessionIdFromCookie() + " kkkkkkkkkkk");

    console.log(localStorage.getItem('homeUserId') + " uyghjmk");
    getFriendsList();
  }, []);

  const [friendsList, setFriendsList] = useState(null);
  const getFriendsList = async () => {
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
      console.table(friendRequestList);
      setFriendsList(friendRequestList);
    }
    else {
      console.log(response.status);
    }
  }
  return (
    <div className='friends-content-list'>
      {friendsList ? friendsList.map((e) => {
        return (
          <div className='friends-content-list-item' key={e.User_ID}>
            <FriendCard username={e.UserName} profilePic={e.ProfilePicture} fullname={`${e.FirstName}  ${e.LastName}`  } />
          </div>
        )
      })
      : <div>Fetching Friends, kindly wait...</div>
    }

    </div>
  );
};

export default ListTab;
