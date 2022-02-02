import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import './Album.css';
import { BsPlusLg } from 'react-icons/bs';

import ProfileHeader from '../../components/profile-header/ProfileHeader';
import Header from '../../components/header/Header';
import AlbumCreateModal from '../../components/album-create-modal/AlbumCreateModal';
import AlbumFolder from '../../components/album/Album';


const Album = () => {
    const [ albumFolder, setAlbumFolder ] = useState([{},{},{}]);
    const [profileData, setProfileData] = useState({});
    const username = localStorage.getItem('profileUsername');
    const userId = localStorage.getItem('homeUserId');
    const baseUrl = `http://localhost:5000`;

    useEffect(() => {
        // Get the modal
        var createAlbumModal = document.getElementById("create-album-modal");

        // Get the <div> element that closes the modal
        var closeModal = document.getElementsByClassName("create-album-modal-back")[0];
        
        // When the user clicks on <div> (<), close the modal
        closeModal.onclick = () => {
            createAlbumModal.style.display = "none";
        }

        getProfilePageData();
        getAlbum();
        
    }, []);
    
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
                'User_ID' : userId
            }
        });

        if (response.status === 500 || response.status === 401) {
            alert("Error");
        }
        else if (response.status === 200) {
            // alert("");
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
            <Header username={username} />
            <ProfileHeader profileData={profileData} />
            <div className='s2-album .block-border-shadow'>
                <div className='s2-album-title block-title-1'>Albums</div>
                <div className='s2-album-content'>
                    <div className='s2-album-create'>
                        <button className='s2-album-create-btn' id='s2-album-create-btn' onClick={openModal}>
                            <BsPlusLg size={30}/>
                        </button>
                        <p className='text'>Create Album</p>
                    </div>
                    {
                        albumFolder
                        ?                        
                            albumFolder.map((album) => {
                                return (
                                    <div className='s2-album-folders'>
                                    <AlbumFolder
                                        albumFolder={album}
                                    />
                                    </div>
                                )
                            })
                        : <div></div>
                    }
                    
                </div>            
            </div>
            <AlbumCreateModal sendAlbumToServer={setAlbumFolder} />
        </div>
    );
};

export default Album;