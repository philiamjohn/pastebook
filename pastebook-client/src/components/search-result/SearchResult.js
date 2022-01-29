import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';
import { IoPersonAdd } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import './SearchResult.css';

const SearchResult = (props) => {
    const { userData } = props;
    const [friends, setFriends] = useState(false);

    useEffect(() => {
        setFriends(userData.Friends);
    }, [props]);

    return (
        <div id="search-result">
            {
                userData.ProfilePicture
                ? <div id="search-result-profile-picture"><img src={userData.ProfilePicture} alt="profile-picture"></img></div>
                : <div id="search-result-profile-picture"><CgProfile size={40} /></div>
            }
            {
                userData.FirstName
                    ? <Link id="search-result-name" to={`/profile/${userData.UserName}`}>{userData.FirstName} {userData.LastName}</Link>
                    : <div id="search-result-name">First Name Last Name</div>
            }
            <div id="search-result-relationship">
                {friends
                    ? <button>
                        <FaUserFriends
                            size={20}
                            onMouseOver={({ target }) => target.style.color = "#3b5998"}
                            onMouseOut={({ target }) => target.style.color = "black"}
                        />
                        <p>Friends</p>
                    </button>
                    : <button>
                        <IoPersonAdd
                            size={20}
                            onMouseOver={({ target }) => target.style.color = "#3b5998"}
                            onMouseOut={({ target }) => target.style.color = "black"}
                        />
                        <p>Add Friend</p>
                    </button>}
            </div>
        </div>);
};

export default SearchResult;
