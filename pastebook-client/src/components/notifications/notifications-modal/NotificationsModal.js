import React, { useEffect } from 'react'
import './NotificationsModal.css';
import LikeNotification from '../like-notification/LikeNotification';
import FriendRequestAcceptedNotification from '../friend-request-accepted-notification/FriendRequestAcceptedNotification';
import CommentNotification from '../comment-notification/CommentNotification';
import FriendRequestNotification from '../friend-request-notification/FriendRequestNotification';
import PostOnProfileNotification from '../post-on-profile-notification/PostOnProfileNotification';
import { BsListCheck } from 'react-icons/bs';

const NotificationsModal = (props) => {
    const { notifications, getNotifications, baseUrl, userId } = props;
    //Triggers after first render
    useEffect(() => {
        // Get the modal
        var notificationsModal = document.getElementById("notifications-modal");

        // Get the button that opens the modal
        var notificationsButton = document.getElementById("notifications-button");

        // When the user clicks the button, open the modal 
        notificationsButton.onclick = () => {
            notificationsModal.style.display = "block";
        }
    }, []);

    const makeAllNotificationsRead = async () => {
        const response = await fetch(`${baseUrl}/clearallnotifications/${userId}`, {
            method: 'PATCH'
        });
        if (response.status === 500 || response.status === 401) {
            alert("Notifications not changed to read");
        }
        else if (response.status === 200) {
            await getNotifications();
        }
        else {
            alert(response.status);
        }
    }

    const makeNotificationRead = async (notificationId) => {
        const response = await fetch(`${baseUrl}/notifications/${notificationId}`, {
            method: 'PATCH'
        });
        if (response.status === 500 || response.status === 401) {
            alert("Notification not changed to read");
        }
        else if (response.status === 200) {
            await getNotifications();
        }
        else {
            alert(response.status);
        }
    }

    return (
        <div id="notifications-modal" className="notifications-modal">
            <div className="notifications-modal-content">
                <p>
                    <button onClick={makeAllNotificationsRead}>
                        {/* <BsListCheck size={15} color='black' /> */}
                        Clear All Notifications
                    </button>
                </p>
                {
                    notifications.map((notification) => {
                        if (notification.Type === "friendrequest") {
                            return (
                                <FriendRequestNotification key={notification.Notification_ID} notification={notification} makeNotificationRead={makeNotificationRead} />
                            )
                        }
                        else if (notification.Type === "requestaccepted") {
                            return (
                                <FriendRequestAcceptedNotification key={notification.Notification_ID} notification={notification} makeNotificationRead={makeNotificationRead} />
                            )
                        }
                        else if (notification.Type === "friendpostedonprofile") {
                            return (
                                <PostOnProfileNotification key={notification.Notification_ID} notification={notification} makeNotificationRead={makeNotificationRead} />
                            )
                        }
                    })
                }
                {/* <LikeNotification liker={"Jacqueline"} />
                <FriendRequestAcceptedNotification newFriend={"Philiam"} />
                <CommentNotification commenter={"Gavin"} />
                <FriendRequestNotification requestSender={"Arhon"} />
                <PostOnProfileNotification friendWhoPosted={"Nigel"} /> */}
            </div>
        </div>
    );
};

export default NotificationsModal;
