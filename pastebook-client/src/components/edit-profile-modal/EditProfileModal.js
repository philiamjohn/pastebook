import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { IoMdSettings } from 'react-icons/io';
import { FaUserAlt } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import './EditProfileModal.css';
import { useNavigate } from 'react-router-dom';

const EditProfileModal = (props) => {
    const { username } = props;
    const baseUrl = `http://localhost:5000`;
    let navigate = useNavigate();
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
        <div id="menu-modal" className="menu-modal">
            <div className="menu-modal-content">
                
            </div>
        </div>
    );
};

export default EditProfileModal;
