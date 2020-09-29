import React from 'react';

import classes from './ElementWrapper.module.css';

const elementWrapper = (props) => (
    <div className={classes[props.wrapperType]}>
        {props.children}
    </div>
);

export default elementWrapper;