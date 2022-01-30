import React from 'react';
import { IoPersonAdd } from 'react-icons/io5';
import { AiFillDelete } from 'react-icons/ai';
import { BsCheck2 } from 'react-icons/bs';
import './FriendRequestNotification.css';


const FriendRequestNotification = (props) => {
    const { notification, makeNotificationRead } = props;
    return (
        <p className={notification.ReadStatus === "unread" ? 'notification-unread' : ''}>
            <IoPersonAdd
                id="friend-request-icon"
                size={15}
                color='black' />
            {notification.Name} sent you a friend request.
            {
                notification.ReadStatus === "unread"
                    ?
                    <button id="friend-request-clear-button" onClick={() => makeNotificationRead(notification.Notification_ID)}>
                        <BsCheck2
                            id="friend-request-clear-icon"
                            size={15}
                            color='black' />
                    </button>
                    : <div></div>
            }
            <div className="notification-date-triggered">{notification.DateTriggered}</div>
        </p>);
};

export default FriendRequestNotification;
