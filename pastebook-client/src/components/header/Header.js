import React from 'react'
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