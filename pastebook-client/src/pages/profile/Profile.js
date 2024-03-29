import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Profile.css';
import Header from '../../components/header/Header';
import ProfileHeader from '../../components/profile-header/ProfileHeader';
import PostComponent from '../../components/post/Post';
import userphoto from '../../images/default-dp.jpg';
import photo from '../../images/default-image.png';
import CreatePost from '../../components/home-create-post/CreatePost';


const Profile = () => {
    const { username } = useParams();
    const baseUrl = `http://localhost:5000`;
    const homeUserId = localStorage.getItem('homeUserId');
    const [profileData, setProfileData] = useState({});
    const [profilePosts, setProfilePosts] = useState([]);
    const [friendsList, setFriendsList] = useState(null);
    const [allPostsLoaded, setAllPostsLoaded] = useState(false);
    const [fetchCountState, setFetchCountState] = useState(2);

    const getSessionIdFromCookie = () => {
        const searchCookie = "pastebookSessionId=";
        if (document.cookie.length > 0) {
            // Search for pastebookSessionId cookie.
            let offset = document.cookie.indexOf(searchCookie)

            if (offset != -1) {
                offset += searchCookie.length
                // Set index of beginning of value 
                let end = document.cookie.indexOf(";", offset)

                if (end == -1) {
                    end = document.cookie.length
                }

                const pastebookSessionId = document.cookie.substring(offset, end);
                return pastebookSessionId;
            }
        }
        return null;
    }

    const getProfilePageData = async () => {
        const response = await fetch(`${baseUrl}/profile/${username}`, {
            method: 'GET',
            headers: {
                'X-UserId': homeUserId
            },
        });

        if (response.status === 200) {
            const profilePageData = await response.json();
            setProfileData(profilePageData);
            getFriendsListProfPage(profilePageData.User_ID);

        }
    }

    const getProfilePosts = async (fetchCount) => {
        const response = await fetch(`${baseUrl}/profileposts/${username}`, {
            method: 'GET',
            headers: {
                'X-FetchCount': fetchCount
            },
        });

        if (response.status === 200) {
            const profilePagePosts = await response.json();
            setProfilePosts([...profilePosts, ...profilePagePosts]);
            if (profilePagePosts.length < 10) {
                setAllPostsLoaded(true);
            }
            else {
                setAllPostsLoaded(false);
            }
        }
    }

    const getProfile = async (getProfilePostsCallback) => {
        await getProfilePageData();
        await getProfilePostsCallback(1);
    }

    const loadMorePosts = () => {
        getProfilePosts(fetchCountState);
        setFetchCountState(fetchCountState + 1);
    }

    const getFriendsListProfPage = async (id) => {
        const sessionId = getSessionIdFromCookie();
        // const homeUserId = localStorage.getItem('homeUserId');

        const response = await fetch(`${baseUrl}/friendslistprofpage/${id}`, {
            method: 'GET',
            headers: {
                "X-SessionID": sessionId,
            },
        });

        if (response.status === 200) {
            const friendRequestList = await response.json();
            setFriendsList(friendRequestList);
        }
    }

    useEffect(async () => {
        //clear all setIntervals
        for (let id = 0; id <= 1000; id++) {
            window.clearInterval(id);
        }
        await getProfile(getProfilePosts);
    }, []);

    return (
        <div className='body'>
            <Header username={localStorage.getItem("profileUsername")} getSessionIdFromCookie={getSessionIdFromCookie} />
            <ProfileHeader profileData={profileData} username={username} />
            <div className='s2-content'>
                <div className='s2-c1'>
                    <div className='s2-c1-r1-intro block-border-shadow'>
                        <div className='block-title-1'>Intro</div>
                        <div className='s2-c1-r1-intro-content'>
                            <div className='s2-c1-r1-intro-aboutme'><p>{profileData.ProfileDesc}</p></div>
                            <div className='text'>Gender: {profileData.Gender}</div>
                            <div className='text'> Birthday: {profileData.Birthday}</div>
                            <div className='text'> Email: {profileData.Email}</div>
                            {profileData.Phone ? <div className='text'> Phone: {profileData.Phone}</div> : <div />}
                        </div>
                    </div>
                    <div className='s2-c1-r2-photos block-border-shadow'>
                        <div className='block-title-1'>Photos</div>
                        <div className='s2-c1-r2-photos-content'>
                            <img src={photo} alt='Latest Photos'></img>
                            <img src={photo} alt='Latest Photos'></img>
                            <img src={photo} alt='Latest Photos'></img>
                            <img src={photo} alt='Latest Photos'></img>
                            <img src={photo} alt='Latest Photos'></img>
                            <img src={photo} alt='Latest Photos'></img>
                            <img src={photo} alt='Latest Photos'></img>
                            <img src={photo} alt='Latest Photos'></img>
                            <img src={photo} alt='Latest Photos'></img>
                        </div>
                    </div>
                    <div className='s2-c1-r3-friends block-border-shadow'>
                        {profileData.OwnProfile
                            ?
                            <a href="/friends">
                                <div className='block-title-1'>Friends</div>
                            </a>
                            : <div className='block-title-1'>Friends</div>
                        }

                        <div className='s2-c1-r3-friends-content'>
                            {friendsList ? friendsList.map((e) => {
                                return (<div key={e.User_ID}>
                                    <a href={`/profile/${e.UserName}`} >
                                        <img src={e.ProfilePicture ? e.ProfilePicture : userphoto} alt='Recently Added Friends'></img>
                                        <p className='text'>{`${e.FirstName}  ${e.LastName}`}</p>
                                    </a>

                                </div>)
                            }) : <div>Getting your Friends</div >
                            }
                        </div>
                    </div>
                </div>
                <div className='s2-c2'>
                    {
                        profileData.OwnProfile
                            ?
                            <div className='s2-c2-r1-write-post block-border-shadow'>
                                <CreatePost fromOwnProfile userId={homeUserId} sessionId={getSessionIdFromCookie()} />
                            </div>
                            : profileData.Friends
                                ?
                                <div className='s2-c2-r1-write-post block-border-shadow'>
                                    Post to {profileData.FirstName}'s Profile.
                                    <CreatePost fromFriendsProfile friendUserId={profileData.User_ID} userId={homeUserId} sessionId={getSessionIdFromCookie()} />
                                </div>
                                : null
                    }
                    {
                        profileData.OwnProfile || profileData.Friends
                            ?
                            profilePosts.map((post) => {
                                return (
                                    <div className='s2-c2-r2-posts '>
                                        <PostComponent
                                            key={post.Post_ID}
                                            sessionIdFromCookie={getSessionIdFromCookie()}
                                            postID={post.Post_ID}
                                            authorID={post.User_ID}
                                            postTimeStamp={post.DatePosted}
                                            postContentText={post.Content}
                                            postContentImg={post.Image}
                                            targetID={post.Target_ID}
                                            userID={localStorage.getItem('homeUserId')}
                                        />
                                    </div>
                                )
                            })
                            : null
                    }
                    {
                        profilePosts && (profileData.OwnProfile || profileData.Friends)
                            ?
                            profilePosts.length >= 1 && !allPostsLoaded
                                ? <button className="load-more-posts" onClick={loadMorePosts}>Load more posts</button>
                                : <div>All posts have been loaded.</div>
                            : null
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;