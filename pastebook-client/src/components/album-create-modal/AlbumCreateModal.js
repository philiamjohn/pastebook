import React, { useEffect } from 'react';
import './AlbumCreateModal.css';
import { MdArrowBack } from 'react-icons/md';

const AlbumCreateModal = () => {
    const baseUrl = `http://localhost:5000`;


    useEffect(() => {
        // Gets the modal below
        var createAlbumModal = document.getElementById("create-album-modal");

        // Gets the button that opens the modal in Album.js  
        var createAlbumBtn = document.getElementById("s2-album-create-btn");

        // When the user clicks the button, the modal opens 
        createAlbumBtn.onlick = () => {
            createAlbumModal.style.display = "block";
        }
    }, []);

    const sendAlbumToServer = async () => {
        const albumName = document.getElementById("album-name").value;
        const userId = localStorage.getItem('homeUserId');

        const albumDetails = {
            User_ID: userId,
            AlbumName: albumName
        }

        console.table(albumDetails);

        const response = await fetch(`${baseUrl}/albums/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(albumDetails)
        });

        if (response.status === 500 || response.status === 401) {
            alert("Cannot create album.");
        }
        else if (response.status === 200) {
            alert("Album successfully created.");
            document.getElementById("album-name").value = "";
        }
        else {
            alert(response.status)
        }
    }

    return (
        <div id="create-album-modal" className='create-album-modal block-border-shadow'>
            <div className='album-details'>
                <div className="create-album-modal-back">< MdArrowBack /></div>
                <div className='create-album-modal-title block-title-1'>Create Album</div>
                <form id='create-album-form' onSubmit={sendAlbumToServer}>
                    <div className="create-album-modal-line">
                        <div className="create-album-modal-label text">
                            <label htmlFor="album-name">Album Name</label>
                        </div>
                        <div className="box">
                            <input 
                                type="text" 
                                id="album-name"
                                className='input' 
                                name="album-name"
                                maxLength="50" 
                                required
                            />
                        </div>
                    </div>
                    
                    <input id='create-album-modal-submit' className='create-album-modal-submit text' type='submit' value='Create'></input>
                </form>                
            </div>
            <div className='album-photos'>

            </div>
        </div>
    );
};

export default AlbumCreateModal;