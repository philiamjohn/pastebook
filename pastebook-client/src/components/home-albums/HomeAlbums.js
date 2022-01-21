import React from 'react';
import { AiFillPicture } from 'react-icons/ai';
import './HomeAlbums.css';

const HomeAlbums = () => {
  return (
    <div id="home-albums">
      <a id="albums-anchor">
        <AiFillPicture 
          id="home-albums-icon"
          size={25}/>
        <h4>Albums</h4>
      </a>
    </div>);
};

export default HomeAlbums;
