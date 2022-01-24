import React from 'react';
import { FaUserFriends } from 'react-icons/fa';

const FriendRequestAcceptedNotification = (props) => {
    const { newFriend } = props;
    return (
        <p>
            <FaUserFriends
                id="friend-request-accepted-icon"
                size={15}
                color='black' />
            {newFriend} accepted your friend request.
        </p>);
};

export default FriendRequestAcceptedNotification;
