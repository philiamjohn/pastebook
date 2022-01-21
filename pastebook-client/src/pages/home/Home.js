import React from 'react';
import Header from '../../components/header/Header';
import HomeAlbums from '../../components/home-albums/HomeAlbums';
import HomeFriends from '../../components/home-friends/HomeFriends';
import HomeProfile from '../../components/home-profile/HomeProfile';

const Home = () => {
  const friendsList = ["Olivia Rodrigo", "Bruno Mars", "Ed Sheeran", "Taylor Swift"];
  const albumsList = ["NY", "LA", "Europe", "Japan"];
  return (
    <div>
      <Header />
      <div id="home-content">
        <div id="home-content-left">
          <HomeProfile currentUser={"Peter Parker"} />
          <HomeFriends friends={friendsList} />
          <HomeAlbums albums={albumsList} />
        </div>
      </div>
    </div>
  );
};

export default Home;