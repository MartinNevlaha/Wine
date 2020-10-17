import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

import ElementWrapper from '../../../hoc/ElementWrapper/ElementWrapper';
import Button from '../../UI/Button/Button';
import classes from './SystemMenu.module.css';

const databaseMenu = (props) => (
    <ElementWrapper wrapperType="SmallWrapper">
        <h4>System Info</h4>
        <FontAwesomeIcon icon={faDatabase} size="5x" />
        <div className={classes.BtnContainer}>
            <Button clicked={props.clicked}>Zobraz Systémové info</Button>
        </div>
    </ElementWrapper>
);  

export default databaseMenu;