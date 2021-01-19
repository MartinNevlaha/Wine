import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWineBottle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import ElementWrapper from '../../../hoc/ElementWrapper/ElementWrapper';
import Button from '../../UI/Button/Button';
import classes from './WineGroups.module.css';

const WineGroups = props => (
    <ElementWrapper wrapperType="SmallWrapper">
        <FontAwesomeIcon icon={faInfoCircle} size={"1x"} className={classes.InfoIcon} />
        <h4 className={classes.CardHeader}>Priraď vína do skupín</h4>
        <FontAwesomeIcon icon={faWineBottle} size={props.windowWidth <=1300 ? '3x' : '5x'} />
        <div className={classes.BtnContainer}>
            <Button clicked={props.clicked}>Pridaj vína do skupín</Button>
        </div>
    </ElementWrapper>
)

export default WineGroups;