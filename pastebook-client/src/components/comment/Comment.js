import React from 'react';
import './Comment.css';
import GrayStock from '../../images/gray.jpg';

const Comment = (props) => {

  const {postAuthorImg} = props;
  
  const addComment = () => {
    document.getElementById('comment-box').focus();
  }

  return (
    <div className='post-interactions-comments' id='comments'>
    <div className='post-interactions-comments-expand'><a href='#'>View comments</a></div>
    <div className='post-interactions-comments-list'>
         <div className='post-interactions-comments-list-item'>

         </div>
    </div>
    <div className='post-interactions-comments-create'>
        <img src={postAuthorImg ? postAuthorImg  : GrayStock } alt="author-img" onClick={addComment}/>
        <input type='text' placeholder="Write a comment" id='comment-box'/>
    </div>
</div>
  );
};

export default Comment;
