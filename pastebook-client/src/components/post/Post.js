import React, {useEffect, useState} from 'react';
import './Post.css';
import Comment from '../comment/Comment';
import LikerCard from '../name-pic-card/NamePicCard';
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

    // user wants to add a comment
    const addComment = () => {
        setComment(v => !v);
        setTimeout(function(){
            document.getElementById('comment-box').focus();
        });  
    }

    // likes modal
    useEffect(() => {
        var modal = document.getElementById("likesModal");
        var btn = document.getElementById("likesCount");
        var closeModal = document.getElementsByClassName("close")[0];
    
        //show modal
        btn.onclick = function() {
            modal.style.display = "flex";
        }
        
        //close modal on close-button click
        closeModal.onclick = function() {
            modal.style.display = "none";
        }
    
        //close modal on clicking outside the modal
        window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
        }
      return () => {
      };
    }, []);
    

    
    
    
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
                {postContentImg?
                                <div className='post-content-img'>
                                    <img src={postContentImg} alt="content-img"/>
                                </div>
                               :
                                null
                }                         
            </div>
            <div className='post-interactions'>
                <div className='post-interactions-counts'>
                    <div className='post-interactions-counts-like'>
                        <p id='likesCount'>{likeCount} Likes</p>
                    </div>
                    {/* likes Modal */}
                    <div id="likesModal" className="modal">
                      <div className="modal-content">
                        <div className='modal-content-title'>
                            <h4>Likes</h4>
                            <p className="close">&times;</p>
                        </div>
                       <div className='modal-content-list'>
                           <div className='modal-content-list-item'>
                                <LikerCard userPhoto={GrayStock} userName="Liker One" />
                           </div>
                           <div className='modal-content-list-item'>
                                <LikerCard userPhoto={GrayStock} userName="Liker Two" />
                           </div>
                           <div className='modal-content-list-item'>
                                <LikerCard userPhoto={GrayStock} userName="Liker Three" />
                           </div>
                           <div className='modal-content-list-item'>
                                <LikerCard userPhoto={GrayStock} userName="Liker Four" />
                           </div>
                           <div className='modal-content-list-item'>
                                <LikerCard userPhoto={GrayStock} userName="Liker Five" />
                           </div>     
                           <div className='modal-content-list-item'>
                                <LikerCard userPhoto={GrayStock} userName="Liker Six" />
                           </div>
                           <div className='modal-content-list-item'>
                                <LikerCard userPhoto={GrayStock} userName="Liker Seven" />
                           </div>
                       </div> 
                      </div>
                    </div>
                    {/* likes Modal */}
                    <div className='post-interactions-counts-comment'>
                        <p onClick={toggleComment}>{commentCount} Comments</p>
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