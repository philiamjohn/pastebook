import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import HomeAlbums from '../../components/home-albums/HomeAlbums';
import CreatePost from '../../components/home-create-post/CreatePost';
import HomeFriends from '../../components/home-friends/HomeFriends';
import HomeProfile from '../../components/home-profile/HomeProfile';
import PostComponent from '../../components/post/Post';
import './Home.css';


const Home = ({ getSessionIdFromCookie, baseUrl, getUserData, userData }) => {
  let navigate = useNavigate();
  const [homeData, setHomeData] = useState({});
  const [homePosts, setHomePosts] = useState(null);
  const [currentSessionId, setCurrentSessionId] = useState("");
  const [fetchCountState, setFetchCountState] = useState(2);
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

      if (fetchCount === 1) {
        // fetchCount === 1 means the homePosts array is being updated with new posts
        // thus the newly fetched data should be put in the beginning of the array
        // to avoid duplicate posts, we filter them out using their Post_IDs
        console.log("homePosts current value");
        console.table(homePosts);
        const homePostsFromLocalStorage = JSON.parse(localStorage.getItem("homePosts"));

        const posts = homePosts
          ? [...homepagePosts, ...homePosts]
          :
          homePostsFromLocalStorage
            ? [...homepagePosts, ...homePostsFromLocalStorage]
            : [...homepagePosts];

        const uniquePosts = Array.from(new Set(posts.map(post => post.Post_ID)))
          .map(postId => {
            return posts.find(post => post.Post_ID === postId)
          });

        console.table(uniquePosts);
        setHomePosts(uniquePosts);
        localStorage.setItem("homePosts", JSON.stringify(uniquePosts));
      }
      else {
        /// if fetchCount !== 1 means the posts being fetched are from earlier dates
        // thus the newly fetched data should be put in the end of the array
        const posts = [...homePosts, ...homepagePosts];
        const uniquePosts = Array.from(new Set(posts.map(post => post.Post_ID)))
          .map(postId => {
            return posts.find(post => post.Post_ID === postId)
          })
        console.table(uniquePosts);
        setHomePosts(uniquePosts);
        localStorage.setItem("homePosts", JSON.stringify(uniquePosts));
      }

      if (homepagePosts.length < 10) {
        setAllPostsLoaded(true);
      }
      else {
        setAllPostsLoaded(false);
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

  // this useeffect is triggered after the first render
  useEffect(async () => {
    getUserData();
    // empty homePosts from localStorage
    localStorage.setItem("homePosts", JSON.stringify([]));

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

    await getHome(getHomePosts, 1);

    // refresh page content after 1 minute
    const refreshPage = setInterval(async () => {
      await getHomePosts(1);
    }, 60000);

    return () => clearInterval(refreshPage);
  }, []);

  const loadMorePosts = () => {
    getHomePosts(fetchCountState);
    setFetchCountState(fetchCountState + 1);
  }

  return (
    <div id="home-body">
      <div className='home-header'>
        <Header username={userData.UserName} getSessionIdFromCookie={getSessionIdFromCookie} />

      </div>
      <div id="home-content">
        <div className="home-content-left">
          <HomeProfile userData={userData} />
          <HomeFriends />
          <HomeAlbums />
        </div>
        <div className="home-content-right">
          <div id="home-content-create-post">
            <CreatePost fromHome userId={homeData.User_ID} sessionId={currentSessionId} getHomePosts={getHomePosts} />
          </div>
          <div className='home-timeline-container'>
            <div id="home-timeline-posts" >
              {
                homePosts
                  ?
                  homePosts.map((post) => {
                    return (
                      <div className='home-post-container'>
                        <PostComponent
                          key={post.Post_ID}
                          sessionIdFromCookie={pastebookSessionId}
                          postID={post.Post_ID}
                          authorID={post.User_ID}
                          postTimeStamp={post.DatePosted}
                          postContentText={post.Content}
                          postContentImg={post.Image}
                          targetID={post.Target_ID}
                          userID={localStorage.getItem('homeUserId')}
                        />
                      </div>)
                  })
                  : <h5>Posts are being fetched, kindly wait...</h5>
              }
              {
                homePosts
                  ?
                  homePosts.length >= 1 && !allPostsLoaded
                    ? <button id="home-load-more-posts" className="load-more-posts" onClick={loadMorePosts}>Load more posts</button>
                    : <div>All posts have been loaded.</div>
                  : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;