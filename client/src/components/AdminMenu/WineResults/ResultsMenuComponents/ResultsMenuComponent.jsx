import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';
import Button from '../../../UI/Button/Button';
import classes from './ResultsMenuComponent.module.css';

const ResultsMenuComponent = props => (
    <ElementWrapper wrapperType="SmallWrapper">
        <h4>{props.name}</h4>
        <FontAwesomeIcon icon={faBars} size="5x"/>
        <div className={classes.BtnContainer}>
            <Button 
            index={props.index}
            clicked={props.clicked}>Zobraz</Button>
        </div>
    </ElementWrapper>
);


export default ResultsMenuComponent;