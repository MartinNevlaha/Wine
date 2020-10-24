import React from 'react';

import classes from './WineInfo.module.css';

const WineInfo = props => {
    return (
        <div className={classes.InfoWine}>
            <h4>Informácie o víne</h4>
            <ul>
                <li>Číslo vína: {props.wineInfo.id}</li>
                <li>Názov vína: {props.wineInfo.name}</li>
                <li>Súťažná kategória vína: {props.wineInfo.competitiveCategory}</li>
                <li>Klasifikácia vína: {
                `${props.wineInfo.color} ${props.wineInfo.character} ${props.wineInfo.clasification}`}
                </li>
                <li>Výrobca vína: {props.wineInfo.producer}</li>
                <li>Ročník: {props.wineInfo.vintage}</li>
            </ul>
        </div>
    )
}

export default WineInfo;