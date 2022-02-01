import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import HomeAlbums from '../../components/home-albums/HomeAlbums';
import HomeCreatePost from '../../components/home-create-post/HomeCreatePost';
import HomeFriends from '../../components/home-friends/HomeFriends';
import HomeProfile from '../../components/home-profile/HomeProfile';
import PostComponent from '../../components/post/Post';
import './Home.css';

const Home = ({ getSessionIdFromCookie, baseUrl, getUserData, userData }) => {
  let navigate = useNavigate();
  const [homeData, setHomeData] = useState({});
  const [homePosts, setHomePosts] = useState(null);
  const [currentSessionId, setCurrentSessionId] = useState("");

  const [intervalId, setIntervalId] = useState(null);
  const [fetchCountState, setFetchCountState] = useState(1);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  
  const pastebookSessionId = getSessionIdFromCookie();
  const getHomePageData = async () => {
    
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
      if (response.status === 500 || response.status === 401) {
        navigate("/login", { replace: true });
      }
      // If it exists populate homepage data
      else if (response.status === 200) {
        const homepageData = await response.json();
        console.table(await homepageData);
        localStorage.setItem('homeUserId', homepageData.User_ID);
        localStorage.setItem('profileUsername', homepageData.UserName);
        setHomeData(homepageData);
        setCurrentSessionId(pastebookSessionId);
      }
      // In case other response status is received
      else {
        alert(response.status)
        navigate("/login", { replace: true });
      }
    }

  }

  const getHomePosts = async (fetchCount) => {
    const homeUserId = localStorage.getItem('homeUserId');
    const response = await fetch(`${baseUrl}/homeposts`, {
      method: 'GET',
      headers: {
        'X-UserId': homeUserId,
        'X-FetchCount': fetchCount
      },
    });

    if (response.status === 200) {
      const homepagePosts = await response.json();
      console.table(await homepagePosts);
      if (homepagePosts.length < 10) {
        setAllPostsLoaded(true);
      }
      if (homePosts !== null) {
        setHomePosts([...homePosts, ...homepagePosts]);
      }
      else {
        setHomePosts(homepagePosts);
      }
    }
    else {
      console.log(response.status);
    }
  }

  const getHome = async (getHomePostsCallback, fetchCount) => {
    await getHomePageData();
    await getHomePostsCallback(fetchCount);
  }

  useEffect(async () => {
    getUserData();
    //clear all setIntervals
    for (let id = 0; id <= 1000; id++) {
      window.clearInterval(id);
    }
    // Get the modal
    var menuModal = document.getElementById("menu-modal");
    var notificationsModal = document.getElementById("notifications-modal");
    var searchResultsModal = document.getElementById("search-results-modal");
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
      if (event.target == menuModal) {
        menuModal.style.display = "none";
      }
      else if (event.target == notificationsModal) {
        notificationsModal.style.display = "none";
      }
      else if (event.target == searchResultsModal) {
        searchResultsModal.style.display = "none";
      }
    }

    await getHome(getHomePosts, fetchCountState);
    setFetchCountState(fetchCountState + 1)

    // refresh page content after 1 minute
    // const refreshPage = setInterval(async () => {
    //   await getHome(getHomePosts, 1);
    // }, 60000);

    // setIntervalId(refreshPage);

    // return () => clearInterval(refreshPage);
  }, []);

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
      alert("interval stopped");
    }
  }, [intervalId]);

  useEffect(() => {
  }, [fetchCountState]);


  const loadMorePosts = () => {
    getHomePosts(fetchCountState);
    setFetchCountState(fetchCountState + 1);
    clearInterval(intervalId);
  }

  return (
    <div id="home-body">
      <Header username={userData.UserName} getSessionIdFromCookie={getSessionIdFromCookie} />
      <div id="home-content">
        <div id="home-content-left">
          <HomeProfile userData={userData} />
          <HomeFriends />
          <HomeAlbums />
        </div>

        <div id="home-content-create-post">
          <HomeCreatePost userId={homeData.User_ID} sessionId={currentSessionId} getHomePosts={getHomePosts} />
        </div>
      </div>

      <div className='home-timeline-container'>
        <div id="home-timeline-posts" >
          {
            homePosts
              ?
              homePosts.map((post) => {
                return (
                  <PostComponent
                    key={post.Post_ID}
                    sessionIdFromCookie={pastebookSessionId}
                    postID={post.Post_ID}
                    authorID={post.User_ID}
                    postTimeStamp={post.DatePosted}
                    postContentText={post.Content}
                    postContentImg={post.Image}
                    userID={localStorage.getItem('homeUserId')}
                  />)
              })
              : <h5>Posts are being fetched, kindly wait...</h5>
          }
          {
            homePosts && !allPostsLoaded
              ? <button id="home-load-more-posts" onClick={loadMorePosts}>Load more posts</button>
              : null
          }
        </div>
      </div>
    </div>
  );
};

export default Home;