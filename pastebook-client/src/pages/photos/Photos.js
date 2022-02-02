import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Photos.css';
import { BsPlusLg } from 'react-icons/bs';
import { MdModeEditOutline, MdDeleteForever, MdArrowBack } from 'react-icons/md';

import photo from '../../images/default-image.png';
import ProfileHeader from '../../components/profile-header/ProfileHeader';
import Header from '../../components/header/Header';
import PhotoThumbnail from '../../components/photo-thumbnail/PhotoThumbnail';


const Photos = ({ getSessionIdFromCookie, baseUrl }) => {
    const [albumFolder, setAlbumFolder] = useState([]);
    const [profileData, setProfileData] = useState({});
    const [imageSource, setImageSource] = useState(null)
    const { username, albumId } = useParams();
    const usernameCurrentlyLoggedIn = localStorage.getItem('profileUsername');
    const userId = localStorage.getItem('homeUserId');

    getSessionIdFromCookie();

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

    const getPhotos = async () => {
        const response = await fetch(`${baseUrl}/albums/${albumId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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

    const sendPhotoToServer = async () => {
        const photoDetails = {
            Album_ID: albumId,
            ImageFile: imageSource
            // PhotoCaption: photoCaption
        }

        console.table(photoDetails);

        const response = await fetch(`${baseUrl}/albums/${albumId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(photoDetails)
        });

        if (response.status === 500 || response.status === 401) {
            alert("Photo upload failed.");
        }
        else if (response.status === 200) {
            alert("Photo uploaded successfully.");
            await getPhotos();
            document.getElementById('photos-modal').style.display = "none";
        }
        else {
            alert(response.status)
        }

    }

    const onImageChange = async (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const base64 = await convertImageToBase64(file);
            setImageSource(await base64);
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

    const showUploadPhotoModal = () => {
        document.getElementById('photos-modal').style.display = "block";
    }

    useEffect(() => {
        // Get the modal
        var uploadPhotosModal = document.getElementById("photos-modal");

        // Get the <div> element that closes the modal
        var closeUploadPhotosModal = document.getElementsByClassName("photos-modal-back")[0];

        // When the user clicks on <div> (<), close the modal
        closeUploadPhotosModal.onclick = () => {
            uploadPhotosModal.style.display = "none";
        }

        getProfilePageData();
        getPhotos();
    }, []);

    return (
        <div className='body'>
            <Header username={usernameCurrentlyLoggedIn} getSessionIdFromCookie={getSessionIdFromCookie} />
            <ProfileHeader profileData={profileData} username={username} />
            <div className='s2-photos .block-border-shadow'>
                <div className='s2-photos-title block-title-1'>
                    { albumFolder.length >= 1 ? albumFolder[0].AlbumName : null}
                </div>
                <div className='s2-photos-content'>
                    {
                        profileData.OwnProfile
                            ?
                            <div className='s2-photos-create'>
                                <button className='s2-photos-create-btn' onClick={showUploadPhotoModal}><BsPlusLg size={30} /></button>
                                <p className='text'>Add Photos</p>
                            </div>
                            : null
                    }
                    {
                        albumFolder
                            ?
                            albumFolder.map((album) => {
                                return (
                                    <div className='s2-album-folders'>
                                        <PhotoThumbnail
                                            albumFolder={album}
                                            profileData={profileData}
                                        />
                                    </div>
                                )
                            })
                            : <div></div>
                    }
                </div>
                <div id='photos-modal' >
                    <div className='photos-modal-content'>
                        <div className="photos-modal-back">< MdArrowBack /></div>
                        <div className='photos-modal-title block-title-1'>Upload Photos</div>
                        <input className='photos-modal-add-file-btn' type="file" accept="image/*" onChange={onImageChange} />
                        {/* <input className='photos-modal-add-caption' type="textarea"/> */}
                        <button className='photos-modal-submit' onClick={sendPhotoToServer} >Upload</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Photos;