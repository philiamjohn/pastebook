import React from 'react';
import { Link } from 'react-router-dom';
import { BiCommentDetail } from 'react-icons/bi';
import { BsCheckLg } from 'react-icons/bs';

const CommentNotification = (props) => {
    const { notification, makeNotificationRead } = props;
    return (
        <p className={notification.ReadStatus === "unread" ? 'notification-unread' : ''}>
            <BiCommentDetail
                id="comment-icon"
                size={15}
                color='black' />
            <Link to={`/posts/${notification.Content}`} className='notification-link'>{notification.Name} commented your post.</Link>
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

export default CommentNotification;
