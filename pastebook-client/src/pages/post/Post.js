import React from 'react';
import './Post.css';
import PostComponent from '../../components/post/Post';
import Avatar from '../../images/avatar.png';
import MeowDrama from '../../images/meow-drama.jpg';

const Post = () => {
    return (
        <div className='post-page'>
            <PostComponent postID="6"
                           authorID="10"
                           postTimeStamp="2022-01-26 15:07:59.570" 
                           postContentText="Test again with pic"
                           postContentImg={null}
            />
            <PostComponent postID="7"
                           authorID="10"
                           postTimeStamp="2022-01-26 18:03:34.893" 
                           postContentText={null} 
                           postContentImg={MeowDrama} 
            />              
        </div>
    );
  };
  
  export default Post;