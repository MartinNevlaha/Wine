import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import ElementWrapper from "../../../hoc/ElementWrapper/ElementWrapper";
import Button from "../../UI/Button/Button";
import classes from "./DegGroupsList.module.css";
import CardOverlay from "../../UI/CardOverlay/CardOverlay";

class DegustatorGroup extends Component {
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
          Vytvorenie degustačných skupín, priradenie degustátorov do skupín,
          editácia degustátorov v skupinách, stiahnutie súboru xlsx so zoznamom
          degustátorov v degustačných skupinách.
        </CardOverlay>
        <FontAwesomeIcon
          icon={this.state.isInfoShow ? faTimes : faInfoCircle}
          size={"1x"}
          className={classes.InfoIcon}
          onClick={this.infoShowHandler}
          cursor="pointer"
        />
        <h4 className={classes.CardHeader}>Zoznam skupín degustátorov</h4>
        <FontAwesomeIcon
          icon={faUsers}
          size={this.props.windowWidth <= 1300 ? "3x" : "5x"}
        />
        <div className={classes.BtnContainer}>
          {!this.props.isDegustationOpen && (
            <Button clicked={this.props.clicked}>Uprav skupiny</Button>
          )}
          <Button clicked={this.props.clicked}>Zobraz skupiny</Button>
        </div>
      </ElementWrapper>
    );
  }
}

export default DegustatorGroup;
