import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import ElementWrapper from "../../../hoc/ElementWrapper/ElementWrapper";
import Button from "../../UI/Button/Button";
import classes from "./DegustatorList.module.css";

const degustatorList = (props) => (
  <ElementWrapper wrapperType="SmallWrapper">
    <FontAwesomeIcon icon={faInfoCircle} size={"1x"} className={classes.InfoIcon}/>
    <h4 className={classes.CardHeader}>Zoznam degustátorov</h4>
    <FontAwesomeIcon
      icon={faUser}
      size={props.windowWidth <= 1300 ? "3x" : "5x"}
    />
    <div className={classes.BtnContainer}>
      {!props.isDegustationOpen && (
        <Button clicked={props.clicked}>Uprav degustátorov</Button>
      )}
      <Button clicked={props.clicked}>Zobraz degustátorov</Button>
    </div>
  </ElementWrapper>
);

export default degustatorList;
