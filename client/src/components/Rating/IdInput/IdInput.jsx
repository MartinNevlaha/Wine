import React from 'react';

import classes from './IdInput.module.css';

const idInput = (props) => (
    <div className={classes.IdInput}>
        <label >Číslo vína</label>
        <select>

        </select>
        <input type="number" 
        value={props.value}
        onChange={(e)=>props.getWineId(e)} />
    </div>
);

export default idInput;