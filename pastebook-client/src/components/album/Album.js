import React from 'react';
import { useParams } from 'react-router-dom';
import './Album.css';
import { MdModeEditOutline, MdDeleteForever } from 'react-icons/md';
import { MdArrowBack } from 'react-icons/md';

import albumphoto from '../../images/default-album.png';
import { Link } from 'react-router-dom';


const Album = (props) => {
    const { albumFolder, profileData } = props;
    const { username } = useParams();
    const baseUrl = `http://localhost:5000`;
    
    const renameAlbum = async () => {

        const confirmAction = window.confirm("Confirm renaming of album");
        if (!confirmAction) {
            //
        } else {
            var editedAlbum = document.getElementById(`rename-album-modal-edit-name` + albumFolder.Album_ID).value;
            const response = await fetch(`${baseUrl}/editAlbumName`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    AlbumName: ` ${editedAlbum}`,
                    Album_ID: albumFolder.Album_ID
                })
            });
            if (response.status === 200) {
                window.location.reload();
            }
        }
    }

    const deleteAlbum = async () => {

        const confirmAction = window.confirm("Confirm deleting of album");
        if (!confirmAction) {
            //
        } else {
            const response = await fetch(`${baseUrl}/deleteAlbum`, {
                method: 'DELETE',
                headers: { 
                    'Album_ID' : albumFolder.Album_ID
                }
            });
            if (response.status === 200) {
                window.location.reload();
            }
        }
    }
    const openRenameAlbumModal = async () => {
        document.getElementById('rename-album-modal' + albumFolder.Album_ID).style.display = "block";
    }

    return (
        <div>
            <div>
                <img src={albumphoto} alt='Album Cover'></img>
                <p className='text'>
                    <Link to={`/profile/${username}/albums/${albumFolder.Album_ID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {albumFolder.AlbumName}
                    </Link>
                </p>
                {
                    profileData.OwnProfile
                        ?
                        <>
                            <button className='s2-album-btn' title='Rename Album' onClick={openRenameAlbumModal}>< MdModeEditOutline size={15} /></button>
                            <button className='s2-album-btn' title='Delete Album' onClick={deleteAlbum}>< MdDeleteForever size={15} /></button>
                        </>
                        : null
                }
            </div>
            <div id={'rename-album-modal' + albumFolder.Album_ID} style={{display: 'none'}} >
                <div className='rename-album-modal-content'>
                    <div className="rename-album-modal-back">< MdArrowBack /></div>
                    <div className='rename-album-modal-title block-title-1'>Rename Album</div>
                    <input className='rename-album-modal-edit-name' id={'rename-album-modal-edit-name'+ albumFolder.Album_ID} type="text" defaultValue={albumFolder.AlbumName}/>
                    <button className='rename-album-modal-submit' onClick={renameAlbum}>Rename</button>                      
                </div>
            </div>                      
        </div>
    );
};

export default Album;