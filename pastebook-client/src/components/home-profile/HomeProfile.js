import React from 'react';
import { CgProfile } from 'react-icons/cg';
import './HomeProfile.css';

const HomeProfile = (props) => {
    const { currentUser } = props;
    return (
        <a id="home-profile-anchor" href="#">
            <div id="home-profile">
                <CgProfile id="current-user-profile-picture" size={45} />
                <div id="current-user-name">{currentUser}</div>
            </div>
        </a>);
};

export default HomeProfile;
