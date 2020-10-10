import React from 'react';

import classes from './ViewSystemInfo.module.css';

const ViewSystemInfo = props => {
    return (
        <div className={classes.SystemInfo}>
            <h4>Informácie o systéme (server)</h4>
            <ul>
                <li>Operačný systém: {props.systemData.opSystem}</li>
                <li>Cpu: {props.systemData.cpuInfo}</li>
                <li>Celková pamäť: {props.systemData.totalRAM}/MB</li>
                <li>Voľná pamäť: {props.systemData.freeRAM}/MB</li>
            </ul>
        </div>
    );
}

export default ViewSystemInfo;