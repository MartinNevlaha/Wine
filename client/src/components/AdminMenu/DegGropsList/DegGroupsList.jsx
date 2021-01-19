import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import ElementWrapper from '../../../hoc/ElementWrapper/ElementWrapper';
import Button from '../../UI/Button/Button';
import classes from './DegGroupsList.module.css';

const degustatorGroup = (props) => (
    <ElementWrapper wrapperType="SmallWrapper">
        <FontAwesomeIcon icon={faInfoCircle} size={"1x"} className={classes.InfoIcon}/>
        <h4 className={classes.CardHeader}>Zoznam skupín degustátorov</h4>
        <FontAwesomeIcon icon={faUsers} size={props.windowWidth <=1300 ? '3x' : '5x'}/>
        <div className={classes.BtnContainer}>
            {!props.isDegustationOpen &&
            <Button clicked={props.clicked}>Uprav skupiny</Button>}
            <Button clicked={props.clicked}>Zobraz skupiny</Button>
        </div>
    </ElementWrapper>
);

export default degustatorGroup;