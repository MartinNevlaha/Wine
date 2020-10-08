import React from 'react';

import classes from './IdInput.module.css';

const idInput = (props) => (
    <div className={classes.IdInput}>
        <label >Číslo vína</label>
        <input type="text" 
        value={props.value}
        onChange={(e)=>props.getWineId(e)} />
    </div>
);

export default idInput;