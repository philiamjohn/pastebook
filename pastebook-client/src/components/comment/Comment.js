import React, {useState, useEffect} from 'react';
import './Comment.css';
import CommentCard from '../comment-card/CommentCard';
import GrayStock from '../../images/gray.jpg';

const Comment = (props) => {

  const {postAuthorImg,
         postID,
         comments} = props;

  const baseUrl = `http://localhost:5000`;
        
  const [allCommentsShown, setAllCommentsShown] = useState(false);
  const [commentsList, setCommentsList] = useState(comments); 


  const addComment = (id) => {
    document.getElementById('comment-box'+id).focus();
  }

  const showMoreComments = () => {
    setAllCommentsShown(v => !v);
  }

  useEffect(() => {
    
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
                <CommentCard key={commentsList[0].Id}
                             uname={commentsList[0].UserName}
                             profilePic={commentsList[0].ProfilePic} 
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
                                  <CommentCard key={comment.Id}
                                               uname={comment.UserName}
                                               profilePic={comment.ProfilePic} 
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
              <img src={postAuthorImg ? postAuthorImg  : GrayStock } alt="author-img" onClick={() => addComment(postID)}/>
            </div>
            <div className='post-interactions-comments-create-input'>
              <input type='text' placeholder="Write a comment" id={"comment-box"+postID}/>
            </div>
        </div>
    </div>
  );
};

export default Comment;
