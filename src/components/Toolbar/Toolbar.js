import React from 'react';
import { AppBar, Container, Button, Toolbar as AppToolBar, Typography } from '@material-ui/core';
import { AccountCircle, ExitToApp } from '@material-ui/icons';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp, signOut, fireConfig } from '../../firebase';
import { onAuthChange } from '../../store/actions/authActions';
import cls from './Toolbar.module.scss';

const links = [
    { to: '/', label: 'Home', exact: true },
    { to: '/profile', label: 'Profile', exact: false },
    { to: '/create-post', label: 'Create post', exact: false }
]

const failure = errorMessage => console.error(errorMessage);

const handleSignUp = onAuthChange => {
    const success = user => onAuthChange({ isAuthed: true, user });
    signUp(success, failure);
}

const handleSignOut = onAuthChange => {
    const success = () => onAuthChange({ isAuthed: false, user: null });
    signOut(success, failure);
}

const Toolbar = props => {
    const goProfilePage = () => {
        props.history.push('/profile');
    }

    fireConfig.auth().onAuthStateChanged(user => {
        if (user) props.onAuthChange({ isAuthed: true, user });
    })

    return (
        <AppBar position="fixed">
            <Container>
                <AppToolBar>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={props.isAuthed ? () => handleSignOut(props.onAuthChange) : () => handleSignUp(props.onAuthChange)}
                        startIcon={props.isAuthed ? <ExitToApp /> : <AccountCircle />}
                        size="large"
                    >
                        { props.isAuthed ? 'Sign Out' : 'Sign In' }
                    </Button>
                    <div className={cls.Grow}>
                        <ul className={cls.List}>
                            { links.map(link => (
                                <li key={link.label}>
                                    <NavLink
                                        activeClassName={cls.ActivePage}
                                        to={link.to}
                                        exact={link.exact}
                                    >
                                        { link.label }
                                    </NavLink>
                                </li>
                            )) }
                        </ul>
                    </div>
                    { props.user
                        ? <div
                            className={cls.ProfileInfo}
                            onClick={goProfilePage}
                          >
                            <Typography variant="h5">
                                { props.user.displayName }
                            </Typography>
                            <img
                                src={props.user.photoURL}
                                alt={props.user.displayName}
                            />
                          </div>
                        : <Typography variant="h4">
                            Blog
                          </Typography> }
                </AppToolBar>
            </Container>
        </AppBar>
    )
}

const mapStateToProps = state => ({
    isAuthed: state.auth.isAuthed,
    user: state.auth.user
});

const mapDispatchToProps = {
    onAuthChange
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Toolbar))