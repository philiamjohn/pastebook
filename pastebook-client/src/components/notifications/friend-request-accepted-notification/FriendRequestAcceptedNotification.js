import React from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsCheck2 } from 'react-icons/bs';

const FriendRequestAcceptedNotification = (props) => {
    const { notification, makeNotificationRead } = props;
    return (
        <p className={notification.ReadStatus === "unread" ? 'notification-unread' : ''}>
            <FaUserFriends
                id="friend-request-accepted-icon"
                size={15}
                color='black' />
            {notification.Name} accepted your friend request.
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

export default FriendRequestAcceptedNotification;
