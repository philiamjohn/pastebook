import React from 'react';
import { CgProfile } from 'react-icons/cg';
import './HomeProfile.css';

const HomeProfile = (props) => {
    const { currentUser } = props;
    return (
        <div id="home-profile">
            <a id="home-profile-anchor" href="#">
                <CgProfile id="current-user-profile-picture" size={45} />
                <h3 id="current-user-name">{currentUser}</h3>
            </a>
        </div>);
};

export default HomeProfile;
