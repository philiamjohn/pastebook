import React from 'react';
import './Post.css';
import PostComponent from '../../components/post/Post';
import Avatar from '../../images/avatar.png';
import MeowDrama from '../../images/meow-drama.jpg';

const Post = () => {
    return (
        <div className='post-page'>
            <PostComponent  />
        </div>
    );
  };
  
  export default Post;