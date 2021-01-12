import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

import NavItem from "../NavItem/NavItem";
import classes from "./NavItems.module.css";

const navItems = (props) => {
  let navItems = (
    <React.Fragment>
      <NavItem link="/" exact>
        Degustator
      </NavItem>
      <NavItem link="/adminzone">Admin Zóna</NavItem>
      <FontAwesomeIcon
        icon={faMinus}
        size={"2x"}
        onClick={props.closeNavBar}
        cursor={"pointer"}
      />
    </React.Fragment>
  );
  if (props.isAdminAuth) {
    navItems = (
      <React.Fragment>
        <NavItem link="/adminzone" exact>
          Admin Zóna
        </NavItem>
        <NavItem link="/results">Výsledky</NavItem>
        <NavItem link="/logout">Odhlásiť sa</NavItem>
        <FontAwesomeIcon
        icon={faMinus}
        size={"2x"}
        onClick={props.closeNavBar}
        cursor={"pointer"}
      />
      </React.Fragment>
    );
  } else if (props.isDegAuth) {
    navItems = (
      <React.Fragment>
        <NavItem link="/rating" exact>
          Hodnotenie
        </NavItem>
        <NavItem link="/results">Výsledky</NavItem>
        <NavItem link="/logout">Odhlásiť sa</NavItem>
        <FontAwesomeIcon
        icon={faMinus}
        size={"2x"}
        onClick={props.closeNavBar}
        cursor={"pointer"}
      />
      </React.Fragment>
    );
  }
  return <ul className={classes.NavItems}>{navItems}</ul>;
};

export default navItems;
