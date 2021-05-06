import React from 'react';
import { Card, CardContent, Typography, CardMedia, Fade } from '@material-ui/core';
import { connect } from 'react-redux';
import cls from './ProfilePage.module.scss';

const ProfilePage = ({ isAuthed, user }) => {

    const getDate = () => {
        if (user) {
            let date = new Date(user.metadata.creationTime);
            date = date.toLocaleDateString('en', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            });
            
            return date
        }
    }
    

    if (!isAuthed) {
        return (
            <Typography variant="h4" textAlign="center" mt={5}>
                First you need to sign in
            </Typography>
        )
    }

    return (
        <Fade in timeout={{enter: 500}}>
            <Card>
                <CardMedia
                    image={user.photoURL}
                    title={user.displayName}
                    className={cls.ProfileImg}
                />
                <CardContent>
                    <Typography variant="h5">
                        <b>User name:</b> { user.displayName }
                    </Typography>
                    <Typography>
                        <b>Email:</b> { user.email }
                    </Typography>
                    <Typography>
                        <b>Signed up date:</b> { getDate() }
                    </Typography>
                </CardContent>
            </Card>
        </Fade>
    )
}

const mapStateToProps = state => ({
    isAuthed: state.auth.isAuthed,
    user: state.auth.user
})

export default connect(mapStateToProps)(ProfilePage)