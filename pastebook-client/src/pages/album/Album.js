import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Album.css';
import { BsPlusLg } from 'react-icons/bs';

import ProfileHeader from '../../components/profile-header/ProfileHeader';
import Header from '../../components/header/Header';
import AlbumCreateModal from '../../components/album-create-modal/AlbumCreateModal';
import AlbumFolder from '../../components/album/Album';


const Album = ({ getSessionIdFromCookie, baseUrl }) => {
    const { username } = useParams();
    const [albumFolder, setAlbumFolder] = useState([]);
    const [profileData, setProfileData] = useState({});
    const usernameCurrentlyLoggedIn = localStorage.getItem('profileUsername');
    const userId = localStorage.getItem('homeUserId');

    getSessionIdFromCookie();

    useEffect(() => {
        // Get the modal
        var createAlbumModal = document.getElementById("create-album-modal");

        // Get the <div> element that closes the modal
        var closeModal = document.getElementsByClassName("create-album-modal-back")[0];

        // When the user clicks on <div> (<), close the modal
        closeModal.onclick = () => {
            createAlbumModal.style.display = "none";
        }

        // // Get the modal
        // var renameAlbumModal = document.getElementById("rename-album-modal");

        // // Get the <div> element that closes the modal
        // var closeRenameModal = document.getElementsByClassName("rename-album-modal-back")[0];
        
        // // When the user clicks on <div> (<), close the modal
        // closeRenameModal.onclick = () => {
        //     renameAlbumModal.style.display = "none";
        // }


        getProfilePageData();
    }, []);

    useEffect(() => {
        getAlbum();
    }, [profileData]);
    

    const getProfilePageData = async () => {

        const response = await fetch(`${baseUrl}/profile/${username}`, {
            method: 'GET',
            headers: {
                'X-UserId': userId
            },
        });

        if (response.status === 200) {
            const profilePageData = await response.json();
            console.table(await profilePageData);
            setProfileData(profilePageData);
        }
        else {
            console.log(response.status);
        }
    }

    const getAlbum = async () => {
        const response = await fetch(`${baseUrl}/username/albums`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User_ID': profileData.User_ID
            }
        });

        if (response.status === 500 || response.status === 401) {
            alert("Error");
        }
        else if (response.status === 200) {
            const albumData = await response.json();
            setAlbumFolder(albumData);
            console.table(albumData);
        }
        else {
            alert(response.status)
        }
    }

    // When the user clicks the button, the modal opens 
    const openModal = () => {
        document.getElementById("create-album-modal").style.display = "block";
    }

    return (
        <div className='body'>
            <Header username={usernameCurrentlyLoggedIn} getSessionIdFromCookie={getSessionIdFromCookie} />
            <ProfileHeader profileData={profileData} username={username}/>
            <div className='s2-album .block-border-shadow'>
                <div className='s2-album-title block-title-1'>Albums</div>
                <div className='s2-album-content'>
                    {
                        profileData.OwnProfile
                            ?
                            <div className='s2-album-create'>
                                <button className='s2-album-create-btn' id='s2-album-create-btn' onClick={openModal}>
                                    <BsPlusLg size={30} />
                                </button>
                                <p className='text'>Create Album</p>
                            </div>
                            : null
                    }
                    {
                        profileData.OwnProfile || profileData.Friends
                            ?
                            albumFolder
                                ?
                                albumFolder.map((album) => {
                                    return (
                                        <div className='s2-album-folders'>
                                            <AlbumFolder
                                                albumFolder={album}
                                                profileData={profileData}
                                            />
                                        </div>
                                    )
                                })
                                : <div></div>
                            : null
                    }
                </div>
            </div>
            <AlbumCreateModal sendAlbumToServer={setAlbumFolder} />
        </div>
    );
};

export default Album;