import React, { Component } from 'react';
import { fireConfig } from '../../firebase';
import { Error } from '@material-ui/icons';
import { Button, Grid, Typography, CircularProgress } from '@material-ui/core';
import Comments from '../../components/Comments/Comments';
import PostItem from '../../components/PostItem/PostItem';
import cls from './PostPage.module.scss';

class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPostsLoading: true,
            isCommentsLoading: true,
            comments: [],
            otherPosts: [],
            title: '',
            descr: '',
            photo: null
        }
    }

    componentDidMount() {
        this.getPost();
        this.getOtherPosts();
        this.getComments();
    }

    getPost = () => {
        const post = this.props.history.location.state?.post;

        if (post) {
            this.setState({
                title: post.title,
                descr: post.descr,
                photo: post.photo || 'https://ms314006.github.io/static/b7a8f321b0bbc07ca9b9d22a7a505ed5/97b31/React.jpg'
            })
        }
    }

    getOtherPosts = () => {
        const otherPostsRef = fireConfig.firestore().collection('posts');

        otherPostsRef.onSnapshot(querySnapshot => {
            let otherPosts = [];
            querySnapshot.forEach(doc => {
                otherPosts.push({
                    ...doc.data(),
                    id: doc.id
                })
            });
            
            otherPosts = otherPosts.filter(post => post.id !== this.props.history.location.pathname.slice(6));

            this.setState({
                otherPosts,
                isPostsLoading: false
            });
        });
    }

    getComments = () => {
        const commentsRef = fireConfig.firestore()
            .collection('posts')
            .doc(this.props.history.location.pathname.slice(6))
            .collection('comments');

        commentsRef.onSnapshot(querySnapshot => {
            let comments = [];
            querySnapshot.forEach(doc => {
                comments.push({
                    ...doc.data(),
                    id: doc.id
                })
            });

            comments = comments.sort((a, b) => b.date.seconds - a.date.seconds);

            this.setState({
                comments,
                isCommentsLoading: false
            });
        })
    }

    onPostClick = post => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.props.history.push({pathname: `/post/${post.id}`, state: {post}});
        this.getPost();
        this.getOtherPosts();
        this.getComments();
    }

    goToHomePage = () => {
        this.props.history.push('/');
    }

    render() {
        if (!this.props.history.location.state) {
            return (
                <div className={cls.Error}>
                    <Error className={cls.ErrorIcon} />
                    <h2>Something went wrong...</h2>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        className={cls.ErrorBtn}
                        onClick={this.goToHomePage}
                    >
                        To home page
                    </Button>
                </div>
            )
        }

        return (
            <Grid container spacing={3}>
                <Grid item md={9}>
                    <div className={cls.MainContent}>
                        <img
                            className={cls.MainPhoto}
                            src={this.state.photo}
                            alt={this.state.text}
                        />
                        <Typography variant="h3">
                            { this.state.title }
                        </Typography>
                        <Typography>
                            { this.state.descr }
                        </Typography>
                        { this.state.isCommentsLoading
                            ? <div className={cls.Loader}>
                                <CircularProgress />
                            </div>
                            : <Comments
                                currentPostId={this.props.history.location.pathname.slice(6)}
                                comments={this.state.comments}
                            /> }
                    </div>
                </Grid>
                <Grid item md={3}>
                    <div className={cls.OtherPosts}>
                        <Typography variant="h5">
                            Other posts
                        </Typography>
                        { this.state.isPostsLoading
                            ? <div className={cls.Loader}>
                                <CircularProgress />
                            </div>
                            : this.state.otherPosts.map(post => (
                                <PostItem
                                    key={post.id}
                                    isOtherPost={true}
                                    post={post}
                                    onPostClick={this.onPostClick}
                                />
                            ))
                        }
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default PostPage