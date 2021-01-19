import React from 'react';

import classes from "./CardOverlay.module.css";

const CardOverlay = props => {

  return (
    <div className={classes.CardOverlay}>
      {props.children}
    </div>
  )
}

export default CardOverlay;