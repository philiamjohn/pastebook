import React, { useEffect } from 'react'
import './NotificationsModal.css';
import LikeNotification from '../like-notification/LikeNotification';
import FriendRequestAcceptedNotification from '../friend-request-accepted-notification/FriendRequestAcceptedNotification';
import CommentNotification from '../comment-notification/CommentNotification';
import FriendRequestNotification from '../friend-request-notification/FriendRequestNotification';
import PostOnProfileNotification from '../post-on-profile-notification/PostOnProfileNotification';

const NotificationsModal = () => {
    //Triggers after first render
    useEffect(() => {
        // Get the modal
        var notificationsModal = document.getElementById("notifications-modal");
        var menuModal = document.getElementById("menu-modal");
        var searchResultsModal = document.getElementById("search-results-modal");

        // Get the button that opens the modal
        var notificationsAnchor = document.getElementById("notifications-button");

        // When the user clicks the button, open the modal 
        notificationsAnchor.onclick = () => {
            notificationsModal.style.display = "block";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = (event) => {
            if (event.target == notificationsModal) {
                notificationsModal.style.display = "none";
            }
            else if (event.target == menuModal) {
                menuModal.style.display = "none";
            }
            else if (event.target == searchResultsModal) {
                searchResultsModal.style.display = "none";
            }
        }
    }, []);

    return (
        <div id="notifications-modal" class="notifications-modal">
            <div class="notifications-modal-content">
                <LikeNotification liker={"Jacqueline"} />
                <FriendRequestAcceptedNotification newFriend={"Philiam"} />
                <CommentNotification commenter={"Gavin"} />
                <FriendRequestNotification requestSender={"Arhon"} />
                <PostOnProfileNotification friendWhoPosted={"Nigel"} />
                <LikeNotification liker={"Miguel"} />
                <FriendRequestAcceptedNotification newFriend={"Jen"} />
                <CommentNotification commenter={"Jasper"} />
                <FriendRequestNotification requestSender={"Charles"} />
                <PostOnProfileNotification friendWhoPosted={"Claude"} />
                <LikeNotification liker={"Bree"} />
                <FriendRequestAcceptedNotification newFriend={"Cams"} />
                <CommentNotification commenter={"JP"} />
                <FriendRequestNotification requestSender={"JK"} />
                <PostOnProfileNotification friendWhoPosted={"Josh"} />
                <LikeNotification liker={"Chock"} />
                <FriendRequestAcceptedNotification newFriend={"Val"} />
                <CommentNotification commenter={"Vincent"} />
                <FriendRequestNotification requestSender={"Marc"} />
                <PostOnProfileNotification friendWhoPosted={"Bene"} />
            </div>
        </div>
    );
};

export default NotificationsModal;
