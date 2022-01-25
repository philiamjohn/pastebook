import React, {useEffect} from 'react';
import './CommentCard.css';
import GrayStock from '../../images/gray.jpg';

const CommentCard = (props) => {

  const {commentAuthorImg,
         commentAuthor,
         commentText} = props;

  /*
  THIS IS FOR SEE MORE FUNCTIONALITY DI KO MAGAWA T_T
  useEffect(() => {
    var contentText = document.getElementById('contentText');
    alert(isOverflown(contentText));
    contentText.style.height = (isOverflown(contentText) ? '65px' : '100%');
    contentText.style.overflow = (isOverflown(contentText) ? 'hidden' : 'unset');
    return () => {
    };
  }, []);
         

  const isOverflown = (element) => {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }
  */
  

  return (
    <div className='comment-card'>
        <div className='comment-card-img'><img src={commentAuthorImg}/></div>
        <div className='comment-card-content'>
            <div className='comment-card-content-author'><h5>{commentAuthor}</h5></div>
            <div className='comment-card-content-text' id='contentText'>
              <p>{commentText}</p>
            </div>
            {/* THIS IS FOR SEE MORE FUNCTIONALITY <div id='seeMoreComment'><p>See more</p></div> */}        
        </div>
    </div>
  );
};

export default CommentCard;
