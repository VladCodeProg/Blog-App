import React from 'react';
import { Card, CardActionArea, CardContent, Typography, CardMedia, CardActions, Button } from '@material-ui/core';
import cls from './PostItem.module.scss';

const createShortDescr = (str, length) => {
    if (str.length > length) {
        while (str[length] !== ' ') length++
        str = str.substring(0, length) + "...";
    }
    return str
}

const PostItem = ({ post, onPostClick, isOtherPost=false }) => {
    return (
        <Card
            variant="outlined"
            className={isOtherPost ? cls.CardOther : cls.Card}
            onClick={() => onPostClick(post)}
        >
            <CardActionArea>
                <CardMedia
                    image={post.photo || 'https://ms314006.github.io/static/b7a8f321b0bbc07ca9b9d22a7a505ed5/97b31/React.jpg'}
                    title="Post image"
                    className={cls.CardPhoto}
                />
                <CardContent>
                    <Typography variant="h5">
                        { post.title }
                    </Typography>
                    <Typography component="p">
                        { createShortDescr(post.descr, 100) }
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button>
                    More details
                </Button>
            </CardActions>
        </Card>
    )
}

export default PostItem