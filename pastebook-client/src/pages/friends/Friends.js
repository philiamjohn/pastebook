import '../friends/Friends.css';
import FriendsComponent from '../../components/friends/Friends';
import Header from '../../components/header/Header';
import { useEffect } from 'react';

const Friends = ({ getSessionIdFromCookie, getUserData, userData }) => {

    // addesd the params the useEffect added the header ---arhon
    //added new div for header and FriendsComponent
    // 
    useEffect(() => {
        getSessionIdFromCookie();
        getUserData();
    }, []);

    return (
        <div className='friends-page'>
            <div className='header'>
                <Header username={userData.UserName} getSessionIdFromCookie={getSessionIdFromCookie} />
            </div>
            <div className='friends-page-component'>
                <FriendsComponent />
            </div>
        </div>

    );

}

export default Friends;
