import React from 'react';
import './FriendRequestCard.css';
import userPhoto from '../../images/default-dp.jpg';
import { Link } from 'react-router-dom';

const FriendRequestCard = (props) => {
    const { friendRequestDetails, confirmFriendRequest, deleteFriendRequest } = props;
    return (
        <div className='FriendRequestCard'>
            <div className='friendRequestCard-details'>
                <div className='friendRequestCard-details-img'>
                    <img src={friendRequestDetails.ProfilePicture ? friendRequestDetails.ProfilePicture : userPhoto} alt="friendRequest-img" />
                </div>
                <div className='friendRequestCard-details-name'>
                    <Link to={`/profile/${friendRequestDetails.UserName}`} ><h5>{friendRequestDetails.Name}</h5></Link>
                </div>
            </div>
            <div className='friendRequestCard-actions'>
                <button id='requestConfirm' onClick={() => confirmFriendRequest(friendRequestDetails)}>Confirm</button>
                <button id='requestDelete' onClick={() => deleteFriendRequest(friendRequestDetails)}>Delete</button>
            </div>
        </div>
    );
};

export default FriendRequestCard;
