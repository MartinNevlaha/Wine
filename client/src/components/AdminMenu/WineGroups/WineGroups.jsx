import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWineBottle,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import ElementWrapper from "../../../hoc/ElementWrapper/ElementWrapper";
import Button from "../../UI/Button/Button";
import classes from "./WineGroups.module.css";
import CardOverlay from "../../UI/CardOverlay/CardOverlay";

class WineGroups extends Component {
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
          Pridanie vín do vytvorench degustačných skupín, editácia vín v
          skupinách, stiahnutie xlsx súboru s rozdelením vín do skupín.
        </CardOverlay>
        <FontAwesomeIcon
          icon={this.state.isInfoShow ? faTimes : faInfoCircle}
          size={"1x"}
          className={classes.InfoIcon}
          onClick={this.infoShowHandler}
          cursor="pointer"
        />
        <h4 className={classes.CardHeader}>Priraď vína do skupín</h4>
        <FontAwesomeIcon
          icon={faWineBottle}
          size={this.props.windowWidth <= 1300 ? "3x" : "5x"}
        />
        <div className={classes.BtnContainer}>
          <Button clicked={this.props.clicked}>Pridaj vína do skupín</Button>
        </div>
      </ElementWrapper>
    );
  }
}

export default WineGroups;
