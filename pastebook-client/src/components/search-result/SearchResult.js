import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';
import { IoPersonAdd } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import './SearchResult.css';

const SearchResult = (props) => {
    const { userData } = props;
    let navigate = useNavigate();

    const navigateToProfile = () => {
        navigate(`/profile/${userData.UserName}`, { replace: true });
        window.location.reload();
    }

    return (
        <div id="search-result">
            {
                userData.ProfilePicture
                    ? <div id="search-result-profile-picture"><img src={userData.ProfilePicture} alt="profile-picture"></img></div>
                    : <div id="search-result-profile-picture"><CgProfile size={40} /></div>
            }
            {
                userData.FirstName
                    ? <a id="search-result-name" onClick={navigateToProfile}>{userData.FirstName} {userData.LastName}</a>
                    : <div id="search-result-name">First Name Last Name</div>
            }
        </div>);
};

export default SearchResult;
