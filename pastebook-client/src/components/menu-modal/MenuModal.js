import React, { useEffect } from 'react'
import { IoMdSettings } from 'react-icons/io';
import { FaUserAlt } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import './MenuModal.css';

const MenuModal = () => {
    //Triggers after first render
    useEffect(() => {
        // Get the modal
        var menuModal = document.getElementById("menu-modal");
        var notificationsModal = document.getElementById("notifications-modal");

        // Get the button that opens the modal
        var menuAnchor = document.getElementById("menu-anchor");

        // When the user clicks the button, open the modal 
        menuAnchor.onclick = () => {
            menuModal.style.display = "block";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = (event) => {
            if (event.target == menuModal) {
                menuModal.style.display = "none";
            }
            else if (event.target == notificationsModal) {
                notificationsModal.style.display = "none";
            }
        }
    }, []);

    return (
        <div id="menu-modal" class="menu-modal">
            <div class="modal-content">
                <p>
                    <FaUserAlt
                        id="profile-icon"
                        size={15}
                        color='black' />
                    Profile
                </p>
                <p>
                    <IoMdSettings
                        id="settings-icon"
                        size={15}
                        color='black' />
                    Settings
                </p>
                <p>
                    <BiLogOut
                        id="logout-icon"
                        size={15}
                        color='black' />
                    Logout
                </p>
            </div>
        </div>
    );
};

export default MenuModal;
