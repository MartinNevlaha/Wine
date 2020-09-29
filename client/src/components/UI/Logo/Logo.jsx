import React from 'react';

import logopng from '../../../assets/images/Logo.png';
import classes from './Logo.module.css';

const logo = () => (
    <div className={classes.Logo}>
        <img src={logopng} alt="logo"/>
        <p>Wine Degustator</p>
    </div>
);

export default logo;