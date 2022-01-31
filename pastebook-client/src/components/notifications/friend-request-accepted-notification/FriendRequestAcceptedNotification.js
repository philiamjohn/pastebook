import React from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const FriendRequestAcceptedNotification = (props) => {
    const { notification, makeNotificationRead } = props;
    return (
        <p className={notification.ReadStatus === "unread" ? 'notification-unread' : ''}>
            <FaUserFriends
                id="friend-request-accepted-icon"
                size={15}
                color='black' />
            <Link to='/friends' className='notification-link'>{notification.Name} accepted your friend request.</Link>
            {
                notification.ReadStatus === "unread"
                    ?
                    <button className="notification-clear-button" onClick={() => makeNotificationRead(notification.Notification_ID)}>
                        <BsCheckLg
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
