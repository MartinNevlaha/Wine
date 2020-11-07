import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

import ElementWrapper from '../../../hoc/ElementWrapper/ElementWrapper';
import Button from '../../UI/Button/Button';
import classes from './DegGroupsList.module.css';

const degustatorGroup = (props) => (
    <ElementWrapper wrapperType="SmallWrapper">
        <h4>Zoznam skupín degustátorov</h4>
        <FontAwesomeIcon icon={faUsers} size={props.windowWidth <=1300 ? '3x' : '5x'}/>
        <div className={classes.BtnContainer}>
            {!props.isDegustationOpen &&
            <Button clicked={props.clicked}>Uprav skupiny</Button>}
            <Button clicked={props.clicked}>Zobraz skupiny</Button>
        </div>
    </ElementWrapper>
);

export default degustatorGroup;