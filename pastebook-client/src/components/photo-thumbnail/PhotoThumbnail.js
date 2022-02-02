import React from 'react';
import { Link } from 'react-router-dom';
import { MdModeEditOutline, MdDeleteForever } from 'react-icons/md';


const PhotoThumbnail = (props) => {
    const { albumFolder } = props;
    

    return (
        <div>
            <Link to={`/albums/${albumFolder.Album_ID}/${albumFolder.Photo_ID}`}>
                <img src={albumFolder.ImageFile} alt='Album Content'></img>
            </Link>
            <button className='s2-photos-btn' title='Edit Photo Caption'>< MdModeEditOutline size={15} /></button>
            <button className='s2-photos-btn' title='Delete Photo'>< MdDeleteForever size={15} /></button>                      
        </div>
    );
};

export default PhotoThumbnail;

