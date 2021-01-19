import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWineGlass,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import ElementWrapper from "../../../hoc/ElementWrapper/ElementWrapper";
import Button from "../../UI/Button/Button";
import classes from "./WineList.module.css";
import CardOverlay from "../../UI/CardOverlay/CardOverlay";

class WineList extends Component {
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
          Pridanie vín do degustácie, ich editácia, import pomocou csv suborov,
          vymazanie databázy vín, stiahnutie xlsx zoznamu vín.
        </CardOverlay>
        <h4 className={classes.CardHeader}>Zoznam vín</h4>
        <FontAwesomeIcon
          icon={this.state.isInfoShow ? faTimes : faInfoCircle}
          size={"1x"}
          className={classes.InfoIcon}
          onClick={this.infoShowHandler}
          cursor="pointer"
        />
        <FontAwesomeIcon
          icon={faWineGlass}
          size={this.props.windowWidth <= 1300 ? "3x" : "5x"}
        />
        <div className={classes.BtnContainer}>
          {!this.props.isDegustationOpen && (
            <Button clicked={this.props.clicked}>Uprav vína</Button>
          )}
          <Button clicked={this.props.clicked}>Zobraz vína</Button>
        </div>
      </ElementWrapper>
    );
  }
}

export default WineList;
