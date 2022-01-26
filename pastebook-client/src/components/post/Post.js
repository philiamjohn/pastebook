import React, {useEffect, useState} from 'react';
import './Post.css';
import Comment from '../comment/Comment';
import LikerCard from '../name-pic-card/NamePicCard';
import LikeIcon from '../../images/like.png';
import LikedIcon from '../../images/liked.png';
import CommentIcon from '../../images/comment.png';
import GrayStock from '../../images/gray.jpg';

const Post = (props) => {
    
    const {//FROM POSTS TABLE
           postID,   // This is the ID of the post
                     // It will be used in ID-ing each post
                     // Will also be used for determining the likes and comment list 
           authorID, // This is the ID of the post author
                     // It will be used for determining the name of the author
           postTimeStamp,     
           postContentText, 
           postContentImg,
           // From the cookies or local storage.
           userID   // This is the ID of the currently signed-in user
                     // This will be used for determining the liked status of the post
                     // Can be retrieved 
                     // Siguro i-save nalang agad to pagka authenticate sa login para madali i-access
                     // And syempre i-clear upon logging-out     
          } = props;
    
    /* 
          List of variables to be fetched:
          -likeStatus: retrieve from Likes Table using userID and postID
          -authorImg, authorName: retrieve from Users Table using authorID
          -likes[] : retrieve from Likes Table using postID
          -comments[] : retrieve from Comments Table using postID
          - : retrieve from Posts Table using postID
    */
   
    const baseUrl = `http://localhost:5000`;

    const [like, setLike] = useState(/* likeStatus */true);
    const [comment, setComment] = useState(true); // the comments portion is shown by default

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
            document.getElementById(`comment-box${postID}`).focus();
        });  
    }

    //show Likes modal 
    const showLikesModal = () => {
        document.getElementById("likesModal").style.display = "flex";
    }

    //close Likes modal on close-button click
    const closeLikesModal = () => {
        document.getElementById("likesModal").style.display = "none";
    }

    //close modal on clicking outside the modal
    window.onclick = function(event) {
        var modal = document.getElementById("likesModal");
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }

    useEffect(() => {
        
        const response = fetch(`${baseUrl}/home`, {
            method: 'GET',
            headers: {
              'AuthorID': authorID
            },
        });
        
        return () => {};
    }, []);   
    
    return (
        <div className='post'>
            <div className='post-author'>
                <div className='post-author-img'>
                    <img src={/*authorImg*/false ? /* authorImg */GrayStock  : GrayStock } alt="author-img"/>
                </div>
                <div className='post-author-details'>
                    <div className='post-author-details-name'><h4>{/*authorName*/}Juan dela Cruz</h4></div>
                    <div className='post-timestamp'>{postTimeStamp}</div>
                </div>
            </div>
            <div className='post-content'>
                <div className='post-content-p'>{postContentText}</div>
                {postContentImg ?
                                <div className='post-content-img'>
                                    <img src={ postContentImg} alt="content-img"/>
                                </div>
                               :
                                null
                }                         
            </div>
            <div className='post-interactions'>
                <div className='post-interactions-counts'>
                    <div className='post-interactions-counts-like'>
                        <p id='likesCount' onClick={showLikesModal}>{/* likes.Length */}123 Likes</p>
                    </div>
                    <div className='post-interactions-counts-comment'>
                        <p onClick={toggleComment}>{/* comments.Length */}321 Comments</p>
                    </div>
                </div>
                <div className='post-interactions-btns'>
                    <div className='post-interactions-btns-like' onClick={toggleLike}>
                        <img src={like? LikedIcon : LikeIcon} alt='like-icon'/>
                        Like
                    </div>
                    {/* Likes Modal */}
                    <div id="likesModal" className="modal">
                        <div className="modal-content">
                            <div className='modal-content-title'>
                                <h4>Likes</h4>
                                <p className="close" onClick={closeLikesModal}>&times;</p>
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
                    {/* Likes Modal */}
                    <div className='post-interactions-btns-comment' onClick={addComment}>
                        <img src={CommentIcon} alt='comment-icon'/>
                        Comment
                    </div>
                </div>
                {comment ? <Comment postID={postID} postAuthorImg={/* authorImg */GrayStock}/> : null }
            </div>
            
        </div>
    );
  };
  
  export default Post;