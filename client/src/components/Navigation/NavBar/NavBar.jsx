import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Spring } from "react-spring/renderprops";

import NavItems from "../NavItems/NavItems";
import Logo from "../../UI/Logo/Logo";
import classes from "./NavBar.module.css";

class NavBar extends Component {
  state = {
    navClose: true,
  };
  openBar = () => {
    this.setState({ navClose: false });
  };
  closeBar = () => {
    this.setState({ navClose: true });
  };
  render() {
    return (
      <React.Fragment>
        <nav
          className={classes.NavBar}
          style={{
            transform: this.state.navClose
              ? "translateY(-200vh)"
              : "translateY(0)",
          }}
        >
          <Logo />
          <NavItems
            isAdminAuth={this.props.isAdminAuth}
            isDegAuth={this.props.isDegAuth}
            closeNavBar={this.closeBar}
          />
        </nav>
        <div className={classes.MenuIcon}>
          {this.state.navClose && (
            <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
              {(props) => (
                <div style={props}>
                  <FontAwesomeIcon
                    icon={faBars}
                    size={"2x"}
                    onClick={this.openBar}
                    cursor={"pointer"}
                  />{" "}
                </div>
              )}
            </Spring>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
