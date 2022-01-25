import React from 'react';
import './FriendRequestCard.css';

const FriendRequestCard = (props) => {

    const {friendRequestPhoto,
           friendRequestName} = props;
    
    return (
        <div className='FriendRequestCard'>
            <div className='friendRequestCard-details'>
                <div className='friendRequestCard-details-img'>
                    <img src={friendRequestPhoto} alt="friendRequest-img"/>
                </div>
                <div className='friendRequestCard-details-name'>
                    <h5>{friendRequestName}</h5>
                </div>
            </div>    
            <div className='friendRequestCard-actions'>
                <button id='requestConfirm'>Confirm</button>
                <button id='requestDelete'>Delete</button>
            </div>
        </div>
    );
};

export default FriendRequestCard;
