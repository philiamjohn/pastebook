import React, { useEffect } from 'react';
import './AlbumCreateModal.css';
import { MdArrowBack } from 'react-icons/md';

const AlbumCreateModal = () => {

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

    const sendAlbumDetails = () => {
        
    }

    return (
        <div id="create-album-modal" className='create-album-modal block-border-shadow'>
            <div className='album-details'>
                <div className="create-album-modal-back">< MdArrowBack /></div>
                <div className='create-album-modal-title block-title-1'>Create Album</div>
                <form id='create-album-form' onSubmit={sendAlbumDetails}>
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
                    <div className="create-album-modal-line">
                        <div className="create-album-modal-label text">
                            <label htmlFor="add-photo">Add Photo</label>
                        </div>
                        <div className="box">
                            <input 
                                type="file" 
                                id="add-photo" 
                                name="add-photo"
                                required
                            />
                        </div>
                    </div>
                    <input type='submit'></input>
                </form>                
            </div>
            <div className='album-photos'>

            </div>
        </div>
    );
};

export default AlbumCreateModal;