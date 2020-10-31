import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWineGlass } from '@fortawesome/free-solid-svg-icons';

import ElementWrapper from '../../../hoc/ElementWrapper/ElementWrapper';
import Button from '../../UI/Button/Button';
import classes from './WineList.module.css';

const wineList = (props) => (
    <ElementWrapper wrapperType="SmallWrapper">
        <h4>Zoznam vín</h4>
        <FontAwesomeIcon icon={faWineGlass} size="5x" />
        <div className={classes.BtnContainer}>
            {!props.isDegustationOpen && 
            <Button clicked={props.clicked}>Uprav vína</Button>}
            <Button clicked={props.clicked}>Zobraz vína</Button>
        </div>
    </ElementWrapper>
);

export default wineList;