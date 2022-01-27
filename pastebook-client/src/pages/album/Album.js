import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import './Album.css';
import { BsPlusLg } from 'react-icons/bs';
import { MdModeEditOutline, MdDeleteForever } from 'react-icons/md';

import albumphoto from '../../images/default-album.png';
import ProfileHeader from '../../components/profile-header/ProfileHeader';
import Header from '../../components/header/Header';
import AlbumCreateModal from '../../components/album-create-modal/AlbumCreateModal';


const Album = () => {

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
      }, []);

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
                    <div>
                        <img src={albumphoto} alt='Album Cover'></img>
                        <p className='text'>New Album</p>
                        <button className='s2-album-btn' title='Rename Album'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-album-btn' title='Delete Album'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={albumphoto} alt='Album Cover'></img>
                        <p className='text'>New Album</p>
                        <button className='s2-album-btn' title='Rename Album'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-album-btn' title='Delete Album'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={albumphoto} alt='Album Cover'></img>
                        <p className='text'>New Album</p>
                        <button className='s2-album-btn' title='Rename Album'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-album-btn' title='Delete Album'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={albumphoto} alt='Album Cover'></img>
                        <p className='text'>New Album</p>
                        <button className='s2-album-btn' title='Rename Album'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-album-btn' title='Delete Album'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={albumphoto} alt='Album Cover'></img>
                        <p className='text'>New Album</p>
                        <button className='s2-album-btn' title='Rename Album'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-album-btn' title='Delete Album'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={albumphoto} alt='Album Cover'></img>
                        <p className='text'>New Album</p>
                        <button className='s2-album-btn' title='Rename Album'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-album-btn' title='Delete Album'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={albumphoto} alt='Album Cover'></img>
                        <p className='text'>New Album</p>
                        <button className='s2-album-btn' title='Rename Album'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-album-btn' title='Delete Album'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={albumphoto} alt='Album Cover'></img>
                        <p className='text'>New Album</p>
                        <button className='s2-album-btn' title='Rename Album'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-album-btn' title='Delete Album'>< MdDeleteForever size={15} /></button>                      
                    </div>
                </div>            
            </div>
            <AlbumCreateModal />
        </div>
    );
};

export default Album;