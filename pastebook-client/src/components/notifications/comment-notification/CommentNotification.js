import React from 'react';
import { BiCommentDetail } from 'react-icons/bi';

const CommentNotification = (props) => {
    const { commenter } = props;
    return (
        <p>
            <BiCommentDetail
                id="comment-icon"
                size={15}
                color='black' />
            {commenter} commented on your post.
        </p>);
};

export default CommentNotification;
