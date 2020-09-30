import React from 'react';

import NavItem from '../NavItem/NavItem';
import classes from './NavItems.module.css';

const isDegustator = false;

const navItems = (props) => {
    let navItems = (
        <React.Fragment>
            <NavItem link="/" exact >Domov</NavItem>
            <NavItem link="/adminzone">Admin Zóna</NavItem>
            <NavItem link="/about">O aplikácii</NavItem>
        </React.Fragment>
    );
    if (props.isAdminAuth) {
        navItems = (
        <React.Fragment>
            <NavItem link="/adminzone" exact>Admin Zóna</NavItem>
            <NavItem link="/results">Výsledky</NavItem>
            <NavItem link="/about">O aplikácii</NavItem>
            <NavItem link="/logout" >Odhlásiť sa</NavItem>
        </React.Fragment>
        );
    }
    if (isDegustator) {
        navItems = (
        <React.Fragment>
            <NavItem link="/rating" exact>Hodnotenie</NavItem>
            <NavItem link="/results">Výsledky</NavItem>
            <NavItem link="/about">O aplikácii</NavItem>
            <NavItem link="/logout" >Odhlásiť sa</NavItem>
        </React.Fragment>
        );
    }
    return (
    <ul className={classes.NavItems}>
        {navItems}
    </ul>
    );
};

export default navItems; 