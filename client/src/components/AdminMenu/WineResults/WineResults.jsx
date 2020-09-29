import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoll } from '@fortawesome/free-solid-svg-icons';

import ElementWrapper from '../../../hoc/ElementWrapper/ElementWrapper';
import Button from '../../UI/Button/Button';
import classes from './WineResults.module.css';

const wineResults = (props) => (
    <ElementWrapper wrapperType="SmallWrapper">
        <h4>Výsledky degustácie</h4>
        <FontAwesomeIcon icon={faPoll} size="5x"/>
        <div className={classes.BtnContainer}>
            <Button>Zobraz výsledky</Button>
        </div>
    </ElementWrapper>
);

export default wineResults;