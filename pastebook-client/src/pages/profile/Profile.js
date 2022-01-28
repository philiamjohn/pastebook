import React, { useEffect, useState } from 'react';
import './Profile.css';
import Header from '../../components/header/Header';
import ProfileHeader from '../../components/profile-header/ProfileHeader';
import userphoto from '../../images/default-dp.jpg';
import photo from '../../images/default-image.png';


const Profile = () => {
    const baseUrl = `http://localhost:5000`;
    const username = localStorage.getItem('profileUsername');
    const [profileData, setProfileData] = useState({});

    const getProfilePageData = async () => {
        const homeUserId = localStorage.getItem('homeUserId');
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

    useEffect(async () => {
        //clear all setIntervals
        for (let id = 0; id <= 1000; id++) {
            window.clearInterval(id);
        }

        await getProfilePageData();

    }, []);

    return (
        <div className='body'>
            <Header username={username} />
            <ProfileHeader firstName={profileData.FirstName} lastName={profileData.LastName} />
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

        </div>
    );
};

export default Profile;