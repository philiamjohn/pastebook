import React from 'react';
import { IoPersonAdd } from 'react-icons/io5';

const FriendRequestNotification = (props) => {
    const { requestSender } = props;
    return (
        <p>
            <IoPersonAdd
                id="friend-request-icon"
                size={15}
                color='black' />
            {requestSender} sent you a friend request.
        </p>);
};

export default FriendRequestNotification;
