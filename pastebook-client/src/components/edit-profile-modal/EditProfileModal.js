import React, { useEffect } from 'react'
import './EditProfileModal.css';

const EditProfileModal = (props) => {
    const { profileData } = props;
    const baseUrl = `http://localhost:5000`;
    //Triggers after first render
    useEffect(() => {
        // Get the modal
        var editProfileModal = document.getElementById("edit-profile-modal");

        // Get the button that opens the modal
        var editProfileButton = document.getElementById("edit-profile-btn");

        // When the user clicks the button, open the modal 
        editProfileButton.onclick = () => {
            editProfileModal.style.display = "block";
        }
    }, []);

    const closeEditProfileModal = () => {
        document.getElementById("edit-profile-modal").style.display = "none";
        document.getElementById("profile-blurb-text").value = profileData.ProfileDesc;
    }

    useEffect(() => {
        document.getElementById("profile-blurb-text").value = profileData.ProfileDesc;
        document.getElementById("profile-first-name").value = profileData.FirstName;
        document.getElementById("profile-last-name").value = profileData.LastName;
    }, [props]);


    return (
        <div id="edit-profile-modal" className="edit-profile-modal">
            <div className="edit-profile-modal-content">
                <span id="edit-profile-modal-close" onClick={closeEditProfileModal}>&times;</span>
                <h3>Profile Details</h3>
                <h5>First Name</h5>
                <input id="profile-first-name" type="text" placeholder='First Name'></input>
                <h5>Last Name</h5>
                <input id="profile-last-name" type="text" placeholder='Last Name'></input>
                <h5>Email</h5>
                <h5>Password</h5>
                <h5>Birthday</h5>
                <h5>Gender</h5>
                <h5>Phone</h5>
                <h5>Profile Description</h5>
                <textarea id="profile-blurb-text" name="profile-blurb-text" maxLength={2000} placeholder="Profile Decription"></textarea>
            </div>
        </div>
    );
};

export default EditProfileModal;
