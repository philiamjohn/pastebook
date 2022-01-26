import React from 'react';
import './Post.css';
import PostComponent from '../../components/post/Post';
import Avatar from '../../images/avatar.png';
import MeowDrama from '../../images/meow-drama.jpg';

const Post = () => {
    return (
        <div className='post-page'>
            <PostComponent authorImg={Avatar} 
                           authorName="Juan dela Cruz XI" 
                           postTimeStamp="10 hours ago" 
                           postContentP="SABIHAN MO YUNG KABET MO WAG NIYA KAMING IDAMAY-DAMAY KUNG ANU-ANONG GINAGAWA NIYANG MGA ISTORYA PARA SA AMING PAMILYA DAHIL HINDI KAMI NAKIKIALAM SA BUHAY NIYONG MAG ASAWA KAHIT KAPATID MO KAHIT KAPATID KO YUNG ASAWA MO HINDI AKO KAMI NAKIKIALAM!" 
                           postContentImg={null} 
                           likeCount="123" 
                           commentCount="321"
                           likeStatus={false} />
            <PostComponent authorImg={Avatar} 
                           authorName="Juan dela Cruz XI" 
                           postTimeStamp="10 hours ago" 
                           postContentP="meowdrama" 
                           postContentImg={MeowDrama} 
                           likeCount="123" 
                           commentCount="321"
                           likeStatus={true} />              
        </div>
    );
  };
  
  export default Post;