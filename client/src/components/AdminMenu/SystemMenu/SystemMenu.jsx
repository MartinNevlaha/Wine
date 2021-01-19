import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import ElementWrapper from "../../../hoc/ElementWrapper/ElementWrapper";
import Button from "../../UI/Button/Button";
import classes from "./SystemMenu.module.css";
import CardOverlay from "../../UI/CardOverlay/CardOverlay";

class DatabaseMenu extends Component {
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
          Zobrazenie základných informácií o serveri, informácie o databáze
          degustácie, kompletný reset databázy, stiahnutie logov z degustácie,
          aktívny výpis z postov jednotlivých degustátorov.
        </CardOverlay>
        <FontAwesomeIcon
          icon={this.state.isInfoShow ? faTimes : faInfoCircle}
          size={"1x"}
          className={classes.InfoIcon}
          onClick={this.infoShowHandler}
          cursor="pointer"
        />
        <h4 className={classes.CardHeader}>System Info</h4>
        <FontAwesomeIcon
          icon={faDatabase}
          size={this.props.windowWidth <= 1300 ? "3x" : "5x"}
        />
        <div className={classes.BtnContainer}>
          <Button
            disabled={!this.props.isDegustationOpen}
            clicked={this.props.clicked}
          >
            Zobraz info
          </Button>
        </div>
      </ElementWrapper>
    );
  }
}

export default DatabaseMenu;
