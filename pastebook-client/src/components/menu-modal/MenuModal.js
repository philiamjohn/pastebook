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

        // Get the button that opens the modal
        var menuButton = document.getElementById("menu-button");

        // When the user clicks the button, open the modal 
        menuButton.onclick = () => {
            menuModal.style.display = "block";
        }
    }, []);

    return (
        <div id="menu-modal" class="menu-modal">
            <div class="menu-modal-content">
                <a href="#">
                    <p>
                        <FaUserAlt
                            id="profile-icon"
                            size={15}
                            color='black' />
                        Profile
                    </p>
                </a>
                <a href="#">
                    <p>
                        <IoMdSettings
                            id="settings-icon"
                            size={15}
                            color='black' />
                        Settings
                    </p>
                </a>
                <a href="#">
                    <p>
                        <BiLogOut
                            id="logout-icon"
                            size={15}
                            color='black' />
                        Logout
                    </p>
                </a>
            </div>
        </div>
    );
};

export default MenuModal;
