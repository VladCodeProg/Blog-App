import React, { Component } from 'react';
import { Typography, TextField, Button, Fade } from '@material-ui/core';
import { AddBox, Image } from '@material-ui/icons';
import { connect } from 'react-redux';
import cls from './PostCreator.module.scss';
import { fireConfig } from '../../firebase';

class PostCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: null,
            title: {
                value: '',
                touched: false
            },
            descr: {
                value: '',
                touched: false
            }
        }
    }

    inputChangeHandler = e => {
        this.setState({
            [e.target.name]: {
                value: e.target.value,
                touched: true
            }
        });
    }

    addImgHandler = async e => {
        const file = e.target.files[0];
        const storageRef = fireConfig.storage().ref();
        const fileRef = storageRef.child(file.name);

        await fileRef.put(file);
        const photo = await fileRef.getDownloadURL();

        this.setState({photo});
    }

    createPosts = e => {
        e.preventDefault()
        const { title, descr, photo } = this.state;

        fireConfig.firestore().collection('posts').add({
            title: title.value,
            descr: descr.value,
            date: new Date(),
            photo
        });

        this.setState({
            photo: null,
            title: {
                value: '',
                touched: false
            },
            descr: {
                value: '',
                touched: false
            }
        });
    }

    render() {
        if (!this.props.isAuthed) {
            return (
                <Typography variant="h4" textAlign="center" mt={5}>
                    To create post you need to sign in
                </Typography>
            )
        }

        return (
            <Fade in timeout={{enter: 500}}>
                <form className={cls.Form} onSubmit={this.createPosts}>
                    <Typography variant="h4" textAlign="center">
                        Create post
                    </Typography>
                    <TextField
                        label="Post title"
                        className={cls.FormInput}
                        value={this.state.title.value}
                        name="title"
                        onChange={e => this.inputChangeHandler(e)}
                        helperText={
                            this.state.title.touched && this.state.title.value.trim() === ''
                                ? "The title can't be empty" : null}
                        error={this.state.title.touched && this.state.title.value.trim() === '' ? true : false}
                    />
                    <TextField
                        label="Post description"
                        className={cls.FormInput}
                        value={this.state.descr.value}
                        name="descr"
                        onChange={e => this.inputChangeHandler(e)}
                        helperText={
                            this.state.descr.touched && this.state.descr.value.trim() === ''
                                ? "The description can't be empty" : null}
                        error={this.state.descr.touched && this.state.descr.value.trim() === '' ? true : false}
                        multiline
                        rows={5}
                        inputProps={{
                            maxLength: 3000
                        }}
                    />
                    <Button
                        variant="contained"
                        startIcon={<Image />}
                        className={cls.FormAdd}
                    >
                        <label htmlFor="file-input">
                            Add image (not required)
                        </label>
                    </Button>
                    { !this.state.photo && (
                        <Typography
                            variant="body1"
                            textAlign="center"
                            mt={1}
                        >
                            Image resolution should be
                            1280x720 or higher
                        </Typography>
                    ) }
                    <input
                        style={{display: 'none'}}
                        onChange={this.addImgHandler}
                        type="file"
                        accept='.png, .jpg .jpeg'
                        id="file-input"
                    />
                    { this.state.photo && (
                        <img
                            src={this.state.photo}
                            alt="uploaded_img"
                            className={cls.FormImg}
                        />
                    ) }
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<AddBox />}
                        className={cls.FormSubmit}
                        size="large"
                        disabled={this.state.title.value.trim() === '' || this.state.descr.value.trim() === '' }
                    >
                        Create post
                    </Button>
                </form>
            </Fade>
        )
    }
}

const mapStateToProps = state => ({
    isAuthed: state.auth.isAuthed
});

export default connect(mapStateToProps)(PostCreator)