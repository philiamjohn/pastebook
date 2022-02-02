import React, {useState, useEffect} from 'react';
import './Comment.css';
import CommentCard from '../comment-card/CommentCard';
import GrayStock from '../../images/gray.jpg';

const Comment = (props) => {

  const {postAuthorId,
         postID,
         comments,
         loggedInUserPic} = props;

  const baseUrl = `http://localhost:5000`;
        
  const [allCommentsShown, setAllCommentsShown] = useState(false);
  const [commentsList, setCommentsList] = useState(comments);
  
  const loggedInId = localStorage.getItem('homeUserId');

  const addComment = (id) => {
    document.getElementById('comment-box'+id).focus();
  }

  const showMoreComments = () => {
    setAllCommentsShown(v => !v);
  }

  const sendComment = async (id, val) => {
    
    console.log(id);
    console.log(val);

    if(loggedInId != null){
      var response = await fetch(`${baseUrl}/comment`, {
          method: 'POST',
          headers: {
            'PostID': id,
            'AuthorID': postAuthorId,
            'Content': val,
            'UserID': loggedInId,
          }
      });
      if (response.status === 200) {
          alert("Comment sent!");
      }
      else {
        alert("Failed to send comment");
      }
    }

  }

  const addAComment = (event) => {
    var el = document.getElementById('comment-box'+postID)
    if (event.key === 'Enter') {
      if(el.value!="") {
        var val = el.value;
        var id = el.id.replace('comment-box','');
        sendComment(id,val);
      }
      else {
        console.log("emptyshit");
      }
    }
  }

  useEffect(() => {

    document.getElementById('comment-box'+postID).addEventListener("keyup", addAComment);
     
    setCommentsList(comments);
    console.log(commentsList);
    return () => {};
    }, [comments]);  

  return (
    <div className='post-interactions-comments' id='comments'>
        {commentsList.length > 1 ?
        <div className='post-interactions-comments-list'>
            <div className='post-interactions-comments-list-item'>
              {commentsList.length > 0 ?
                <CommentCard key={commentsList[0].Comment_ID}
                             uname={commentsList[0].UserName}
                             profilePic={commentsList[0].ProfilePicture} 
                             firstName={commentsList[0].FirstName}
                             lastName={commentsList[0].LastName}
                             content={commentsList[0].Content}/>
                             :
                null
               }
             </div>
             {allCommentsShown ?
                                  null
                                : 
                                commentsList.length > 1 ?
                                  <div className='post-interactions-comments-expand' onClick={showMoreComments}>
                                    {commentsList.length > 2 ? <p>View {commentsList.length-1} more comments</p> 
                                                             : <p>View {commentsList.length-1} more comment</p>
                                    }
                                  </div>
                                :
                                null  
             }
             
             {allCommentsShown ? 
                                commentsList.map((comment, index) => {
                                  if(index>0){
                                  return ( <div className='post-interactions-comments-list-item'>
                                  <CommentCard key={comment.Comment_ID}
                                               uname={comment.UserName}
                                               profilePic={comment.ProfilePicture} 
                                               firstName={comment.FirstName}
                                               lastName={comment.LastName}
                                               content={comment.Content}/>
                                               </div>
                                          )
                                  }
                                  else {
                                    return null;
                                  }        
                                })

                                : 
                                  null 
              }
        </div>
        :
        null
        }
        <div className='post-interactions-comments-create'>
            <div className='post-interactions-comments-create-img'>
              <img src={loggedInUserPic ? loggedInUserPic  : GrayStock } alt="author-img" onClick={() => addComment(postID)}/>
            </div>
            <div className='post-interactions-comments-create-input'>
              <input type='text' placeholder="Write a comment" className='commentBoxes' id={"comment-box"+postID}/>
            </div>
        </div>
    </div>
  );
};

export default Comment;
