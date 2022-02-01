import React from 'react';
import { IoPersonAdd } from 'react-icons/io5';
import { BsCheckLg } from 'react-icons/bs';
import './FriendRequestNotification.css';
import { Link } from 'react-router-dom';


const FriendRequestNotification = (props) => {
    const { notification, makeNotificationRead } = props;
    return (
        <p className={notification.ReadStatus === "unread" ? 'notification-unread' : ''}>
            <IoPersonAdd
                id="friend-request-icon"
                size={15}
                color='black' />
            <Link to={'/friends'} className='notification-link'>{notification.Name} sent you a friend request.</Link>
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

export default FriendRequestNotification;
