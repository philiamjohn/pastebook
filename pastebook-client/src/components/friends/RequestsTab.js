import React, { useState, useEffect } from 'react';
import './RequestsTab.css';
import FriendRequestCard from './FriendRequestCard';
import FriendPhotoMock from '../../images/logo.svg';

const RequestsTab = ({ getSessionIdFromCookie }) => {
  const baseUrl = `http://localhost:5000`;
  const [friendRequests, setFriendRequests] = useState(null);

  const getFriendRequests = async () => {
    const sessionId = getSessionIdFromCookie();
    const homeUserId = localStorage.getItem('homeUserId');
    const response = await fetch(`${baseUrl}/friendrequests/${homeUserId}`, {
      method: 'GET',
      headers: {
        "X-SessionID": sessionId,
      },
    });

    if (response.status === 200) {
      const friendRequestList = await response.json();
      console.log(await friendRequestList);
      setFriendRequests(friendRequestList);
    }
    else {
      console.log(response.status);
    }
  }

  const confirmFriendRequest = async (request) => {
    const response = await fetch(`${baseUrl}/confirmfriendrequest/${request.Notification_ID}`, {
      method: 'PATCH',
      headers: {
        'X-CurrentUserId': request.Target_ID,
        'X-RequestorUserId': request.User_ID
      },
    });
    if (response.status === 500 || response.status === 401) {
      alert("Friend request not accepted");
    }
    else if (response.status === 200) {
      alert(`You are now friends with ${request.Name}`);
      await getFriendRequests();
    }
    else {
      alert(response.status);
    }
  }

  const deleteFriendRequest = async (request) => {
    const response = await fetch(`${baseUrl}/deletefriendrequest/${request.Notification_ID}`, {
      method: 'DELETE',
    });
    if (response.status === 500 || response.status === 401) {
      alert("Friend request not deleted.");
    }
    else if (response.status === 200) {
      alert(`${request.Name}'s friend request has been deleted.`);
      await getFriendRequests();
    }
    else {
      alert(response.status);
    }
  }

  useEffect(async () => {
    await getFriendRequests();
  }, []);


  const friendName1 = "Juan Pls Add me"
  return (
    <div className='friends-content-requests-list'>
      {
        friendRequests
          ? friendRequests.length
            ? friendRequests.map((friendRequest) => {
              return (
                <div className='friends-content-requests-list-item' key={friendRequest.Notification_ID}>
                  <FriendRequestCard key={friendRequest.Notification_ID} friendRequestDetails={friendRequest} confirmFriendRequest={confirmFriendRequest} deleteFriendRequest={deleteFriendRequest}/>
                </div>
              )
            })
            : <div>You don't have any friend request.</div>
          : <div>Fetching Friend Requests, kindly wait...</div>
      }
    </div>
  );
};

export default RequestsTab;
