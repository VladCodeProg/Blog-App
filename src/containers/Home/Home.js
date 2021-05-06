import React, { Component } from 'react';
import { fireConfig } from '../../firebase';
import PostItem from '../../components/PostItem/PostItem';
import { Fade, Grid, Typography } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import cls from './Home.module.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            posts: []
        }
    }

    componentDidMount() {
        const postsRef = fireConfig.firestore().collection('posts');

        postsRef.onSnapshot(querySnapshot => {
            let posts = [];
            querySnapshot.forEach(doc => {
                posts.push({
                    ...doc.data(),
                    id: doc.id
                })
            });
            posts = posts.sort((a, b) => b.date.seconds - a.date.seconds)

            this.setState({
                posts,
                isLoading: false
            })
        });
    }

    onPostClick = post => {
        this.props.history.push({pathname: `/post/${post.id}`, state: {post}});
    }

    render() {
        if (!this.state.posts.length) {
            return (
                <Typography
                    variant="h4"
                    textAlign="center"
                    mt={4}
                >
                    No posts yet
                </Typography>
            )
        }
        return (
            this.state.isLoading
                ? <div className={cls.Loader}>
                    <CircularProgress />
                  </div>
                : (
                    <Fade in timeout={{enter: 500}}>
                        <Grid
                            container
                            spacing={4}
                            justifyContent="center"
                        >
                            { this.state.posts.map(post => (
                                <Grid item key={post.id}>
                                    <PostItem post={post} onPostClick={this.onPostClick} />
                                </Grid>
                            )) }
                        </Grid>
                    </Fade>
                )
        )
    }
}

export default Home