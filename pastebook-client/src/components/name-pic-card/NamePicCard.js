import React from 'react';
import './NamePicCard.css'

const NamePicCard = (props) => {

    const {profilePic,
           firstName,
           lastName} = props;
    
    return (
        <div className='NamePicCard'>
            <div className='namePicCard-img'>
                <img src={profilePic} alt="user-img"/>
            </div>
            <div className='namePicCard-name'>
                <h5>{firstName} {lastName}</h5>
            </div>
        </div>
    );
};

export default NamePicCard;
