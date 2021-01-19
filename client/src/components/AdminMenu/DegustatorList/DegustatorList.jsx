import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import ElementWrapper from "../../../hoc/ElementWrapper/ElementWrapper";
import Button from "../../UI/Button/Button";
import classes from "./DegustatorList.module.css";
import CardOverlay from "../../UI/CardOverlay/CardOverlay";

class DegustatorList extends Component {
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
          Priradenie degustátorov do degustácie, ich editácia, import pomocou
          csv súborov, vymazanie databázy degustátorov, stiahnutie xlsx súboru
          so zoznamom degustátorov a vygenerovaným QR kódom pre prihlásenie v
          natívnej aplikácii.
        </CardOverlay>
        <FontAwesomeIcon
          icon={this.state.isInfoShow ? faTimes : faInfoCircle}
          size={"1x"}
          className={classes.InfoIcon}
          onClick={this.infoShowHandler}
          cursor="pointer"
        />
        <h4 className={classes.CardHeader}>Zoznam degustátorov</h4>
        <FontAwesomeIcon
          icon={faUser}
          size={this.props.windowWidth <= 1300 ? "3x" : "5x"}
        />
        <div className={classes.BtnContainer}>
          {!this.props.isDegustationOpen && (
            <Button clicked={this.props.clicked}>Uprav degustátorov</Button>
          )}
          <Button clicked={this.props.clicked}>Zobraz degustátorov</Button>
        </div>
      </ElementWrapper>
    );
  }
}

export default DegustatorList;
