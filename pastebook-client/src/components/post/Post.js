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
    */
   
    const baseUrl = `http://localhost:5000`;

    const [likeStatus, setLike] = useState(/* likeStatus */true);
    const [isCommentShown, setIsCommentShown] = useState(true); // the comments portion is shown by default
    const [authorData, setAuthorData] = useState({});
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [modalId, setModalId] = useState();
    
    // like/unlike  toggle
    const toggleLike = () => {
        if(likeStatus){
            window.alert("Like has been undone!");
        }
        else{
            window.alert("Liked!");
        }
        setLike(v => !v);
    };

    // show/hide comment toggle
    const toggleComment = () => {
        setIsCommentShown(v => !v);
    }

    // user wants to add a comment
    const addComment = () => {
        setIsCommentShown(v => !v);
        setTimeout(function(){
            document.getElementById(`comment-box${postID}`).focus();
        });  
    }

    //show Likes modal 
    const showLikesModal = (id) => {
        setModalId(`likesModal${id}`);
        document.getElementById(`likesModal${id}`).style.display = "flex";  
    }

    //close Likes modal on close-button click
    const closeLikesModal = (id) => {
        document.getElementById(`likesModal${id}`).style.display = "none";
    }

    //close modal on clicking outside the modal
    window.onclick = function(event) {
        var modal = document.getElementById(modalId);
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }

    useEffect(() => {

        //fetch author info
        fetch(`${baseUrl}/users`, {
            method: 'GET',
            headers: {
              'UserID': authorID
            }
        })
        .then(response => response.json())
        .then(data => setAuthorData(data.Value));

        //fetch likes info
        fetch(`${baseUrl}/postLikes`, {
            method: 'GET',
            headers: {
              'PostID': postID
            }
        })
        .then(response => response.json())
        .then(data => setLikes(data.Value));

        //fetch comment info
        fetch(`${baseUrl}/postComments`, {
            method: 'GET',
            headers: {
              'PostID': postID
            }
        })
        .then(response => response.json())
        .then(data => setComments(data.Value));
        
        return () => {};
    }, []);   
    
    return (
        <div className='post'>
            <div className='post-author'>
                <div className='post-author-img'>
                    <img src={authorData.ProfilePicture ? authorData.ProfilePicture  : GrayStock } alt="author-img"/>
                </div>
                <div className='post-author-details'>
                    <div className='post-author-details-name'><h4>{authorData.FirstName} {authorData.LastName}</h4></div>
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
                        {likes.length > 1 ? 
                                            <p id='likesCount' onClick={() => { showLikesModal(postID) }}>{likes.length} Likes</p>
                                         : 
                                            null
                        }
                        {likes.length == 1 ? 
                                            <p id='likesCount' onClick={() => { showLikesModal(postID) }}>{likes.length} Like</p>
                                         : 
                                            null
                        }                     
                    </div>
                    <div className='post-interactions-counts-comment'>
                        {comments.length > 1 ?
                                                <p onClick={toggleComment}>{comments.length} Comments</p>
                                             : 
                                               null
                        }
                        {comments.length == 1 ?
                                                <p onClick={toggleComment}>{comments.length} Comment</p>
                                             : 
                                               null
                        }      
                    </div>
                </div>
                <div className='post-interactions-btns'>
                    <div className='post-interactions-btns-like' onClick={toggleLike}>
                        <img src={likeStatus? LikedIcon : LikeIcon} alt='like-icon'/>
                        Like
                    </div>
                    {/* Likes Modal */}
                    <div id={"likesModal"+postID} className="modal">
                        <div className="modal-content">
                            <div className='modal-content-title'>
                                <h4>Likes</h4>
                                <p className="close" onClick={() => { closeLikesModal(postID) }}>&times;</p>
                            </div>
                            <div className='modal-content-list'>
                             {likes.map((liker) => {
                                  return (<LikerCard
                                    key={liker.Id}
                                    profilePic={liker.ProfilePicture}
                                    firstName={liker.FirstName}
                                    lastName={liker.LastName}
                                  />)
                                })
                            }
                            </div> 
                        </div>
                    </div>
                    {/* Likes Modal */}
                    <div className='post-interactions-btns-comment' onClick={addComment}>
                        <img src={CommentIcon} alt='comment-icon'/>
                        Comment
                    </div>
                </div>
                {isCommentShown ? <Comment comments={comments} postAuthorImg={authorData.ProfilePicture} postID={postID}/> : null }
            </div>
            
        </div>
    );
  };
  
  export default Post;