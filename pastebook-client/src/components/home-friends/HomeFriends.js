import React from 'react';
import { CgProfile, CgDetailsMore } from 'react-icons/cg';
import './HomeFriends.css';

const HomeFriends = (props) => {
  const { friends } = props;
  return (
    <div id="home-friends">
      <h3>Friends</h3>
      <div>
        {
          friends.map(friendName =>
            <div id="friends-list-preview">
              <CgProfile size={30} />
              <div id="home-friend-name">{friendName}</div>
            </div>)
        }
      </div>
      <a id="friends-anchor" href="#" ><CgDetailsMore size={25} color="black" /> <div>See all friends</div></a>
    </div>);
};

export default HomeFriends;
