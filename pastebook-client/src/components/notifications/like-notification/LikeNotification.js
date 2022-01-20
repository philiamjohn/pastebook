import React from 'react';
import { AiFillLike } from 'react-icons/ai';

const LikeNotification = (props) => {
    const { liker } = props;
    return (
        <p>
            <AiFillLike
                id="like-icon"
                size={15}
                color='black' />
            {liker} liked your post.
        </p>);
};

export default LikeNotification;
