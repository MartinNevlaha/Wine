import React from 'react';

import NavItems from '../NavItems/NavItems';
import Logo from '../../UI/Logo/Logo';
import classes from './NavBar.module.css';

const navBar = () => (
    <nav className={classes.NavBar}>
        <Logo />
        <NavItems />
    </nav>
)

export default navBar;
