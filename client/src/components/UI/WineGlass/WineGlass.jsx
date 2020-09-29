import React from 'react';

import img_glass from '../../../assets/images/glass_wine.png'
import classes from './WineGlass.module.css';

const wineGlass = () => (
    <div className={classes.WineGlass}>
        <img src={img_glass} alt="wine_glass"/>
    </div>
);
export default wineGlass;