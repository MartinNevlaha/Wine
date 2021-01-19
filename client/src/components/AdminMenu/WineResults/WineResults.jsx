import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoll, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import ElementWrapper from '../../../hoc/ElementWrapper/ElementWrapper';
import Button from '../../UI/Button/Button';
import classes from './WineResults.module.css';

const wineResults = (props) => (
    <ElementWrapper wrapperType="SmallWrapper">
        <FontAwesomeIcon icon={faInfoCircle} size={"1x"} className={classes.InfoIcon} />
        <h4 className={classes.CardHeader}>Výsledky degustácie</h4>
        <FontAwesomeIcon icon={faPoll} size={props.windowWidth <=1300 ? '3x' : '5x'}/>
        <div className={classes.BtnContainer}>
            <Button 
            disabled={!props.isDegustationOpen}
            clicked={props.clicked}>Zobraz výsledky</Button>
        </div>
    </ElementWrapper>
);

export default wineResults;