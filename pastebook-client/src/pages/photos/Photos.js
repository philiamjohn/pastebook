import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Photos.css';
import { BsPlusLg } from 'react-icons/bs';
import { MdModeEditOutline, MdDeleteForever, MdArrowBack } from 'react-icons/md';

import photo from '../../images/default-image.png';
import ProfileHeader from '../../components/profile-header/ProfileHeader';
import Header from '../../components/header/Header';
import PhotoThumbnail from '../../components/photo-thumbnail/PhotoThumbnail';


const Photos = () => {
    const [ albumFolder, setAlbumFolder ] = useState([{},{},{}]);
    const [profileData, setProfileData] = useState({});
    const [imageSource, setImageSource] = useState(null)
    const { albumId } = useParams();
    const username = localStorage.getItem('profileUsername');
    const userId = localStorage.getItem('homeUserId');
    const baseUrl = `http://localhost:5000`;

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
            console.log(albumData);
        }
        else {
            alert(response.status)
        }
    }

    const sendPhotoToServer = async (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const base64 = await convertImageToBase64(file);
            setImageSource(await base64);
        }

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
        }
        else {
            alert(response.status)
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
            <Header username={username} />
            <ProfileHeader profileData={profileData} />
            <div className='s2-photos .block-border-shadow'>
                <div className='s2-photos-title block-title-1'>
                    Album Name
                     
                </div>
                <div className='s2-photos-content'>
                    <div className='s2-photos-create'>
                        <button className='s2-photos-create-btn'onClick={showUploadPhotoModal}><BsPlusLg size={30}/></button>
                        <p className='text'>Add Photos</p>
                    </div>
                    <div>
                        <img src={photo} alt='Default'></img>
                        <button className='s2-photos-btn' title='Edit Photo Caption'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-photos-btn' title='Delete Photo'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    {
                        albumFolder
                        ?                        
                            albumFolder.map((album) => {
                                return (
                                    <div className='s2-album-folders'>
                                    <PhotoThumbnail
                                        albumFolder={album}
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
                        <input className='photos-modal-add-file-btn' type="file" accept="image/*"/>
                        <button className='photos-modal-submit' onClick={sendPhotoToServer} >Upload</button>                      
                    </div>
                </div>            
            </div>
        </div>
    );
};

export default Photos;