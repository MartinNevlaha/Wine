import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
 
import ElementWrapper from '../../../hoc/ElementWrapper/ElementWrapper';
import Button from '../../UI/Button/Button';
import classes from './DegustatorList.module.css';


const degustatorList = (props) => (
    <ElementWrapper wrapperType="SmallWrapper">
        <h4>Zoznam degustátorov</h4>
        <FontAwesomeIcon icon={faUser} size="5x" />
        <div className={classes.BtnContainer}>
            {props.isDegustationOpen &&
            <Button clicked={props.clicked}>Uprav degustátorov</Button>}
            <Button clicked={props.clicked}>Zobraz degustátorov</Button>
        </div>
    </ElementWrapper>
);

export default degustatorList;