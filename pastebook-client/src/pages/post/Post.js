import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Post.css';
import PostComponent from '../../components/post/Post';
import Avatar from '../../images/avatar.png';
import MeowDrama from '../../images/meow-drama.jpg';

const Post = (props) => {

    const baseUrl = `http://localhost:5000`;

    const {
            getSessionIdFromCookie
          } = props;

    const { postId } = useParams();
    let navigate = useNavigate();

    const [postData, setPostData] = useState({});
    
    const pastebookSessionId = getSessionIdFromCookie();
    const loggedInId = localStorage.getItem('homeUserId');

    useEffect(() => {
        console.log(pastebookSessionId)
        if (pastebookSessionId == null) {
            navigate("/login", { replace: true });
        }

        //fetch post info
        if(pastebookSessionId!=null && postId!=null){
            fetch(`${baseUrl}/post/${postId}`, {
                method: 'GET',
                headers: {
                    'X-SessionID': pastebookSessionId
                }
            })
            .then(response => response.json())
            .then(data => setPostData(data));
        }

      return () => {};

    }, []);
    
    return (
        <div className='post-page'>
            <PostComponent 
                           sessionIdFromCookie={pastebookSessionId}
                           postID={postId}
                           authorID={postData.User_ID}
                           postTimeStamp={postData.DatePosted}
                           postContentText={postData.Content}
                           postContentImg={postData.Image}
            />           
        </div>
    );
  };
  
  export default Post;