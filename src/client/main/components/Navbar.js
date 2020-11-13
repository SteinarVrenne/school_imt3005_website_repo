import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

export default class MainNavbar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Distribution Selection</NavbarBrand>
          <NavbarToggler onClick />
          <Collapse isOpen navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/components/">
                  {/* Click here to crash the site! */}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavbarText>
                  Select a machine you would like to work with!
                </NavbarText>
              </NavItem>
            </Nav>
            <NavbarText onClick={this.props.onClick}>Xgenic!</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
