import { Typography } from '@material-ui/core';
import React from 'react';
import Comment from '../Comment/Comment';
import LeaveComment from '../LeaveComment/LeaveComment';

const Comments = ({ comments, currentPostId }) => {
    return (
        <div>
            <LeaveComment currentPostId={currentPostId} />
            { comments.length === 0
                ? <Typography variant="h5" textAlign="center" mt={3}>
                    No comments yet
                  </Typography>
                : comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                )) }
        </div>
    )
}

export default Comments