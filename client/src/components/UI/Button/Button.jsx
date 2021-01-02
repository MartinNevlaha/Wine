import React, { Component } from "react";

import classes from "./Button.module.css";

class btn extends Component {
  componentDidUpdate() {
    console.log("update");
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.disabled !== this.props.disabled ||
      nextProps.active !== this.props.active
    );
  }

  render() {
    let currentClass = [];
    if (this.props.active) {
      currentClass.push("Active");
    }
    return (
      <button
        disabled={this.props.disabled}
        onClick={() =>
          this.props.clicked(
            this.props.index,
            this.props.children,
            this.props.btnType
          )
        }
        className={
          !this.props.disabled
            ? [classes.Btn, classes[currentClass]].join(" ")
            : [classes.Btn, classes.Disabled].join(" ")
        }
      >
        {this.props.children}
      </button>
    );
  }
}

export default btn;
