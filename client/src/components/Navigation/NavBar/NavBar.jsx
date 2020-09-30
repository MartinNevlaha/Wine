import React from 'react';

import NavItems from '../NavItems/NavItems';
import Logo from '../../UI/Logo/Logo';
import classes from './NavBar.module.css';

const navBar = (props) => (
    <nav className={classes.NavBar}>
        <Logo />
        <NavItems isAdminAuth={props.isAdminAuth}/>
    </nav>
)

export default navBar;
