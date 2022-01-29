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
  // set empty array of empty objects to achieve loading animation effect
  const [searchResults, setSearchResults] = useState([{}, {}, {}, {}, {}, {}]);
  const baseUrl = `http://localhost:5000`;


  const searchUser = async () => {
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

  useEffect(() => {
    const searchResultsContent = document.getElementById("search-results");
    if (searchResultsContent) {
      if (searchResults === [{}, {}, {}, {}, {}, {}]) {
        searchResultsContent.className = "results-loading";
      }
      else {
        searchResultsContent.className = "";
      }
    }
  }, [searchResults]);
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
          <IoMdNotifications
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
      <NotificationsModal />
      <MenuModal username={username} />
    </div>);
};

export default Header;