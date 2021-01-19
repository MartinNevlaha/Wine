import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPoll,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import ElementWrapper from "../../../hoc/ElementWrapper/ElementWrapper";
import Button from "../../UI/Button/Button";
import classes from "./WineResults.module.css";
import CardOverlay from "../../UI/CardOverlay/CardOverlay";

class WineResults extends Component {
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
          Zobrazenie výsledkov degustácie, ich finálny zápis, stiahnutie
          kompletných výsledkov v xlsx súbore, generovanie pdf certifikátov.
          Dostupné iba pri otvorenej degustácii!
        </CardOverlay>
        <FontAwesomeIcon
          icon={this.state.isInfoShow ? faTimes : faInfoCircle}
          size={"1x"}
          className={classes.InfoIcon}
          onClick={this.infoShowHandler}
          cursor="pointer"
        />
        <h4 className={classes.CardHeader}>Výsledky degustácie</h4>
        <FontAwesomeIcon
          icon={faPoll}
          size={this.props.windowWidth <= 1300 ? "3x" : "5x"}
        />
        <div className={classes.BtnContainer}>
          <Button
            disabled={!this.props.isDegustationOpen}
            clicked={this.props.clicked}
          >
            Zobraz výsledky
          </Button>
        </div>
      </ElementWrapper>
    );
  }
}

export default WineResults;
