import React from 'react';
import QRcode from 'qrcode.react';

import classes from '../RatingSetting/RatingSetting.module.css';

const QRsettings = props => (
    <div className={classes.RatingSetting}>
        <p>Odskenuj QR kód pre nastavenie mobilnej aplikácie</p>
        <QRcode value={props.server}/>
    </div>
);

export default QRsettings;