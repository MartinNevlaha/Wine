import React from 'react';

import classes from './WineInfo.module.css';
import Downloadfile from '../../DownloadFile/DownloadFile';

const WineInfo = props => {
    return (
        <div className={classes.InfoContainer}>
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
            <div>
                <Downloadfile
                endPoint={`final-results-generate-cert/${props.wineInfo._id}`}
                fileName={`cert_${props.wineInfo.id}.pdf`}
                token={props.token}
                >Generovať certifikát</Downloadfile>
            </div>
        </div>
    )
}

export default WineInfo;