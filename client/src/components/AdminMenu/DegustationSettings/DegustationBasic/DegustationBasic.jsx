import React from "react";

import classes from "../RatingSetting/RatingSetting.module.css";
import styles from "./DegustationBasic.module.css";

const DegustationBasic = (props) => (
  <React.Fragment>
    <div className={classes.RatingSetting}>
      <h4>Hlavné názvy</h4>
      <p>Názov degustácie: {props.actualDegName}</p>
      <input
        type="text"
        placeholder="Názov degustácie"
        className={styles.input}
        onChange={(e) => props.getValueHandler(e, "degustationName")}
      />
      <p>Predseda degustácie: {props.actualChairman}</p>
      <input
        type="text"
        placeholder="Predseda degustácie"
        className={styles.input}
        onChange={(e) => props.getValueHandler(e, "competitionChairman")}
      />
    </div>
  </React.Fragment>
);

export default DegustationBasic;
