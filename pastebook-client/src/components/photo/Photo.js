import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Photo.css';

// import { Link } from 'react-router-dom';
import { MdModeEditOutline, MdDeleteForever } from 'react-icons/md';
// import image from '../../images/default-dp.jpg';

const Photo = (props) => {
    const [ photoDetails, setPhotoDetails ] = useState([]);
    const { photoId } = useParams();
    const baseUrl = `http://localhost:5000`;

    const getPhotos = async () => {
        const response = await fetch(`${baseUrl}/photo/${photoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 500 || response.status === 401) {
            alert("Error");
        }
        else if (response.status === 200) {
            const photoData = await response.json();
            setPhotoDetails(photoData);
            console.table(photoData);
        }
        else {
            alert(response.status)
        }
    }

    useEffect(() => {
        getPhotos();
    }, []);
    

    return (
        <div id='photo-preview'>
            <div className='photo-preview-container'>
                <img className='image-spotlight' src={photoDetails.ImageFile} alt='Album Content'></img>
            </div>
            <div className='photo-preview-content'>

            </div>
            <button className='s2-photos-btn' title='Edit Photo Caption'>< MdModeEditOutline size={15} /></button>
            <button className='s2-photos-btn' title='Delete Photo'>< MdDeleteForever size={15} /></button>                      
        </div>
    );
};

export default Photo;

