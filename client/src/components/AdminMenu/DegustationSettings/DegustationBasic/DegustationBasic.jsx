import React from 'react';

import classes from '../RatingSetting/RatingSetting.module.css';

const DegustationBasic = props => (
    <React.Fragment>
        <div className={classes.RatingSetting}>
            <h4>Hlavné názvy</h4>
            <p>Názov degustácie: {props.actualDegName}</p>
            <label>Nazov degustácie</label>
            <input type="text"
            onChange={e => props.getValueHandler(e, "degustationName")}/>
            <p>Predseda degustácie: {props.actualChairman}</p>
            <label>Predseda degustácie</label>
            <input type="text"
            onChange={e => props.getValueHandler(e, 'competitionChairman')}/>
        </div>
    </React.Fragment>
)

export default DegustationBasic;