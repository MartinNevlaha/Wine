import React from 'react';

import classes from './DbInfo.module.css';
import Button from '../../../UI/Button/Button';

const DbInfo = props => {
    return (
        <div className={classes.DbInfo}>
            <h4>Informácie o databáze</h4>
            <ul>
                <li>Počet vín v DB: {props.dbData.numOfWine}</li>
                <li>Počet degustatorov v DB: {props.dbData.numOfDeg}</li>
                <li>Počet skupín degustatorov v DB: {props.dbData.numOfGroups}</li>
                <li>Počet výsledkov v DB: {props.dbData.numOfResults}</li>
            </ul>
            <Button clicked={props.modalOpen}>RESET DB</Button>
        </div>
    )
};

export default DbInfo;