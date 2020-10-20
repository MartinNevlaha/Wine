import React from 'react';

import classes from './IdInput.module.css';

const idInput = (props) => (
    <div className={classes.IdInput}>
        <label >Číslo vína</label>
        <select
        onChange={e => props.getWineId(e)}
        >
            {props.options.map(opt => (
                <option 
                key={opt._id}
                id={opt._id}>
                    {opt.id}
                </option>
            ))}
        </select>
    </div>
);

export default idInput;