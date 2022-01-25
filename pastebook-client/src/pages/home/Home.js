import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import HomeAlbums from '../../components/home-albums/HomeAlbums';
import HomeCreatePost from '../../components/home-create-post/HomeCreatePost';
import HomeFriends from '../../components/home-friends/HomeFriends';
import HomeProfile from '../../components/home-profile/HomeProfile';
import PostComponent from '../../components/post/Post';
import Avatar from '../../images/avatar.png';
import MeowDrama from '../../images/meow-drama.jpg';
import './Home.css'

const Home = () => {
  let navigate = useNavigate();
  const baseUrl = `http://localhost:5000`;
  const [homeData, setHomeData] = useState({});

  useEffect(async () => {
    const searchCookie = "pastebookSessionId=";

    if (document.cookie.length > 0) {
      // Search for a cookie.
      let offset = document.cookie.indexOf(searchCookie)

      if (offset != -1) {
        offset += searchCookie.length
        // Set index of beginning of value 
        let end = document.cookie.indexOf(";", offset)

        if (end == -1) {
          end = document.cookie.length
        }

        const pastebookSessionId = document.cookie.substring(offset, end);
        console.log(`pastebookSessionId: ${pastebookSessionId}`);

        if (pastebookSessionId == null) {
          navigate("/login", { replace: true });
        }
        else {
          //Check if session id exists in the DB
          const response = await fetch(`${baseUrl}/home`, {
            method: 'GET',
            headers: {
              'X-SessionID': pastebookSessionId
            },
          });

          // If it doesnt exist redirect to login
          if (response.status == 500 || response.status == 401) {
            navigate("/login", { replace: true });
          }
          // If it exists populate homepage data
          else if (response.status == 200) {
            const homepageData = JSON.parse(await response.text()).Value;
            console.table(await homepageData);
            alert(`currentUserEmail: ${homepageData.Email}; currentUserPhone: ${homepageData.Phone}`);
            setHomeData(homepageData);
          }
          // In case other response status is received
          else {
            alert(response.status)
            navigate("/login", { replace: true });
          }
        }
      }
    }
    // If no cookie stored, redirect immediately to login
    else {
      navigate("/login", { replace: true });
    }

    return () => {
    };
  }, []);


  return (
    <div>
      <Header />
      <div id="home-content">
        <div id="home-content-left">
          <HomeProfile currentUser={`${homeData.FirstName} ${homeData.LastName}`} />
          <HomeFriends />
          <HomeAlbums />
        </div>

        <div id="home-content-create-post">
          <HomeCreatePost />
        </div>
      </div>

      <div id="home-timeline-posts">
        <PostComponent authorImg={Avatar}
          authorName="Juan dela Cruz XI"
          postTimeStamp="10 hours ago"
          postContentP="meowdrama"
          postContentImg={MeowDrama}
          likeCount="123"
          commentCount="321"
          likeStatus={false} />
        <PostComponent authorImg={Avatar}
          authorName="Juan dela Cruz XI"
          postTimeStamp="10 hours ago"
          postContentP="meowdrama"
          postContentImg={MeowDrama}
          likeCount="123"
          commentCount="321"
          likeStatus={false} />
        <PostComponent authorImg={Avatar}
          authorName="Juan dela Cruz XI"
          postTimeStamp="10 hours ago"
          postContentP="meowdrama"
          postContentImg={MeowDrama}
          likeCount="123"
          commentCount="321"
          likeStatus={false} />
      </div>

    </div>
  );
};

export default Home;