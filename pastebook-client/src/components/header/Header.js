import React, { useEffect, useState } from 'react'
import pastebookLogo from '../../images/pastebook-logo.png';
import { AiFillHome } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdNotifications } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';
import MenuModal from '../menu-modal/MenuModal';
import './Header.css';
import NotificationsModal from '../notifications/notifications-modal/NotificationsModal';
import SearchResultsModal from '../search-results-modal/SearchResultsModal';

const Header = (props) => {
  const { username, getSessionIdFromCookie } = props;
  const [userId, setUserId] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const baseUrl = `http://localhost:5000`;

  const searchUser = async () => {
    setSearchResults(null);
    const searchKeyword = document.getElementById("search-bar").value;
    const sessionId = getSessionIdFromCookie();
    const response = await fetch(`${baseUrl}/searchusers`, {
      method: 'GET',
      headers: {
        "X-SessionID": sessionId,
        "X-SearchKeyword": searchKeyword
      },
    });

    if (response.status === 200) {
      const profileSearchResults = await response.json();
      console.table(await profileSearchResults);
      setSearchResults(profileSearchResults);
    }
    else {
      console.log(response.status);
    }
  }

  const getNotifications = async () => {
    const sessionId = getSessionIdFromCookie();
    const response = await fetch(`${baseUrl}/notifications/${userId}`, {
      method: 'GET',
      headers: {
        "X-SessionID": sessionId,
      },
    });

    if (response.status === 200) {
      const notificationList = await response.json();
      console.table(await notificationList);
      setNotifications(notificationList);
    }
    else {
      console.log(response.status);
    }
  }

  //Triggers after first render
  useEffect(() => {
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
  }, []);

  //make sure to get the stored value after fetching the userId from home
  useEffect(() => {
    setUserId(localStorage.getItem('homeUserId'));
  }, [props]);

  useEffect(async () => {
    if (userId) {
      await getNotifications();
      setInterval(async () => {
        await getNotifications();
      }, 20000);
    }
  }, [userId])


  useEffect(() => {
    document.getElementById("notifications-circle").style.display = "none";
    if (notifications.length) {
      let unreadNotificationsCount = 0;
      notifications.forEach((notification) => {
        if (notification.ReadStatus === "unread") {
          document.getElementById("notifications-circle").style.display = "block";
          unreadNotificationsCount++;
        }
      });
      setNewNotificationsCount(unreadNotificationsCount);
    }
  }, [notifications]);

  return (
    <div id='header'>
      <div><a href="/"><img id="pastebook-logo" src={pastebookLogo} alt="pastebook-logo"></img></a></div>

      <div>
        <input type="text" id="search-bar" placeholder="Search People" />
      </div>

      <button id="search-button" /*onClick={searchUser}*/>
        <ImSearch
          size={20} color='gray'
          onMouseOver={({ target }) => target.style.color = "black"}
          onMouseOut={({ target }) => target.style.color = "gray"}
        />
      </button>

      <div id="header-right">
        <a id="home-anchor" href="/">
          <AiFillHome
            size={25}
            color='black'
            onMouseOver={({ target }) => target.style.color = "white"}
            onMouseOut={({ target }) => target.style.color = "black"} />
        </a>
        <button id="notifications-button" href="#">
          <div id="notifications-circle">{newNotificationsCount}</div>
          <IoMdNotifications
            id="notifications-icon"
            size={25}
            color='black'
            onMouseOver={({ target }) => target.style.color = "white"}
            onMouseOut={({ target }) => target.style.color = "black"} />
        </button>
        <button id="menu-button" href="#">
          <GiHamburgerMenu
            size={25}
            color='black'
            onMouseOver={({ target }) => target.style.color = "white"}
            onMouseOut={({ target }) => target.style.color = "black"} />
        </button>
      </div>

      <SearchResultsModal searchUser={searchUser} searchResults={searchResults} />
      <NotificationsModal notifications={notifications} getNotifications={getNotifications} baseUrl={baseUrl} userId={userId} />
      <MenuModal username={username} />
    </div>);
};

export default Header;