import React, { useEffect } from 'react'
import { BiCommentDetail } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';
import { IoPersonAdd } from 'react-icons/io5';
import { FaUserFriends } from 'react-icons/fa';
import { BsFilePost } from 'react-icons/bs';
import './NotificationsModal.css';

const NotificationsModal = () => {
    //Triggers after first render
    useEffect(() => {
        // Get the modal
        var notificationsModal = document.getElementById("notifications-modal");
        var menuModal = document.getElementById("menu-modal");


        // Get the button that opens the modal
        var notificationsAnchor = document.getElementById("notifications-anchor");

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
        }
    }, []);

    return (
        <div id="notifications-modal" class="notifications-modal">
            <div class="notifications-modal-content">
                <p>
                    <AiFillLike
                        id="like-icon"
                        size={15}
                        color='black' />
                    Jacqueline Bernal liked your post.
                </p>
                <p>
                    <FaUserFriends
                        id="friend-request-accepted-icon"
                        size={15}
                        color='black' />
                    Philiam accepted your friend request.
                </p>
                <p>
                    <BiCommentDetail
                        id="comment-icon"
                        size={15}
                        color='black' />
                    Gavin commented on your post.
                </p>
                <p>
                    <IoPersonAdd
                        id="friend-request-icon"
                        size={15}
                        color='black' />
                    Arhon sent you a friend request.
                </p>
                <p>
                    <BsFilePost
                        id="post-on-wall-icon"
                        size={15}
                        color='black' />
                    Nigel posted on your profile.
                </p>
            </div>
        </div>
    );
};

export default NotificationsModal;
