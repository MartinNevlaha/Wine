import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCogs,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import ElementWrapper from "../../../hoc/ElementWrapper/ElementWrapper";
import Button from "../../UI/Button/Button";
import classes from "./DegustationSettings.module.css";
import CardOverlay from "../../UI/CardOverlay/CardOverlay";

class DegustationSettings extends Component {
  state = {
    isInfoShow: false,
  };
  infoShowHandler = () => {
    this.setState({ isInfoShow: !this.state.isInfoShow });
  };
  render() {
    return (
      <ElementWrapper wrapperType="SmallWrapper">
        <CardOverlay isShow={this.state.isInfoShow}>
          Nastavenie názvu degustácie, mena organizátora degustácie, systému
          bodového hodnotenia, zatvorenie/otvorenie degustácie, QR kód pre
          nastavenie natívnej aplickácie.
        </CardOverlay>
        <FontAwesomeIcon
          icon={this.state.isInfoShow ? faTimes : faInfoCircle}
          size={"1x"}
          className={classes.InfoIcon}
          onClick={this.infoShowHandler}
          cursor="pointer"
        />
        <h4 className={classes.CardHeader}>Základné nastavenia degustácie</h4>
        <FontAwesomeIcon
          icon={faCogs}
          size={this.props.windowWidth <= 1300 ? "3x" : "5x"}
        />
        <div className={classes.BtnContainer}>
          <Button clicked={this.props.clicked}>Uprav nastavenia</Button>
        </div>
      </ElementWrapper>
    );
  }
}

export default DegustationSettings;
