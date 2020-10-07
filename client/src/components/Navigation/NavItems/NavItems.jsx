import React from 'react';

import NavItem from '../NavItem/NavItem';
import classes from './NavItems.module.css';

const navItems = (props) => {
    let navItems = (
        <React.Fragment>
            <NavItem link="/" exact >Domov</NavItem>
            <NavItem link="/adminzone">Admin Zóna</NavItem>
            <NavItem link="/author">O autorovi</NavItem>
        </React.Fragment>
    );
    if (props.isAdminAuth) {
        navItems = (
        <React.Fragment>
            <NavItem link="/adminzone" exact>Admin Zóna</NavItem>
            <NavItem link="/results">Výsledky</NavItem>
            <NavItem link="/author">Autor</NavItem>
            <NavItem link="/logout" >Odhlásiť sa</NavItem>
        </React.Fragment>
        );
    } else if (props.isDegAuth) {
        navItems = (
        <React.Fragment>
            <NavItem link="/rating" exact>Hodnotenie</NavItem>
            <NavItem link="/results">Výsledky</NavItem>
            <NavItem link="/author">Autor</NavItem>
            <NavItem link="/logout">Odhlásiť sa</NavItem>
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