import React from 'react';
import './Post.css';
import PostComponent from '../../components/post/Post';
import Avatar from '../../images/avatar.png';
import MeowDrama from '../../images/meow-drama.jpg';

const Post = () => {
    return (
        <div className='post-page'>
            <PostComponent postID="12"
                           authorID="5"
                           postTimeStamp="10 hours ago" 
                           postContentText="SABIHAN MO YUNG KABET MO WAG NIYA KAMING IDAMAY-DAMAY KUNG ANU-ANONG GINAGAWA NIYANG MGA ISTORYA PARA SA AMING PAMILYA DAHIL HINDI KAMI NAKIKIALAM SA BUHAY NIYONG MAG ASAWA KAHIT KAPATID MO KAHIT KAPATID KO YUNG ASAWA MO HINDI AKO KAMI NAKIKIALAM!" 
                           postContentImg={null} 
            />
            <PostComponent postID="13"
                           authorID="2"
                           postTimeStamp="10 hours ago" 
                           postContentP="meowdrama" 
                           postContentImg={MeowDrama} 
            />              
        </div>
    );
  };
  
  export default Post;