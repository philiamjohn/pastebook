import React from 'react';
import { IoPersonAdd } from 'react-icons/io5';
import { AiOutlineCheckCircle } from 'react-icons/ai';
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
                    <button className="notification-clear-button" onClick={() => makeNotificationRead(notification.Notification_ID)}>
                        <BsCheck2
                            className="notification-clear-icon"
                            size={15}
                            color='rgb(0, 165, 22)' />
                    </button>
                    : <div></div>
            }
            <div className="notification-date-triggered">{notification.DateTriggered}</div>
        </p>);
};

export default FriendRequestNotification;
