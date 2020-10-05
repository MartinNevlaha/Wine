import React from 'react';

import ElementWrapper from '../../../hoc/ElementWrapper/ElementWrapper';
import classes from './DegInfo.module.css'; 

const DegInfo = props => {
    return (
        <ElementWrapper wrapperType="DegInfoWrapper">
            <h4>Degustátor info</h4>
            <div className={classes.DegInfoContainer}>   
                <p>Meno degustátora: {props.degName}</p>
                <p>Číslo degustátora: {props.degustatorNumber} </p>
                <p>Degustačná skupina: {props.degGroup} </p>
            </div>
        </ElementWrapper>
    );
};

export default DegInfo;