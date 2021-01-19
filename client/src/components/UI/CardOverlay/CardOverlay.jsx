import React from "react";

import classes from "./CardOverlay.module.css";

const CardOverlay = (props) => {
  return (
    <div
      className={
        !props.isShow
          ? classes.CardOverlay
          : [classes.CardOverlay, classes.Show].join(" ")
      }
    >
      {props.children}
    </div>
  );
};

export default CardOverlay;
