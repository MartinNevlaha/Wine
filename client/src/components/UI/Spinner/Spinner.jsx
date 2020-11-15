import React from 'react';

import classes from './Spinner.module.css';

const spinner = (props) => (
    <div className={props.type !== 'small' ? classes.loader : classes.loader_small}>
    </div>
);

export default spinner;