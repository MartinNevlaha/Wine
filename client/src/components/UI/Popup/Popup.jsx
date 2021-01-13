import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation, faCheck } from "@fortawesome/free-solid-svg-icons";

import classes from "./Popup.module.css";

class Popup extends Component {
  render() {
    let style = classes.Popup;
    if (this.props.isSucces) {
      style = classes.Popup_Success;
    } else if (this.props.login) {
      style = classes.Popup_login;
    }
    return (
      <div
        className={style}
        style={{
          transform: this.props.show ? "translateY(0)" : "translateY(+500vh)",
          opacity: this.props.show ? "1" : "0",
        }}
      >
        <FontAwesomeIcon icon={this.props.isSucces ? faCheck : faExclamation} />
        <p>{this.props.message}</p>
      </div>
    );
  }
}

export default Popup;
