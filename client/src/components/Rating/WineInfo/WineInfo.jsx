import React from 'react';

import classes from './WineInfo.module.css';

const WineInfo = (props) => (
    <ul className={classes.WineInfo}>
        <React.Fragment>
        <li>Súťažná kat.: {props.wineInfo.competitiveCategory ? props.wineInfo.competitiveCategory :"Zadaj číslo vína"}</li>
        <li>Farba: {props.wineInfo.color ? props.wineInfo.color : "Zadaj číslo vína"}</li>
        <li>Charakter: {props.wineInfo.character ? props.wineInfo.character : 'Zadaj číslo vína'}</li>
        <li>Ročník: {props.wineInfo.vintage ? props.wineInfo.vintage : "Zadaj číslo vína"}</li>
        </React.Fragment>
    </ul>
);

export default WineInfo;