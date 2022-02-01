import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import './CommentCard.css';
import GrayStock from '../../images/gray.jpg';

const CommentCard = (props) => {

  const {uname,
         profilePic,
         firstName,
         lastName,
         content} = props;

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
        
          <div className='comment-card-img'>{profilePic ? <img src={profilePic}/> 
            : 
            <Link id="" target="_blank" to={`/profile/${uname}`}><img src={GrayStock}/></Link>}
          </div>
        <div className='comment-card-content'>
              <div className='comment-card-content-author'>
                <Link className="post-component-link" target="_blank" to={`/profile/${uname}`}>
                  <h5>{firstName} {lastName}</h5>
                  </Link>
              </div>   
            <div className='comment-card-content-text' id='contentText'>
              <p>{content}</p>
            </div>
            {/* THIS IS FOR SEE MORE FUNCTIONALITY <div id='seeMoreComment'><p>See more</p></div> */}        
        </div>
    </div>
  );
};

export default CommentCard;
