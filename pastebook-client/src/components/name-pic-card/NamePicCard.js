import React, { useEffect } from 'react';
import './NamePicCard.css'
import userPhoto from '../../images/default-dp.jpg';
import { Link } from 'react-router-dom';


const NamePicCard = (props) => {

    const { profilePic,
            firstName, 
            lastName,
            username } = props;
    
    useEffect(() => {

    }, []);

    return (
        <div className='NamePicCard'>   
            <Link to={`/profile/${username}`} target="_blank" >         
                <div className='namePicCard-img'>
                    <img src={profilePic ? profilePic : userPhoto} alt="user-img" />
                </div>
            </Link>    
            <div className='namePicCard-name'>
                <Link to={`/profile/${username}`} target="_blank" >
                    <h5>{firstName} {lastName}</h5>
                </Link>      
            </div>
        </div>
    );
};

export default NamePicCard;
