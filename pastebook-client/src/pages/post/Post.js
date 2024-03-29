import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Post.css';
import PostComponent from '../../components/post/Post';
import Avatar from '../../images/avatar.png';
import MeowDrama from '../../images/meow-drama.jpg';
import Header from '../../components/header/Header';

const Post = (props) => {
    const { getSessionIdFromCookie, getUserData, userData } = props;
    const { postId } = useParams();
    let navigate = useNavigate();
    const baseUrl = `http://localhost:5000`;
    const pastebookSessionId = getSessionIdFromCookie();
    const loggedInId = localStorage.getItem('homeUserId');

    const [postData, setPostData] = useState({});
    const [isAuthorizedToViewPost, setIsAuthorizedToViewPost] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const isLoggedInUserFriendsWithPostOwnerOrTarget = async () => {
        const response = await fetch(`${baseUrl}/arewefriends`, {
            method: 'GET',
            headers: {
                "X-SessionID": pastebookSessionId,
                "X-LoggedInUser": userData.User_ID,
                "X-PostOwner": postData.User_ID,
                "X-PostTarget": postData.Target_ID
            },
        });

        if (response.status === 200) {
            const result = await response.text();
            if (result === "true") {
                setIsAuthorizedToViewPost(true);
            }
            setIsFetching(false);
        }
        else {
            setIsFetching(false);
        }
    }

    useEffect(() => {

        getUserData();

        //clear all setIntervals
        for (let id = 0; id <= 1000; id++) {
            window.clearInterval(id);
        }

        if (pastebookSessionId == null) {
            navigate("/login", { replace: true });
        }

        //fetch post info
        if (pastebookSessionId != null && postId != null) {
            fetch(`${baseUrl}/post/${postId}`, {
                method: 'GET',
                headers: {
                    'X-SessionID': pastebookSessionId
                }
            })
                .then(response => response.json())
                .then(data => setPostData(data));
        }

        return () => { };

    }, []);

    useEffect(() => {
        if (!postData.User_ID || !userData.User_ID) { }
        else {
            //if currently logged in user is the post owner, or the target of the post
            //therefore, they can view their own post
            //if not, check if they're friends with the post owner or target of the post
            isLoggedInUserFriendsWithPostOwnerOrTarget();
        }
    }, [postData, userData]);


    return (
        <div className='post-page'>
            <div className='post-page-header'><Header username={userData.UserName} getSessionIdFromCookie={getSessionIdFromCookie} /></div>
            {
                userData && postData.Post_ID && !isFetching
                    ?
                    isAuthorizedToViewPost
                        ?
                        <div className='post-page-content'>
                            <PostComponent
                                sessionIdFromCookie={pastebookSessionId}
                                postID={postId}
                                authorID={postData.User_ID}
                                postTimeStamp={postData.DatePosted}
                                postContentText={postData.Content}
                                postContentImg={postData.Image}
                                targetID={postData.Target_ID}
                                userID={localStorage.getItem('homeUserId')}
                            />
                        </div>
                        : <div>You are not allowed to view this post.</div>
                    : <div>Loading</div>
            }
        </div>
    );
};

export default Post;