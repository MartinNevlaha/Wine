import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';

import ElementWrapper from '../../../hoc/ElementWrapper/ElementWrapper';
import Button from '../../UI/Button/Button';
import classes from './DatabaseMenu.module.css';

const databaseMenu = (props) => (
    <ElementWrapper wrapperType="SmallWrapper">
        <h4>Databáza</h4>
        <FontAwesomeIcon icon={faDatabase} size="5x" />
        <div className={classes.BtnContainer}>
            <Button>Uprav</Button>
        </div>
    </ElementWrapper>
);  

export default databaseMenu;