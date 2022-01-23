import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import ProfileHeader from '../../components/profile-header/ProfileHeader';
import userphoto from '../../images/default-dp.jpg';
import photo from '../../images/default-image.png';


const Profile = () => {
  return (
    <div className='body'>
        <ProfileHeader/>
        <div className='s2-content'>
            <div className='s2-c1'>
                <div className='s2-c1-r1-intro block-border-shadow'>
                    <div className='block-title-1'>Intro</div>
                    <div className='s2-c1-r1-intro-content'>
                        <div className='s2-c1-r1-intro-aboutme'><p></p></div>
                        <div className='text'>Gender:</div>
                        <div className='text'> Birthday:</div>
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
            <div className='s2-c2'>
                <div className='s2-c2-r1-write-post block-border-shadow'>
            
                </div>
                <div className='s2-c2-r2-posts block-border-shadow'>

                </div>
            </div>
        </div>
        
    </div>
  );
};

export default Profile;