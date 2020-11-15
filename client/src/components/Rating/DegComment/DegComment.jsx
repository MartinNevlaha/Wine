import React from 'react';

import classes from './DegComment.module.css'

const degComment = (props) => (
    <div className={classes.DegComment}>
        <p>Komentár k vínu:</p>
        <textarea 
        value={props.value}
        onChange={(e) => props.getComment(e)}
        cols="30" rows="5"></textarea>
    </div>
);

export default degComment;