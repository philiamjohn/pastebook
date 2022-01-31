import React, { useEffect } from 'react';
import './NamePicCard.css'
import userPhoto from '../../images/default-dp.jpg';
import { Link } from 'react-router-dom';


const NamePicCard = (props) => {

    const { profilePic, fullname, username } = props;
    useEffect(() => {
        console.log(profilePic, "heeeee");
    }, []);

    return (
        <div className='NamePicCard'>
            <Link to={`/profile/${username}`} target="_blank" >
                <div className='namePicCard-img'>
                    <img src={profilePic ? profilePic : userPhoto} alt="user-img" />
                </div>
                <div className='namePicCard-name'>
                    <h5>{fullname}</h5>
                </div>
            </Link>
        </div>
    );
};

export default NamePicCard;
