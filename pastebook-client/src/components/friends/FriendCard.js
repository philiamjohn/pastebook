import React from 'react';
import './FriendCard.css'

const FriendCard = (props) => {

    const {friendPhoto,
           friendName} = props;
    
    return (
        <div className='FriendCard'>
            <div className='friendCard-img'>
                <img src={friendPhoto} alt="friend-img"/>
            </div>
            <div className='friendCard-name'>
                <h5>{friendName}</h5>
            </div>
        </div>
    );
};

export default FriendCard;
