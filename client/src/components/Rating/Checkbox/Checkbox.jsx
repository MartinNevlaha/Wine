import React from 'react';

import classes from './Checkbox.module.css';


const checkbox = (props) => (
    <div className={classes.Checkbox}>
        <label >Eliminovať víno</label>
        <input type="checkbox" onChange={() => props.change(props.checked)} checked={props.checked}/>
    </div>
);



export default checkbox;