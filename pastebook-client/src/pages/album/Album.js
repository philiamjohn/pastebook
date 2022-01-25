import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Album.css';
import { BsPlusLg } from 'react-icons/bs';
import { MdModeEditOutline, MdDeleteForever } from 'react-icons/md';

import albumphoto from '../../images/default-album.png';
import ProfileHeader from '../../components/profile-header/ProfileHeader';


const Album = () => {

    return (
        <div className='body'>
            <ProfileHeader />
            <div className='s2-album .block-border-shadow'>
                <div className='s2-album-title block-title-1'>Albums</div>
                <div className='s2-album-content'>
                    <div className='s2-album-create'>
                        <button className='s2-album-create-btn'><BsPlusLg size={30}/></button>
                        <p className='text'>Create Album</p>
                    </div>
                    <div>
                        <img src={albumphoto} alt='Album Cover'></img>
                        <p className='text'>New Album</p>
                        <button className='s2-album-btn' title='Rename Album'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-album-btn' title='Delete Album'>< MdDeleteForever size={15} /></button>                      
                    </div>
                </div>            
            </div>
        </div>
    );
};

export default Album;