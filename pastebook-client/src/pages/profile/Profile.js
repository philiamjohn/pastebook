import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Profile.css';
import Header from '../../components/header/Header';
import ProfileHeader from '../../components/profile-header/ProfileHeader';
import PostComponent from '../../components/post/Post';
import userphoto from '../../images/default-dp.jpg';
import photo from '../../images/default-image.png';
import HomeCreatePost from '../../components/home-create-post/HomeCreatePost';


const Profile = () => {
    const { username } = useParams();
    const baseUrl = `http://localhost:5000`;
    const homeUserId = localStorage.getItem('homeUserId');
    const [profileData, setProfileData] = useState({});
    const [profilePosts, setProfilePosts] = useState([{}, {}, {}, {}, {}]);
    const [friendsList, setFriendsList] = useState(null);

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
                console.log(`pastebookSessionId: ${pastebookSessionId}`);
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
            console.table(await profilePageData);
            console.log(profilePageData.User_ID);
            setProfileData(profilePageData);
            getFriendsListProfPage(profilePageData.User_ID);

        }
        else {
            console.log(response.status);
        }
    }

    const getProfilePosts = async () => {
        const response = await fetch(`${baseUrl}/profileposts/${username}`, {
            method: 'GET'
        });

        if (response.status === 200) {
            const profilePagePosts = await response.json();
            console.table(await profilePagePosts);
            setProfilePosts(profilePagePosts);
        }
        else {
            console.log(response.status);
        }
    }

    const getProfile = async (getProfilePostsCallback) => {
        await getProfilePageData();
        await getProfilePostsCallback();
    }
    const getFriendsListProfPage = async (id) => {
        console.log(profileData);

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
            console.table(friendRequestList);
            setFriendsList(friendRequestList);
        }
        else {
            console.log(response.status);
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
                                    <Link to={`/profile/${e.UserName}`} target="_blank">
                                        <img src={e.ProfilePicture ? e.ProfilePicture : userphoto} alt='Recently Added Friends'></img>
                                        <p className='text'>{`${e.FirstName}  ${e.LastName}`}</p>
                                    </Link>

                                </div>)
                            }) : <div>Getting your Friends</div >
                            }
                        </div>
                    </div>
                </div>
                {/* <div className='s2-c2'>

                    {
                        profileData.OwnProfile || profileData.Friends
                            ?
                            <div className='s2-c2-r1-write-post block-border-shadow'>
                                <HomeCreatePost />
                            </div>
                            : <div />
                    }
                    {
                        profileData.OwnProfile || profileData.Friends
                            ?
                            profilePosts.map((post) => {
                                return (
                                    <div className='s2-c2-r2-posts block-border-shadow'>

                                        <PostComponent
                                            key={post.Post_ID}
                                            postID={post.Post_ID}
                                            authorID={post.User_ID}
                                            postTimeStamp={post.DatePosted}
                                            postContentText={post.Content}
                                            postContentImg={post.Image}
                                            userID={localStorage.getItem('homeUserId')}
                                        />
                                    </div>

                                )
                            })
                            : <div />
                    }
                </div> */}
            </div>
            {
                profileData.OwnProfile || profileData.Friends
                    ?
                    profilePosts.map((post) => {
                        return (
                            <PostComponent
                                key={post.Post_ID}
                                postID={post.Post_ID}
                                authorID={post.User_ID}
                                postTimeStamp={post.DatePosted}
                                postContentText={post.Content}
                                postContentImg={post.Image}
                                userID={localStorage.getItem('homeUserId')}
                            />
                        )
                    })
                    : <div />
            }
        </div>
    );
};

export default Profile;