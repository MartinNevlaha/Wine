import React from 'react';
import QRcode from 'qrcode.react';

import classes from '../RatingSetting/RatingSetting.module.css';

const QRsettings = props => (
    <div className={classes.RatingSetting}>
        <p>Odskenuj QR kód pre nastavenie mobilnej aplikácie</p>
        <div className={classes.QrWrapper}>
            <QRcode value={props.server}/>
        </div>
    </div>
);

export default QRsettings;