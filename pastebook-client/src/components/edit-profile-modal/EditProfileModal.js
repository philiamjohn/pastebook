import React, { useEffect } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import './EditProfileModal.css';

const EditProfileModal = (props) => {
    const { profileData, getSessionIdFromCookie } = props;
    const homeUserId = localStorage.getItem('homeUserId');
    const baseUrl = `http://localhost:5000`;
    //Triggers after first render and when props change
    useEffect(() => {
        document.getElementById("profile-blurb-text").value = profileData.ProfileDesc;
        // Get the modal
        var editProfileModal = document.getElementById("edit-profile-modal");

        // Get the button that opens the modal
        var editProfileButton = document.getElementById("edit-profile-btn");

        // When the user clicks the button, open the modal 
        if (editProfileButton) {
            editProfileButton.onclick = () => {
                editProfileModal.style.display = "block";
            }
        }
    }, [props]);

    const closeEditProfileModal = () => {
        document.getElementById("edit-profile-modal").style.display = "none";
        document.getElementById("profile-blurb-text").value = profileData.ProfileDesc;
    }

    const onEditProfileIntro = async () => {
        const sessionId = getSessionIdFromCookie();
        const profileDescriptionDetails = {
            ProfileDesc: document.getElementById("profile-blurb-text").value
        };

        const response = await fetch(`${baseUrl}/editprofiledescription`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-UserId': homeUserId,
                'X-SessionID': sessionId
            },
            body: JSON.stringify(profileDescriptionDetails)
        });

        if (response.status === 500 || response.status === 401) {
            alert("Profile Intro not changed.");
        }
        else if (response.status === 200) {
            alert("Profile Intro successfully changed.");
            window.location.reload();
        }
        else {
            alert(response.status);
        }
    }

    return (
        <div id="edit-profile-modal" className="edit-profile-modal">
            <div className="edit-profile-modal-content">
                <span id="edit-profile-modal-close" onClick={closeEditProfileModal}>&times;</span>
                <h3>Profile Intro</h3>
                <div><textarea id="profile-blurb-text" name="profile-blurb-text" maxLength={2000} placeholder="Profile Decription"></textarea></div>
                <button id="edit-profile-description-button" onClick={onEditProfileIntro}><FaRegEdit size={20} /> Edit</button>
            </div>
        </div>
    );
};

export default EditProfileModal;
