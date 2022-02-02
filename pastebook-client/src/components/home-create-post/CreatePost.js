import React, { useEffect, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import './CreatePost.css';

const CreatePost = (props) => {
    const { userId, friendUserId, sessionId, getHomePosts, fromOwnProfile, fromFriendsProfile, fromHome } = props;
    const [imageSource, setImageSource] = useState(null)
    const baseUrl = `http://localhost:5000`;

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const onImageChange = async (event) => {
        if (event.target.files && event.target.files[0]) {
            document.getElementById("home-post-picture-preview").style.display = "block";
            document.getElementById("home-add-picture-button-text").innerText = "Replace";
            const file = event.target.files[0];
            const base64 = await convertImageToBase64(file);
            setImageSource(await base64);
        }
    }

    const onRemovePicture = () => {
        document.getElementById("home-post-picture-preview").style.display = "none";
        document.getElementById("home-add-picture-button-text").innerText = "Add Photo";
        document.getElementById("home-open-file-system").value = "";
        setImageSource(null);
    }

    const sendPostToServer = async () => {
        const postContent = document.getElementById("home-post-text").value;
        if (!postContent && !imageSource) {
            alert("Please write something on the textbox or add a picture.");
            return;
        }

        let postDetails = {};
        let postToFriendsProfile = false;
        if (fromOwnProfile || fromHome) {
            postDetails = {
                User_ID: userId,
                Content: postContent,
                Image: imageSource,
                Target_ID: userId
            }
        }
        else if (fromFriendsProfile) {
            postDetails = {
                User_ID: userId,
                Content: postContent,
                Image: imageSource,
                Target_ID: friendUserId
            }
            postToFriendsProfile = true;
        }

        const response = await fetch(`${baseUrl}/addpost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-SessionID': sessionId,
                'X-PostToFriendsProfile': postToFriendsProfile
            },
            body: JSON.stringify(postDetails)
        });
        if (response.status === 500 || response.status === 401) {
            alert("Post not added.");
        }
        else if (response.status === 200) {
            alert("Post successfully added.");
            onRemovePicture();
            document.getElementById("home-post-text").value = "";
            if (fromHome) {
                await getHomePosts(1);
            }
            else if (fromOwnProfile || fromFriendsProfile) {
                window.location.reload();
            }
        }
        else {
            alert(response.status)
        }
    }

    return (
        <div id="home-create-post">
            <div id="home-post-picture-preview">
                <span id="remove-picture" onClick={onRemovePicture}>&times;</span>
                <img id="home-post-picture" src={imageSource} alt="post-picture-preview" />
            </div>

            <div id="home-post-text-div">
                <textarea id="home-post-text" name="home-post-text" maxLength={1000} placeholder="What's on your mind?"></textarea>
            </div>

            <div id="home-create-post-buttons">
                <label id="home-add-picture-label" className="label">
                    {/* "accept="image/*" so only image uploads are allowed. */}
                    <input id="home-open-file-system" type="file" accept="image/*" onChange={onImageChange} required />
                    <span id="home-add-picture-button">
                        <BiImageAdd
                            id="home-add-picture-icon"
                            size={25} />
                        <div id="home-add-picture-button-text">Add Photo</div>
                    </span>
                </label>
                <div id="home-post-button-div"><button id="home-post-button" onClick={sendPostToServer}>Post</button></div>
            </div>
        </div>
    );
};

export default CreatePost;
