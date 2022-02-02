import React, { useState, useEffect } from 'react';
import '../friends/Friends.css';
import ListTab from './ListTab';
import RequestsTab from './RequestsTab';

const Friends = ({ getSessionIdFromCookie,userData  }) => {


    const [tab, setTab] = useState("list");

    // On page load
    useEffect(() => {
        var list = document.getElementById('friends-list');
        var listOuter = document.getElementById('friends-list-outer');
        var requests = document.getElementById('friend-requests');
        var requestsOuter = document.getElementById('friend-requests-outer');

        if (tab == "list") {
            list.className = "friends-nav-list-active";
            listOuter.className = "friends-nav-list-outer-active";
            requests.className = "friends-nav-requests";
            requestsOuter.className = "friends-nav-requests-outer";
        }

        if (tab == "requests") {
            requests.className = "friends-nav-requests-active";
            requestsOuter.className = "friends-nav-requests-outer-active";
            list.className = "friends-nav-list";
            listOuter.className = "friends-nav-list-outer";
        }

        return () => {

        };
    }, []);

    const switchToList = () => {
        setTab("list");
        var list = document.getElementById('friends-list');
        var listOuter = document.getElementById('friends-list-outer');
        var requests = document.getElementById('friend-requests');
        var requestsOuter = document.getElementById('friend-requests-outer');
        list.className = "friends-nav-list-active";
        listOuter.className = "friends-nav-list-outer-active";
        requests.className = "friends-nav-requests";
        requestsOuter.className = "friends-nav-requests-outer";
    }

    const switchToRequests = () => {
        setTab("requests");
        var list = document.getElementById('friends-list');
        var listOuter = document.getElementById('friends-list-outer');
        var requests = document.getElementById('friend-requests');
        var requestsOuter = document.getElementById('friend-requests-outer');
        requests.className = "friends-nav-requests-active";
        requestsOuter.className = "friends-nav-requests-outer-active";
        list.className = "friends-nav-list";
        listOuter.className = "friends-nav-list-outer";
    }

    return (
        <div className='friends'>
            <div className='friends-title'>
                <h3>Friends</h3>
            </div>
            <div className='friends-nav'>
                <div className='friends-nav-list-outer' id='friends-list-outer'>
                    <div className='friends-nav-list' id='friends-list' onClick={switchToList}>
                        <p>All Friends</p>
                    </div>
                </div>
                <div className='friends-nav-requests-outer' id='friend-requests-outer'>
                    <div className='friends-nav-requests' id='friend-requests' onClick={switchToRequests}>
                        <p>Friend Requests</p>
                    </div>
                </div>
            </div>
            <div className='friends-content'>
                {tab === "list" ? <ListTab getSessionIdFromCookie={getSessionIdFromCookie} userData={userData}  />
                    : <RequestsTab getSessionIdFromCookie={getSessionIdFromCookie} />
                }
            </div>
        </div>
    );
};

export default Friends;