import React, { useState } from 'react';
import FriendsListTab from '../../components/friends-tab/friends-list-tab/FriendsListTab';
import FriendsReqTab from '../../components/friends-tab/friends-req-tab/FriendsReqTab';

const Friends = () => {
    const [friendsTab, setFriendsTab] = useState("friends");
    const handleFriendsListTab = () => {
        setFriendsTab("friends");
    }
    const handleFriendsReqTab = () => {
        setFriendsTab("request");
    }

    return <div>
        <div className='header'>

        </div>
        <div className='friends-comp-container'>
            <div className='friends'>
                <div className='nav-friends'>
                    <ul className='nav-friends-list'>
                        <li className={friendsTab === "friends" ? "active" : ""} onClick={handleFriendsListTab}>Friends List</li>
                        <li className={friendsTab === "request" ? "active" : ""} onClick={handleFriendsReqTab}>Friends Request</li>
                    </ul>
                </div>
                <div className='friends-showtab'>
                    {friendsTab === "friends" ? <FriendsListTab /> : <FriendsReqTab />}
                </div>
            </div>
        </div>
    </div>;
};

export default Friends;
