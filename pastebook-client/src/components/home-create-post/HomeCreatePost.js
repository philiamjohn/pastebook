import React from 'react';
import { BiImageAdd } from 'react-icons/bi';
import './HomeCreatePost.css';

const HomeCreatePost = () => {
    return (
        <div id="home-create-post">
            <div id="home-post-picture-preview">
            </div>
            <div id="home-post-text-div">
                <textarea id="home-post-text" name="home-post-text" maxLength={1000} placeholder="What's on your mind?"></textarea>
            </div>

            <div id="home-create-post-buttons">
                <div id="home-add-picture-div">
                    <button id="home-add-picture-button">
                        <BiImageAdd
                            id="home-add-picture-icon"
                            size={25} />
                        <div id="home-add-picture-button-text">Add Photo</div>
                    </button>
                </div>
                <div id="home-post-button-div"><button id="home-post-button">Post</button></div>
            </div>
        </div>
    );
};

export default HomeCreatePost;
