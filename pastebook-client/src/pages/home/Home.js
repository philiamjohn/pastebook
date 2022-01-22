import React from 'react';
import Header from '../../components/header/Header';
import HomeAlbums from '../../components/home-albums/HomeAlbums';
import HomeCreatePost from '../../components/home-create-post/HomeCreatePost';
import HomeFriends from '../../components/home-friends/HomeFriends';
import HomeProfile from '../../components/home-profile/HomeProfile';
import './Home.css'

const Home = () => {
  return (
    <div>
      <Header />
      <div id="home-content">
        <div id="home-content-left">
          <HomeProfile currentUser={"Peter Parker"} />
          <HomeFriends />
          <HomeAlbums />
          <div id="home-empty-div-1"></div>
        </div>

        <div id="home-content-newsfeed">
          <HomeCreatePost />
        </div>
        <div id="home-empty-div-2"></div>
      </div>
    </div>
  );
};

export default Home;