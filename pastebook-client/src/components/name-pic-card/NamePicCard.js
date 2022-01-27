import React from 'react';
import './NamePicCard.css'

const NamePicCard = (props) => {

    const {userPhoto,
           userName} = props;
    
    return (
        <div className='NamePicCard'>
            <div className='namePicCard-img'>
                <img src={userPhoto} alt="user-img"/>
            </div>
            <div className='namePicCard-name'>
                <h5>{userName}</h5>
            </div>
        </div>
    );
};

export default NamePicCard;
