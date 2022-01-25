import React from 'react';

export const FriendsCard = (props) => {

    const[

    ] = props
  return (
      <div className='FriendsCard'>
          <div className='friendsCard-img'>
              <img src={friendPhoto} alt="friend-img"/>
          </div>
          <div className='friendsCard-name'>
              <h5>{friendName}</h5>
          </div>
      </div>
  );
};
