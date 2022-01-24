import React from 'react';
import './CommentCard.css';
import GrayStock from '../../images/gray.jpg';

const CommentCard = (props) => {

  const {commentAuthorImg,
         commentAuthor,
         commentText} = props;

  return (
    <div className='comment-card'>
        <div className='comment-card-img'><img src={commentAuthorImg}/></div>
        <div className='comment-card-content'>
            <div className='comment-card-content-author'><h5>{commentAuthor}</h5></div>
            <div className='comment-card-content-text'><p>{commentText}</p></div>
        </div>
    </div>
  );
};

export default CommentCard;
