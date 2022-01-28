import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import './HomeProfile.css';

const HomeProfile = (props) => {
    const { currentUser, username } = props;
    return (
        <div id="home-profile">
            <Link id="home-profile-anchor" to={`/profile/${username}`}>
                <CgProfile id="current-user-profile-picture" size={45} />
                <h3 id="current-user-name">{currentUser}</h3>
            </Link>
        </div>);
};

export default HomeProfile;
