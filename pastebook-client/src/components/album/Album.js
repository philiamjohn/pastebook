import React from 'react';
// import { Link } from 'react-router-dom';
import './Album.css';
import { MdModeEditOutline, MdDeleteForever } from 'react-icons/md';

import albumphoto from '../../images/default-album.png';
import { Link } from 'react-router-dom';


const Album = (props) => {
    const { albumFolder } = props;
    

    return (
        <div>
            <img src={albumphoto} alt='Album Cover'></img>
            <p className='text'>
                <Link to={`/albums/${albumFolder.Album_ID}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    {albumFolder.AlbumName}
                </Link>
            </p>
            <button className='s2-album-btn' title='Rename Album'>< MdModeEditOutline size={15} /></button>
            <button className='s2-album-btn' title='Delete Album'>< MdDeleteForever size={15} /></button>                      
        </div>
    );
};

export default Album;