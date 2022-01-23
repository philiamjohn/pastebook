import React from 'react';
import './Profile.css';
import { ImCamera } from 'react-icons/im';
import { GoGlobe } from 'react-icons/go';
import { BsImageFill } from 'react-icons/bs';
import { IoPeopleSharp } from 'react-icons/io5';
import { MdModeEditOutline } from 'react-icons/md';

import userphoto from '../../images/default-dp.jpg';


const Profile = () => {
  return (
    <div className='body'>
        <div className='s1-profile-head'>
            <div className='s1-r1-cover-photo'>
                
            </div>
            <div className='s1-r2-banner'>
                <div className='s1-r2-user-photo'>
                    <img src={userphoto} alt='Default User'></img>
                    <div className='s1-r2-edit-photo-btn'>
                        <button>< ImCamera size={20} /></button>
                    </div>
                    
                </div>
                <div className='s1-r2-name'>
                    <p className='s1-r2-user-full-name'>FirstName LastName</p>
                </div>
                <div className='s1-r2-buttons'>
                    <button className='text block-border-shadow'>< MdModeEditOutline /> Edit profile</button>
                </div>
            </div>
            <div className='s1-r3-tabs'>

            </div>
        </div>
        <div className='s2-content'>
            <div className='s2-c1'>
                <div className='s2-c1-r1-intro block-border-shadow'>
                    <div className='s2-c1-title'>
                        <div className='block-icon-1'>< GoGlobe size={20} color='#3b5998'/></div>
                        <span className='block-title-1'>Intro</span>
                    </div>

                </div>
                <div className='s2-c1-r2-photos block-border-shadow'>
                    <div className='s2-c1-title'>
                        <span className='block-icon-1'>< BsImageFill /></span>
                        <span className='block-title-1'>Photos</span>
                    </div>
                </div>
                <div className='s2-c1-r3-friends block-border-shadow'>
                    <div className='s2-c1-title'>
                    <span className='block-icon-1'>< IoPeopleSharp /></span>
                        <span className='block-title-1'>Friends</span>
                    </div>
                </div>
            </div>
            <div className='s2-c2'>
                <div className='s2-c2-write-post block-border-shadow'>
            
                </div>
                <div className='s3-c1-posts block-border-shadow'>
            
                </div>
            </div>
        </div>
        
    </div>
  );
};

export default Profile;