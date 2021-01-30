import React from "react";

import classes from "./RatingSetting.module.css";

const RatingSetting = (props) => (
  <div className={classes.RatingSetting}>
    <h4>Nastavenia výsledného hodnotenia v skupinách</h4>
    <p style={{ color: "red" }}>
      Aktuálne nastavenie:
      {props.isValuesEliminated
        ? " " + props.eliminatedValues.options[0]
        : " " + props.eliminatedValues.options[1]}
    </p>
    <p>Možnosti výberu nastavenia</p>
    <ul>
      <li>
        Eliminácia krajných hodnôt - Vráti vážený priemer od degustátorov v
        skupinách po elimináci najlepšieho a najhoršieho hodnotenia
      </li>
      <li>
        Bez elminácie krajných hodnôt - Vráti vážený priemer všetkých hodnotení
        od degustátorov v skupinách
      </li>
    </ul>
    <h5 style={{ color: "red" }}>POZOR</h5>
    <p style={{ color: "red" }}>
      Nastavenia nemeniť počas prebiehajúcej degustácie
    </p>
    <div className={classes.selectWrapper}>
      <select
        type="select"
        defaultValue={
          props.isValuesEliminated
            ? props.eliminatedValues.options[0]
            : props.eliminatedValues.options[1]
        }
        onChange={(e) => props.getValueHandler(e, props.eliminatedValues.id)}
      >
        {props.eliminatedValues.options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
      <p>
        <i className={classes.arrowDown}></i>
      </p>
    </div>
  </div>
);

export default RatingSetting;
