import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { Comment } from '@material-ui/icons';
import { connect } from 'react-redux';
import { fireConfig } from '../../firebase';
import cls from './LeaveComment.module.scss';

const LeaveComment = props => {
    const [formValue, setFormValue] = useState({
        value: '',
        touched: false,
    });

    const changeFormValue = e => {
        setFormValue({
            value: e.target.value,
            touched: true, 
        })
    }

    const addComment = e => {
        e.preventDefault();

        fireConfig.firestore()
            .collection('posts')
            .doc(props.currentPostId)
            .collection('comments')
            .add({
                text: formValue.value,
                date: new Date(),
                photoURL: props.user.photoURL,
                displayName: props.user.displayName,
            });

        setFormValue({value: '', touched: false});
    }

    if (!props.isAuthed) {
        return (
            <Typography variant="h5" textAlign="center" mt={5}>
                Sign in to leave a comment
            </Typography>
        )
    }

    return (
        <form onSubmit={addComment} className={cls.Comments}>
            <div className={cls.Wrapper}>
                <img
                    className={cls.ProfilePhoto}
                    src={props.user.photoURL}
                    alt={props.user.displayName}
                />
                <TextField
                    variant="standard"
                    label="Add a comment"
                    value={formValue.value}
                    onChange={changeFormValue}
                    error={formValue.value.trim() === '' && formValue.touched}
                    helperText={formValue.value.trim() === '' && formValue.touched ? "Comment can't be empty" : null}
                    multiline
                    fullWidth
                    maxRows={4}
                    inputProps={{
                        maxLength: 300
                    }}
                />
            </div>
            <div className={cls.CommentsBtn}>
                <Button
                    variant="outlined"
                    startIcon={<Comment />}
                    disabled={formValue.value.trim() === ''}
                    type="submit"
                >
                    Leave comment
                </Button>
            </div>
        </form>
    )
}

const mapStateToProps = state => ({
    isAuthed: state.auth.isAuthed,
    user: state.auth.user
});

export default connect(mapStateToProps)(LeaveComment)