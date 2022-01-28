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
    const baseUrl = `http://localhost:5000`;

    useEffect(() => {
        // Get the modal
        var createAlbumModal = document.getElementById("create-album-modal");

        // Get the <div> element that closes the modal
        var closeModal = document.getElementsByClassName("create-album-modal-back")[0];

        // When the user clicks on <div> (<), close the modal
        closeModal.onclick = function() {
            createAlbumModal.style.display = "none";
        }
    
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = (event) => {
          if (event.target === createAlbumModal) {
            createAlbumModal.style.display = "none";
          }
        }

        getAlbum();
        
      }, []);
    
    const getAlbum = async () => {
        const userId = localStorage.getItem('homeUserId');
        console.log("\n\n\n\n\n" + userId);
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
            console.log(albumData);
        }
        else {
            alert(response.status)
        }
    }

    return (
        <div className='body'>
            <Header />
            <ProfileHeader />
            <div className='s2-album .block-border-shadow'>
                <div className='s2-album-title block-title-1'>Albums</div>
                <div className='s2-album-content'>
                    <div className='s2-album-create'>
                        <button className='s2-album-create-btn' id='s2-album-create-btn'><BsPlusLg size={30}/></button>
                        <p className='text'>Create Album</p>
                    </div>
                    {
                        albumFolder
                        ?
                        <div className='s2-album-folders'>
                            {
                            albumFolder.map((album) => {
                                return (
                                    <AlbumFolder
                                        albumFolder={album}
                                    />
                                )
                            })
                            }
                        </div>
                        : <div></div>
                    }
                    
                </div>            
            </div>
            <AlbumCreateModal sendAlbumToServer={setAlbumFolder} />
        </div>
    );
};

export default Album;