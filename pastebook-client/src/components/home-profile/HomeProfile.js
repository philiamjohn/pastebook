import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import './HomeProfile.css';
import GrayStock from '../../images/gray.jpg';


const HomeProfile = ({ userData }) => {
    // const { currentUser, username } = props;
    var currentUser = userData.FirstName + " " + userData.LastName;
    return (
        <div id="home-profile">
            <Link id="home-profile-anchor" to={`/profile/${userData.UserName}`}>
                <div id="current-user-profile-picture">
                    <img src={userData.ProfilePicture ? userData.ProfilePicture : GrayStock} />
                </div>
                <div id="current-user-name">
                    <h3 >{userData.FirstName ? currentUser : ""}</h3>
                </div>
            </Link>
        </div>);
};

export default HomeProfile;
