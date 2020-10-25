import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWineGlass, faUsers, faUser } from '@fortawesome/free-solid-svg-icons';

import ElementWrapper from '../../../../hoc/ElementWrapper/ElementWrapper';
import Button from '../../../UI/Button/Button';
import classes from './ResultsMenuComponent.module.css';

const ResultsMenuComponent = props => {
    let icon;
    if (props.index === 0) {
        icon = faWineGlass
    } else if (props.index === 1) {
        icon = faUsers
    } else {
        icon = faUser
    }
    return (
        <ElementWrapper wrapperType="SmallWrapper">
            <h4>{props.name}</h4>
            <FontAwesomeIcon icon={icon} size="5x"/>
            <div className={classes.BtnContainer}>
                <Button 
                index={props.index}
                clicked={props.clicked}>Zobraz</Button>
            </div>
        </ElementWrapper>
    );
}



export default ResultsMenuComponent;