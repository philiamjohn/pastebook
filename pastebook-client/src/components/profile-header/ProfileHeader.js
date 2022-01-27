import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileHeader.css';
import { ImCamera } from 'react-icons/im';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import { BsPlusCircle } from 'react-icons/bs';

import userphoto from '../../images/default-dp.jpg';


const ProfileHeader = (props) => {
    const { firstName, lastName } = props;
    return (
        <div className='body'>
            <div className='s1-profile-head'>
                <div className='s1-r1-cover-photo'></div>
                <div className='s1-r2-banner'>
                    <div className='s1-r2-user-photo'>
                        <img src={userphoto} alt='Default User'></img>
                        <div className='s1-r2-edit-photo-btn'>
                            <button>< ImCamera size={20} /></button>
                        </div>

                    </div>
                    <div className='s1-r2-name'>
                        <p className='s1-r2-user-full-name'>{firstName} {lastName}</p>
                    </div>
                    <div className='s1-r2-buttons'>
                        <button className='text block-border-shadow' id='edit-profile-btn'>< MdModeEditOutline size={15} />  Edit profile</button>
                        <button className='text block-border-shadow' id='add-friend-btn'>< BsPlusCircle size={15} />  Add friend</button>
                        <button className='text block-border-shadow' id='yes-friend-btn'>< BsFillPersonCheckFill size={15} />  Friends</button>
                    </div>
                    <div className='s1-r3-tabs'>
                        <button className='text'><Link to='/username' style={{ textDecoration: 'none', color: 'inherit' }}>Posts</Link></button>
                        <button className='text'><Link to='/about' style={{ textDecoration: 'none', color: 'inherit' }}>About</Link></button>
                        <button className='text'><Link to='/friends' style={{ textDecoration: 'none', color: 'inherit' }}>Friends</Link></button>
                        <button className='text'><Link to='/photos' style={{ textDecoration: 'none', color: 'inherit' }}>Photos</Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;