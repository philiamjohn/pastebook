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
                           postContentP="meowdrama" 
                           postContentImg={MeowDrama} 
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