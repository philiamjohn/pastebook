import React, {useState} from 'react';
import './Post.css';
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
    const [comment, setComment] = useState(commentCount); 

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
    
    return (
        <div className='post'>
            <div className='post-author'>
                <div className='post-author-img'>
                    <a href="#"><img src={authorImg ? authorImg  : GrayStock } alt="author-img"/></a>
                </div>
                <div className='post-author-details'>
                    <div className='post-author-details-name'><a href="#"><h4>{authorName}</h4></a></div>
                    <div className='post-timestamp'>{postTimeStamp}</div>
                </div>
            </div>
            <div className='post-content'>
                <div className='post-content-p'>{postContentP}</div>
                <div className='post-content-img'><img src={postContentImg? postContentImg : GrayStock } alt="content-img"/></div>         
            </div>
            <div className='post-interactions'>
                <div className='post-interactions-counts'>
                    <div className='post-interactions-counts-like'><a href='#'>{likeCount} Likes</a></div>
                    <div className='post-interactions-counts-comment'></div><a href="#" onClick={toggleComment}>{commentCount} Comments</a>
                </div>
                <div className='post-interactions-btns'>
                    <div className='post-interactions-btns-like' onClick={toggleLike}>
                        <img src={like? LikedIcon : LikeIcon} alt='like-icon'/>
                        Like
                    </div>
                    <div className='post-interactions-btns-comment' onClick={comment}>
                        <img src={CommentIcon} alt='comment-icon'/>
                        Comment
                    </div>
                </div>
                <div className='post-interactions-comment'></div>
            </div>
            <div className='post-comments'>
                <div className='post-comments-expand'><a href='#'>View more comment</a></div>
                <div className='post-comments-list'>
                    
                </div>
                <div className='post-comments-create'>
                    <img src={authorImg ? authorImg  : GrayStock } alt="author-img"/>
                    <input type='text' placeholder="Write a comment"/>
                </div>
            </div>
        </div>
    );
  };
  
  export default Post;