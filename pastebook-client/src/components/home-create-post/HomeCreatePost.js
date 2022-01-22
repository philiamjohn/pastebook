import React, { useEffect, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import './HomeCreatePost.css';

const HomeCreatePost = () => {
    const [imageSource, setImageSource] = useState(null)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            document.getElementById("home-post-picture-preview").style.display = "block";
            document.getElementById("home-add-picture-button-text").innerText = "Replace";
            setImageSource(URL.createObjectURL(event.target.files[0]));
        }
    }

    const onRemovePicture = () => {
        document.getElementById("home-post-picture-preview").style.display = "none";
        document.getElementById("home-add-picture-button-text").innerText = "Add Photo";
        document.getElementById("home-open-file-system").value = "";
        setImageSource(null);
    }

    console.log(imageSource);

    return (
        <div id="home-create-post">
            <div id="home-post-picture-preview">
                <span id="remove-picture" onClick={onRemovePicture}>&times;</span>
                <img id="home-post-picture" src={imageSource} alt="preview image" />
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
                <div id="home-post-button-div"><button id="home-post-button">Post</button></div>
            </div>
        </div>
    );
};

export default HomeCreatePost;
