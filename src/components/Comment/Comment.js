import { Typography } from '@material-ui/core';
import React from 'react';
import cls from './Comment.module.scss';

const Comment = ({ comment }) => {
    let date = new Date(comment.date.seconds * 1000);
    date = date.toLocaleString('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }).toLocaleString();

    return (
        <div className={cls.Comment}>
            <img
                src={comment.photoURL}
                alt={comment.displayName}
            />
            <div>
                <Typography variant="body1" color="textSecondary">
                    { date }
                </Typography>
                <Typography>
                    { comment.text }
                </Typography>
            </div>
        </div>
    )
}

export default Comment