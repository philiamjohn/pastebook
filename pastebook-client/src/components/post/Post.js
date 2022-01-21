import React from 'react';
import './Post.css';

const Post = (props) => {
    
    const {authorImg,authorName,postTimeStamp,postContentP,postContentImg,likeCount,commentCount} = props

    return (
        <div className='post'>
            <div className='post-author'>
                <div className='post-author-img'>
                    <a href="#"><img src={authorImg} alt="author-img"/></a>
                </div>
                <div className='post-author-details'>
                    <div className='post-author-details-name'><a href="#"><h4>{authorName}</h4></a></div>
                    <div className='post-timestamp'>{postTimeStamp}</div>
                </div>
            </div>
            <div className='post-content'>
                <div className='post-content-p'>{postContentP}</div>
                <div className='post-content-img'><img src={postContentImg} alt="content-img"/></div>         
            </div>
            <div className='post-interactions'>
                <div className='post-interactions-counts'>
                    <div className='post-interactions-counts-like'><a href='#'>{likeCount} Likes</a></div>
                    <div className='post-interactions-counts-like'></div><a href='#'>{commentCount} Comments</a>
                </div>
                <div className='post-interactions-btns'>
                    <button>Like</button>
                    <button>Comment</button>
                </div>
                <div className='post-interactions-comment'></div>
            </div>
        </div>
    );
  };
  
  export default Post;