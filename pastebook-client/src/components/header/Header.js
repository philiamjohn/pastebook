import React, { useEffect } from 'react'
import pastebookLogo from '../../images/pastebook-logo.png';
import { AiFillHome } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdNotifications } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';
import MenuModal from '../menu-modal/MenuModal';
import './Header.css';
import NotificationsModal from '../notifications/notifications-modal/NotificationsModal';
import SearchResultsModal from '../search-results-modal/SearchResultsModal';

const Header = () => {
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
  return (
    <div id='header'>
      <div><a href="/"><img id="pastebook-logo" src={pastebookLogo} alt="pastebook-logo"></img></a></div>

      <div>
        <input type="text" id="search-bar" placeholder="Search People" />
      </div>

      <button id="search-button" href="#">
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

      <SearchResultsModal />
      <NotificationsModal />
      <MenuModal />
    </div>);
};

export default Header;