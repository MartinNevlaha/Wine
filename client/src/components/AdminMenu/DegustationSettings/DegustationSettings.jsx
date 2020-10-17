import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons';

import ElementWrapper from '../../../hoc/ElementWrapper/ElementWrapper';
import Button from '../../UI/Button/Button';
import classes from './DegustationSettings.module.css';

const DegustationSettings = props => (
    <ElementWrapper wrapperType="SmallWrapper">
        <h4>Základné nastavenia degustácie</h4>
        <FontAwesomeIcon icon={faCogs} size="5x" />
        <div className={classes.BtnContainer}>
            <Button clicked={props.clicked}>Uprav nastavenia</Button>
        </div>
    </ElementWrapper>
);

export default DegustationSettings;