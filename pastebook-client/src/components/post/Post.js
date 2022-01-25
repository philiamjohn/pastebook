import React, {useState} from 'react';
import './Post.css';
import Comment from '../comment/Comment';
import LikeIcon from '../../images/like.png';
import LikedIcon from '../../images/liked.png';
import CommentIcon from '../../images/comment.png';
import GrayStock from '../../images/gray.jpg';

const Post = (props) => {
    
    const {authorImg,
           authorName,
           postTimeStamp,
           postContentP,
           postContentImg,
           likeCount,
           commentCount,
           likeStatus} = props
    
    const [like, setLike] = useState(likeStatus);
    const [comment, setComment] = useState(true); 

    // like/unlike  toggle
    const toggleLike = () => {
        if(like){
            window.alert("Like has been undone!");
        }
        else{
            window.alert("Liked!");
        }
        setLike(v => !v);
    };

    // show/hide comment toggle
    const toggleComment = () => {
        setComment(v => !v);
    }

    const addComment = () => {
        setComment(v => !v);
        setTimeout(function(){
            document.getElementById('comment-box').focus();
        });  
    }
    
    return (
        <div className='post'>
            <div className='post-author'>
                <div className='post-author-img'>
                    <img src={authorImg ? authorImg  : GrayStock } alt="author-img"/>
                </div>
                <div className='post-author-details'>
                    <div className='post-author-details-name'><h4>{authorName}</h4></div>
                    <div className='post-timestamp'>{postTimeStamp}</div>
                </div>
            </div>
            <div className='post-content'>
                <div className='post-content-p'>{postContentP}</div>
                <div className='post-content-img'><img src={postContentImg? postContentImg : GrayStock } alt="content-img"/></div>         
            </div>
            <div className='post-interactions'>
                <div className='post-interactions-counts'>
                    <div className='post-interactions-counts-like'>
                        <a href='#'>{likeCount} Likes</a>
                    </div>
                    <div className='post-interactions-counts-comment'>
                        <a href="#" onClick={toggleComment}>{commentCount} Comments</a>
                    </div>
                </div>
                <div className='post-interactions-btns'>
                    <div className='post-interactions-btns-like' onClick={toggleLike}>
                        <img src={like? LikedIcon : LikeIcon} alt='like-icon'/>
                        Like
                    </div>
                    <div className='post-interactions-btns-comment' onClick={addComment}>
                        <img src={CommentIcon} alt='comment-icon'/>
                        Comment
                    </div>
                </div>
                {comment ? <Comment postAuthorImg={authorImg}/> : null }
            </div>
            
        </div>
    );
  };
  
  export default Post;