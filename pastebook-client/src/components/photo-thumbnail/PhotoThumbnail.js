import React from 'react';
// import { Link } from 'react-router-dom';
// import './Album.css';
import { MdModeEditOutline, MdDeleteForever } from 'react-icons/md';

// import { Link } from 'react-router-dom';


const PhotoThumbnail = (props) => {
    const { albumFolder } = props;
    

    return (
        <div>
            <img src={albumFolder.ImageFile} alt='Album Content'></img>
            <button className='s2-photos-btn' title='Edit Photo Caption'>< MdModeEditOutline size={15} /></button>
            <button className='s2-photos-btn' title='Delete Photo'>< MdDeleteForever size={15} /></button>                      
        </div>
    );
};

export default PhotoThumbnail;

