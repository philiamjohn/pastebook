import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProfileHeader.css';
import { ImCamera } from 'react-icons/im';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import { BsPlusCircle } from 'react-icons/bs';

import userphoto from '../../images/default-dp.jpg';


const ProfileHeader = (props) => {
    const { firstName, lastName, profilePicture, getProfilePosts } = props;
    const baseUrl = `http://localhost:5000`;
    const homeUserId = localStorage.getItem('homeUserId');
    const [profilePictureSource, setProfilePictureSource] = useState(null);
    const [onEditProfilePicture, setOnEditProfilePicture] = useState(false);
    const [doneEditingProfilePicture, setDoneEditingProfilePicture] = useState(false);

    useEffect(() => {
        setProfilePictureSource(profilePicture);
    }, [props]);

    const getSessionIdFromCookie = () => {
        const searchCookie = "pastebookSessionId=";
        if (document.cookie.length > 0) {
            // Search for pastebookSessionId cookie.
            let offset = document.cookie.indexOf(searchCookie)

            if (offset != -1) {
                offset += searchCookie.length
                // Set index of beginning of value 
                let end = document.cookie.indexOf(";", offset)

                if (end == -1) {
                    end = document.cookie.length
                }

                const pastebookSessionId = document.cookie.substring(offset, end);
                console.log(`pastebookSessionId: ${pastebookSessionId}`);
                return pastebookSessionId;
            }
        }
    }

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const editProfilePicture = async () => {
        const sessionId = getSessionIdFromCookie();
        const profilePictureDetails = {
            ProfilePicture: profilePictureSource
        };

        console.table(profilePictureDetails);

        const response = await fetch(`${baseUrl}/editprofilepicture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-UserId': homeUserId,
                'X-SessionID': sessionId
            },
            body: JSON.stringify(profilePictureDetails)
        });
        if (response.status === 500 || response.status === 401) {
            alert("Profile Picture not changed.");
        }
        else if (response.status === 200) {
            setOnEditProfilePicture(false);
            setDoneEditingProfilePicture(true);
            alert("Profile Picture successfully changed.");
            window.location.reload();
        }
        else {
            alert(response.status);
        }
    }

    // executes when picture is selected from the file system
    useEffect(async () => {
        if (onEditProfilePicture) {
            const confirmAction = window.confirm("You sure you want to change your profile picture?");
            if (!confirmAction) {
                document.getElementById("profile-open-file-system").value = "";
                setProfilePictureSource(profilePicture);
                setOnEditProfilePicture(false);
                return;
            }
            await editProfilePicture();
        }
    }, [onEditProfilePicture]);

    const onSelectImageFile = async (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const base64 = await convertImageToBase64(file);
            setProfilePictureSource(await base64);
            setOnEditProfilePicture(true);
        }
    }

    useEffect(() => {
        // Get the modal
        var menuModal = document.getElementById("menu-modal");
        var notificationsModal = document.getElementById("notifications-modal");
        var searchResultsModal = document.getElementById("search-results-modal");
        var likesModal = document.getElementById("likesModal");
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = (event) => {
            if (event.target == menuModal) {
                menuModal.style.display = "none";
            }
            else if (event.target == notificationsModal) {
                notificationsModal.style.display = "none";
            }
            else if (event.target == searchResultsModal) {
                searchResultsModal.style.display = "none";
            }
            else if (event.target == likesModal) {
                likesModal.style.display = "none";
            }
        }
    }, []);

    return (
        <div className='body'>
            <div className='s1-profile-head'>
                <div className='s1-r1-cover-photo'></div>
                <div className='s1-r2-banner'>
                    <div className='s1-r2-user-photo'>
                        <img src={profilePictureSource ? profilePictureSource : userphoto} alt='Default User'></img>
                        <div className='s1-r2-edit-photo-btn'>
                            {/* <button onClick={editProfilePicture}>< ImCamera size={20} /></button> */}
                            <label id="profile-add-picture-label" className="profile-label">
                                {/* "accept="image/*" so only image uploads are allowed. */}
                                <input id="profile-open-file-system" type="file" accept="image/*" onChange={onSelectImageFile} required />
                                <span id="profile-add-picture-button">
                                    <ImCamera
                                        id="profile-add-picture-icon"
                                        size={20} />
                                </span>
                            </label>

                        </div>

                    </div>
                    <div className='s1-r2-name'>
                        <p className='s1-r2-user-full-name'>{firstName} {lastName}</p>
                    </div>
                    <div className='s1-r2-buttons'>
                        <button className='text block-border-shadow' id='edit-profile-btn'>< MdModeEditOutline size={15} />  Edit profile</button>
                        <button className='text block-border-shadow' id='add-friend-btn'>< BsPlusCircle size={15} />  Add friend</button>
                        <button className='text block-border-shadow' id='yes-friend-btn'>< BsFillPersonCheckFill size={15} />  Friends</button>
                    </div>
                    <div className='s1-r3-tabs'>
                        <button className='text'><Link to='/username' style={{ textDecoration: 'none', color: 'inherit' }}>Posts</Link></button>
                        <button className='text'><Link to='/about' style={{ textDecoration: 'none', color: 'inherit' }}>About</Link></button>
                        <button className='text'><Link to='/friends' style={{ textDecoration: 'none', color: 'inherit' }}>Friends</Link></button>
                        <button className='text'><Link to='/photos' style={{ textDecoration: 'none', color: 'inherit' }}>Photos</Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;