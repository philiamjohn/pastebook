import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Photos.css';
import { BsPlusLg } from 'react-icons/bs';
import { MdModeEditOutline, MdDeleteForever } from 'react-icons/md';

import photo from '../../images/default-image.png';
import ProfileHeader from '../../components/profile-header/ProfileHeader';


const Photos = () => {

    return (
        <div className='body'>
            <ProfileHeader />
            <div className='s2-photos .block-border-shadow'>
                <div className='s2-photos-title block-title-1'>Album Title</div>
                <div className='s2-photos-content'>
                    <div className='s2-photos-create'>
                        <button className='s2-photos-create-btn'><BsPlusLg size={30}/></button>
                        <p className='text'>Add Photos</p>
                    </div>
                    <div>
                        <img src={photo} alt='Default'></img>
                        <button className='s2-photos-btn' title='Edit Photo Caption'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-photos-btn' title='Delete Photo'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={photo} alt='Default'></img>
                        <button className='s2-photos-btn'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-photos-btn'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={photo} alt='Default'></img>
                        <button className='s2-photos-btn'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-photos-btn'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={photo} alt='Default'></img>
                        <button className='s2-photos-btn'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-photos-btn'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={photo} alt='Default'></img>
                        <button className='s2-photos-btn'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-photos-btn'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={photo} alt='Default'></img>
                        <button className='s2-photos-btn'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-photos-btn'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={photo} alt='Default'></img>
                        <button className='s2-photos-btn'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-photos-btn'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={photo} alt='Default'></img>
                        <button className='s2-photos-btn'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-photos-btn'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={photo} alt='Default'></img>
                        <button className='s2-photos-btn'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-photos-btn'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={photo} alt='Default'></img>
                        <button className='s2-photos-btn'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-photos-btn'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={photo} alt='Default'></img>
                        <button className='s2-photos-btn'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-photos-btn'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    <div>
                        <img src={photo} alt='Default'></img>
                        <button className='s2-photos-btn'>< MdModeEditOutline size={15} /></button>
                        <button className='s2-photos-btn'>< MdDeleteForever size={15} /></button>                      
                    </div>
                    
                </div>            
            </div>
        </div>
    );
};

export default Photos;