import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';
import Header from '../../components/header/Header';
import ProfileHeader from '../../components/profile-header/ProfileHeader';
import PostComponent from '../../components/post/Post';
import userphoto from '../../images/default-dp.jpg';
import photo from '../../images/default-image.png';


const Profile = () => {
    const { username } = useParams();
    const baseUrl = `http://localhost:5000`;
    const homeUserId = localStorage.getItem('homeUserId');
    const [profileData, setProfileData] = useState({});
    const [profilePosts, setProfilePosts] = useState([{}, {}, {}, {}, {}]);

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
            setProfileData(profilePageData);
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

    useEffect(async () => {
        //clear all setIntervals
        for (let id = 0; id <= 1000; id++) {
            window.clearInterval(id);
        }

        await getProfile(getProfilePosts);

    }, []);

    return (
        <div className='body'>
            <Header username={username} getSessionIdFromCookie={getSessionIdFromCookie}/>
            <ProfileHeader profileData={profileData} />
            <div className='s2-content'>
                <div className='s2-c1'>
                    <div className='s2-c1-r1-intro block-border-shadow'>
                        <div className='block-title-1'>Intro</div>
                        <div className='s2-c1-r1-intro-content'>
                            <div className='s2-c1-r1-intro-aboutme'><p>{profileData.ProfileDesc}</p></div>
                            <div className='text'>Gender: {profileData.Gender}</div>
                            <div className='text'> Birthday: {profileData.Birthday}</div>
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
                        <div className='block-title-1'>Friends</div>
                        <div className='s2-c1-r3-friends-content'>
                            <div>
                                <img src={userphoto} alt='Recently Added Friends'></img>
                                <p className='text'>FirstName LastName</p>
                            </div>
                            <div>
                                <img src={userphoto} alt='Recently Added Friends'></img>
                                <p className='text'>FirstName LastName</p>
                            </div>
                            <div>
                                <img src={userphoto} alt='Recently Added Friends'></img>
                                <p className='text'>FirstName LastName</p>
                            </div>
                            <div>
                                <img src={userphoto} alt='Recently Added Friends'></img>
                                <p className='text'>FirstName LastName</p>
                            </div>
                            <div>
                                <img src={userphoto} alt='Recently Added Friends'></img>
                                <p className='text'>FirstName LastName</p>
                            </div>
                            <div>
                                <img src={userphoto} alt='Recently Added Friends'></img>
                                <p className='text'>FirstName LastName</p>
                            </div>
                            <div>
                                <img src={userphoto} alt='Recently Added Friends'></img>
                                <p className='text'>FirstName LastName</p>
                            </div>
                            <div>
                                <img src={userphoto} alt='Recently Added Friends'></img>
                                <p className='text'>FirstName LastName</p>
                            </div>
                            <div>
                                <img src={userphoto} alt='Recently Added Friends'></img>
                                <p className='text'>FirstName LastName</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='s2-c2'>
                    <div className='s2-c2-r1-write-post block-border-shadow'>

                    </div>
                    <div className='s2-c2-r2-posts block-border-shadow'>
                        
                    </div>
                </div> */}
            </div>
            {
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
            }
        </div>
    );
};

export default Profile;