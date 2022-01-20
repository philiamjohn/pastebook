import React from 'react'
import pastebookLogo from '../../images/pastebook-logo.png';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { IoMdNotifications } from 'react-icons/io';
import { ImSearch } from 'react-icons/im';
import MenuModal from '../menu-modal/MenuModal';
import './Header.css';
import NotificationsModal from '../notifications/notifications-modal/NotificationsModal';

const Header = () => {

  return (
    <div id='header'>
      <div><a href="/"><img id="pastebook-logo" src={pastebookLogo} alt="pastebook-logo"></img></a></div>

      <div>
        <input type="text" id="search-bar" placeholder="Search People" />
      </div>

      <a id="search-anchor" href="#">
        <ImSearch
          size={20} color='gray'
          onMouseOver={({ target }) => target.style.color = "black"}
          onMouseOut={({ target }) => target.style.color = "gray"}
        />
      </a>

      <div id="header-right">
        <a id="home-anchor" href="/">
          <AiFillHome
            size={25}
            color='black'
            onMouseOver={({ target }) => target.style.color = "white"}
            onMouseOut={({ target }) => target.style.color = "black"} />
        </a>
        <a id="notifications-anchor" href="#">
          <IoMdNotifications
            size={25}
            color='black'
            onMouseOver={({ target }) => target.style.color = "white"}
            onMouseOut={({ target }) => target.style.color = "black"} />
        </a>
        <a id="menu-anchor" href="#">
          <AiOutlineMenu
            size={25}
            color='black'
            onMouseOver={({ target }) => target.style.color = "white"}
            onMouseOut={({ target }) => target.style.color = "black"} />
        </a>
      </div>

      <NotificationsModal/>
      <MenuModal />
    </div>);
};

export default Header;