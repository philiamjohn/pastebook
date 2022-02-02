import React from 'react';
import { IoImagesSharp } from 'react-icons/io5';
import './HomeAlbums.css';

const HomeAlbums = (props) => {
  const { username } = props;
  return (
    <div id="home-albums">
      <a id="albums-anchor" href={`/profile/${username}/albums`}>
        <IoImagesSharp
          id="home-albums-icon"
          size={25} />
        <h4>Albums</h4>
      </a>
    </div>);
};

export default HomeAlbums;
