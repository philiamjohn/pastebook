import React from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { IoPersonAdd } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import './SearchResult.css';

const SearchResult = (props) => {
    const { name, friends } = props;
    return (
        <div id="search-result">
            <div id="search-result-profile-picture"><CgProfile size={40} /></div>
            <div id="search-result-name">{name}</div>
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
