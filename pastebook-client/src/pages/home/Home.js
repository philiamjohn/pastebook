import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import HomeAlbums from '../../components/home-albums/HomeAlbums';
import HomeCreatePost from '../../components/home-create-post/HomeCreatePost';
import HomeFriends from '../../components/home-friends/HomeFriends';
import HomeProfile from '../../components/home-profile/HomeProfile';
import PostComponent from '../../components/post/Post';
import './Home.css'

const Home = () => {
  let navigate = useNavigate();
  const baseUrl = `http://localhost:5000`;
  const [homeData, setHomeData] = useState({});
  // set empty array of empty objects to achieve loading animation effect
  const [homePosts, setHomePosts] = useState(null);
  const [currentSessionId, setCurrentSessionId] = useState("");
  const getSessionIdFromCookie = () => {
    const searchCookie = "pastebookSessionId=";
    if (document.cookie.length > 0) {
      // Search for pastebookSessionId cookie.
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
        return pastebookSessionId;
      }
    }
    // If no cookie stored, redirect immediately to login
    else {
      navigate("/login", { replace: true });
    }
  }

  const getHomePageData = async () => {
    const pastebookSessionId = getSessionIdFromCookie();
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

  const getHomePosts = async () => {
    const homeUserId = localStorage.getItem('homeUserId');
    const response = await fetch(`${baseUrl}/homeposts`, {
      method: 'GET',
      headers: {
        'X-UserId': homeUserId
      },
    });

    if (response.status === 200) {
      const homepagePosts = await response.json();
      console.table(await homepagePosts);
      setHomePosts(homepagePosts);
    }
    else {
      console.log(response.status);
    }
  }

  const getHome = async (getHomePostsCallback) => {
    await getHomePageData();
    await getHomePostsCallback();
  }

  useEffect(async () => {
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

    await getHome(getHomePosts);

    // refresh page content after 1 minute
    const refreshPage = setInterval(async () => {
      console.log("Hiiiiiiiiiii");
      await getHome(getHomePosts);

    }, 60000);

    return () => clearInterval(refreshPage);
  }, []);
  return (
    <div id="home-body">
      <Header username={homeData.UserName} getSessionIdFromCookie={getSessionIdFromCookie} />
      <div id="home-content">
        <div id="home-content-left">
          <HomeProfile currentUser={`${homeData.FirstName} ${homeData.LastName}`} username={homeData.UserName} />
          <HomeFriends />
          <HomeAlbums />
        </div>

        <div id="home-content-create-post">
          <HomeCreatePost userId={homeData.User_ID} sessionId={currentSessionId} getHomePosts={getHomePosts} />
        </div>
      </div>

      <div id="home-timeline-posts">
        {
          homePosts
            ?
            homePosts.map((post) => {
              return (
                <PostComponent
                  key={post.Post_ID}
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
      </div>
    </div>
  );
};

export default Home;