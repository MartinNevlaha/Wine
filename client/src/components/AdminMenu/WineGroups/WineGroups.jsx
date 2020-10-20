import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWineBottle } from '@fortawesome/free-solid-svg-icons';

import ElementWrapper from '../../../hoc/ElementWrapper/ElementWrapper';
import Button from '../../UI/Button/Button';
import classes from './WineGroups.module.css';

const WineGroups = props => (
    <ElementWrapper wrapperType="SmallWrapper">
        <h4>Priraď vína do skupín</h4>
        <FontAwesomeIcon icon={faWineBottle} size="5x"/>
        <div className={classes.BtnContainer}>
            <Button clicked={props.clicked}>Pridaj vína do skupín</Button>
        </div>
    </ElementWrapper>
)

export default WineGroups;