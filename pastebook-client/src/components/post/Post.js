import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';
import Comment from '../comment/Comment';
import LikerCard from '../name-pic-card/NamePicCard';
import LikeIcon from '../../images/like.png';
import LikedIcon from '../../images/liked.png';
import CommentIcon from '../../images/comment.png';
import GrayStock from '../../images/gray.jpg';
import { FaRegEdit } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';

const Post = (props) => {

    const {//FROM POSTS TABLE
        sessionIdFromCookie,
        postID,   // This is the ID of the post
        // It will be used in ID-ing each post
        // Will also be used for determining the likes and comment list    
        // From the cookies or local storage.
        authorID,
        postTimeStamp,
        postContentText,
        postContentImg,
        targetID,
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

    const [likeStatus, setLikeStatus] = useState(false);
    const [isCommentShown, setIsCommentShown] = useState(true); // the comments portion is shown by default
    const [authorData, setAuthorData] = useState({});
    const [targetUserData, setTargetUserData] = useState({});
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [loggedInUserData, setLoggedInUserData] = useState([]);
    const [testOpen, setTestOpen] = useState(false);
    const [isAFriendPost, setIsAFriendPost] = useState();

    const pastebookSessionId = sessionIdFromCookie;
    const loggedInId = localStorage.getItem('homeUserId');

    // like/unlike  toggle
    const toggleLike = () => {
        if (likeStatus) {
            deleteLike();
        }
        else {
            sendLike();
        }

    };

    // show/hide comment toggle
    const toggleComment = () => {
        setIsCommentShown(v => !v);
    }

    // user wants to add a comment
    const addComment = () => {
        if (!isCommentShown) {
            setIsCommentShown(v => !v);
        }
        setTimeout(function () {
            document.getElementById(`comment-box${postID}`).focus();
        });
    }

    //show Likes modal 
    const showLikesModal = (id) => {
        document.getElementById(`likesModal${id}`).style.display = "flex";
    }

    //close Likes modal on close-button click
    const closeLikesModal = (id) => {
        document.getElementById(`likesModal${id}`).style.display = "none";
    }

    //show edit post modal 
    const showEditPostModal = (id) => {
        document.getElementById(`editPostModal${id}`).style.display = "flex";
        setTimeout(function () {
            document.getElementById(`edit-post-input${postID}`).focus();
        });
    }

    //close Likes modal on close-button click
    const closeEditPostModal = (id) => {
        document.getElementById(`editPostModal${id}`).style.display = "none";
    }

    const removeEditPostPhoto = (id) => {

    }

    const saveEditPost = async (id) => {

        alert(id);
        const confirmAction = window.confirm("Adwasdw?");
        if (!confirmAction) {
            //
        } else {
            var editedContent = document.getElementById(`edit-post-input${id}`).value;
            const response = await fetch(`${baseUrl}/editPost`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Content: ` ${editedContent}`,
                    Post_ID: id
                })
            });
            if (response.status == 200) {
                alert("hhhehehehe");
                window.location.reload();

            }
        }
    }
    const testDeleteFunction = async (id) => {
        const confirmAction = window.confirm("Are your sure your to delete this post?");
        if (!confirmAction) {
            //
        } else {
            const response = await fetch(`${baseUrl}/deletePost`, {
                method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
                    Post_ID: id
                })
            });
            if (response.status === 200) {
                //
                alert("Post Deleted");
                window.location.reload();

            }
            else {
                alert(response.status, "hellllllo");
            }
        }
    }

    const sendLike = async () => {
        if (loggedInId != null && postID != null) {
            var response = await fetch(`${baseUrl}/like`, {
                method: 'POST',
                headers: {
                    'PostID': postID,
                    'AuthorID': authorData.User_ID,
                    'UserID': loggedInId,
                }
            });
            if (response.status === 200) {
                setLikeStatus(v => !v);
                fetchLikes();
            }
            else {
                alert("Failed to like post " + postID);
            }
        }
    }

    const deleteLike = async () => {
        if (loggedInId != null && postID != null) {
            var response = await fetch(`${baseUrl}/like`, {
                method: 'DELETE',
                headers: {
                    'PostID': postID,
                    'UserID': loggedInId,
                }
            });
            if (response.status === 200) {
                setLikeStatus(v => !v);
                fetchLikes();
            }
            else {
                alert("Failed unlike post " + postID);
            }
        }
    }

    const fetchLikes = () => {
        //fetch likes info
        if (postID != null) {
            fetch(`${baseUrl}/postLikes`, {
                method: 'GET',
                headers: {
                    'PostID': postID
                }
            })
                .then(response => response.json())
                .then(data => setLikes(data.Value));
        }
    }
   
    //fetch comment info
    const fetchComments = () => {
        if (postID != null) {
            fetch(`${baseUrl}/postComments`, {
                method: 'GET',
                headers: {
                    'PostID': postID
                }
            })
                .then(response => response.json())
                .then(data => setComments(data.Value));
        }
    }

    useEffect(() => {
      
        likes.forEach(element => {
            if (element.UserId == loggedInId) {       
                setLikeStatus(true);
            }
            else {
                console.log("assck");
            }
        });
    
    }, [likes]);
    

    

    useEffect(() => {

        fetchLikes();
        fetchComments();

        //fetch author info
        if (authorID != null) {
            fetch(`${baseUrl}/users`, {
                method: 'GET',
                headers: {
                    'UserID': authorID
                }
            })
             .then(response => response.json())
             .then(data => setAuthorData(data.Value));
        }     
         

        //fetch target user info
        if (authorID != null) {
            fetch(`${baseUrl}/users`, {
                method: 'GET',
                headers: {
                    'UserID': targetID
                }
            })
                .then(response => response.json())
                .then(data => setTargetUserData(data.Value));
        }
        //determine if the currently logged in user has liked a this post
        


        //fetch currently logged in user info
        if (pastebookSessionId != null) {
            fetch(`${baseUrl}/users`, {
                method: 'GET',
                headers: {
                    'UserID': loggedInId
                }
            })
                .then(response => response.json())
                .then(data => setLoggedInUserData(data.Value));
        }

        console.log("target"+targetID);
        console.log("author"+authorData.User_ID);

        return () => { };
    }, []);

    return (
        <div className='post'>
            <div className='post-author'>
                <Link id="" target="_blank" to={`/profile/${authorData.UserName}`}>
                    <div className='post-author-img'>
                        <img src={authorData.ProfilePicture ? authorData.ProfilePicture : GrayStock} alt="author-img" />
                    </div>
                </Link>
                <div className='post-author-details'>
                        {targetID!=null&&authorData.User_ID!=null 
                            ? 
                            <div className='post-author-details-name'>  
                                {targetID==authorData.User_ID
                                    ?
                                    <Link className="post-component-link" target="_blank" to={`/profile/${authorData.UserName}`}>
                                        <h4> 
                                            {authorData.FirstName} {authorData.LastName}
                                        </h4>
                                    </Link>
                                    :
                                    <h4>
                                        <Link className="post-component-link" target="_blank" to={`/profile/${authorData.UserName}`}>
                                            {authorData.FirstName} {authorData.LastName} 
                                        </Link>    
                                        {` `}&#9654;{` `}
                                        <Link className="post-component-link" target="_blank" to={`/profile/${targetUserData.UserName}`}>
                                            {targetUserData.FirstName} {targetUserData.LastName}
                                        </Link> 
                                    </h4>
                                }
                            </div>
                            :
                            <div className='post-author-details-name'></div>
                        }    
                    <Link className="post-component-link" target="_blank" to={`/posts/${postID}`}>
                        <div className='post-timestamp'>{postTimeStamp}</div>
                    </Link>
                </div>
                {
                    userID == authorID ?
                        <div className='post-manage'>
                            <button onClick={() => { showEditPostModal(postID) }}><FaRegEdit size={15} /></button>
                            <button onClick={() => { testDeleteFunction(postID) }}><AiOutlineDelete size={20} /></button>
                        </div>
                        : <div></div>
                }

            </div>
            <div className='post-content'>
                {postContentText ?
                    <div className='post-content-p'>
                        <p>
                            {postContentText}
                        </p>
                    </div>
                    :
                    null
                }
                {postContentImg ?
                    <div className='post-content-img'>
                        <img src={postContentImg} alt="content-img" />
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
                        <img src={likeStatus ? LikedIcon : LikeIcon} alt='like-icon' />
                        Like
                    </div>
                    <div className='post-interactions-btns-comment' onClick={addComment}>
                        <img src={CommentIcon} alt='comment-icon' />
                        Comment
                    </div>
                </div>
                {isCommentShown ? <Comment comments={comments} postAuthorImg={authorData.ProfilePicture} postID={postID} loggedInUserPic={loggedInUserData.ProfilePicture} postAuthorId={authorData.User_ID} fetchComments={fetchComments}/> : null}
            </div>
            {/* Likes Modal */}
            <div id={"likesModal" + postID} className="modal">
                <div className="modal-content">
                    <div className='modal-content-title'>
                        <h4>Likes</h4>
                        <p className="close" onClick={() => { closeLikesModal(postID) }}>&times;</p>
                    </div>
                    <div className='like-modal-content-list'>
                        {
                            likes.map((liker) => {
                                return (<LikerCard
                                    key={liker.Liker_ID}
                                    username={liker.UserName}
                                    profilePic={liker.ProfilePicture}
                                    firstName={liker.FirstName}
                                    lastName={liker.LastName}
                                />)
                            })
                        }
                    </div>
                </div>
            </div>
            {/* </div> */}
            {/* Likes Modal */}
            {/* Edit post Modal */}
            <div id={"editPostModal" + postID} className="modal">
                <div className="modal-content">
                    <div className='modal-content-title'>
                        <h4>Edit Post</h4>
                        <p className="close" onClick={() => { closeEditPostModal(postID) }}>&times;</p>
                    </div>
                    <div className='edit-post-modal-content'>
                        {postContentText
                            ?
                            <div className='post-content-edit-text'>
                                <input type="text" id={"edit-post-input" + postID} defaultValue={postContentText} />
                            </div>
                            :
                            null
                        }
                        {postContentImg
                            ?
                            <div className='post-content-edit-img'>
                                <p className="close" onClick={() => { removeEditPostPhoto(postID) }}>&times;</p>
                                <img src={postContentImg} alt="content-img" />
                            </div>
                            :
                            null
                        }
                        <div className='post-edit-save' >
                            <button onClick={() => saveEditPost(postID)}>
                                Save
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            {/* Edit post Modal */}
        </div>
    );
};

export default Post;