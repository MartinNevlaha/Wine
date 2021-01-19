import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import ElementWrapper from "../../../hoc/ElementWrapper/ElementWrapper";
import Button from "../../UI/Button/Button";
import classes from "./DegustationSettings.module.css";
import CardOverlay from "../../UI/CardOverlay/CardOverlay";

const DegustationSettings = (props) => (
  <ElementWrapper wrapperType="SmallWrapper">
    <CardOverlay>125</CardOverlay>
    <FontAwesomeIcon icon={faInfoCircle} size={"1x"} className={classes.InfoIcon} />
    <h4 className={classes.CardHeader}>Základné nastavenia degustácie</h4>
    <FontAwesomeIcon
      icon={faCogs}
      size={props.windowWidth <= 1300 ? "3x" : "5x"}
    />
    <div className={classes.BtnContainer}>
      <Button clicked={props.clicked}>Uprav nastavenia</Button>
    </div>
  </ElementWrapper>
);

export default DegustationSettings;
