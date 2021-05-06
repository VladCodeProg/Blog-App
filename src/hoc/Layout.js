import React from 'react';
import { Container } from '@material-ui/core';
import Toolbar from '../components/Toolbar/Toolbar';
import cls from './Layout.module.scss';

const Layout = props => {
    return (
        <>
            <Toolbar />
            <main className={cls.Layout}>
                <Container>
                    { props.children }
                </Container>
            </main>
        </>
    )
}

export default Layout