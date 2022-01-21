import React from 'react';
import { CgProfile, CgDetailsMore } from 'react-icons/cg';
import { AiOutlinePicture } from 'react-icons/ai';
import './HomeAlbums.css';

const HomeAlbums = (props) => {
  const { albums } = props;
  return (
    <div id="home-albums">
      <h3>Albums</h3>
      <div>
        {
          albums.map(albumName =>
            <div id="albums-list-preview">
              <AiOutlinePicture size={30} />
              <div id="home-album-name">{albumName}</div>
            </div>)
        }
      </div>
      <a id="albums-anchor" href="#" ><CgDetailsMore size={25} color="black" /> <div>See all albums</div></a>
    </div>);
};

export default HomeAlbums;
