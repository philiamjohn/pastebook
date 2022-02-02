import React from 'react';
import { Link } from 'react-router-dom';
import { BsFilePost, BsCheckLg } from 'react-icons/bs';

const PostOnProfileNotification = (props) => {
    const { notification, makeNotificationRead } = props;
    return (
        <p className={notification.ReadStatus === "unread" ? 'notification-unread' : ''}>
            <BsFilePost
                id="post-on-profile-icon"
                size={15}
                color='black' />
            <a href={`/posts/${notification.Content}`} className='notification-link'>{notification.Name} posted on your profile.</a>
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

export default PostOnProfileNotification;
