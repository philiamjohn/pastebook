import React from 'react';
import { BsFilePost } from 'react-icons/bs';

const PostOnProfileNotification = (props) => {
    const { friendWhoPosted } = props;
    return (
        <p>
            <BsFilePost
                id="post-on-profile-icon"
                size={15}
                color='black' />
            {friendWhoPosted} posted on your profile.
        </p>);
};

export default PostOnProfileNotification;
