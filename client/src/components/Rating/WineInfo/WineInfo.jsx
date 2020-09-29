import React from 'react';
import Spinner from '../../UI/Spinner/Spinner';

import classes from './WineInfo.module.css';

const WineInfo = (props) => (
    <ul className={classes.WineInfo}>
        {props.isFetching ? <Spinner /> : 
        <React.Fragment>
        <li>Farba: {props.wineInfo.color ? props.wineInfo.color : "Zadaj číslo vína"}</li>
        <li>Charakter: {props.wineInfo.character ? props.wineInfo.character : 'Zadaj číslo vína'}</li>
        </React.Fragment>}
    </ul>
);

export default WineInfo;