import React, { Component, Fragment, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { NavLink as RRNavLink } from "react-router-dom";
import { NavLink, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, UncontrolledDropdown } from "reactstrap";
import { Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Email from "./ValidateEmail";
import Home from "./Home";
import MyAccount from "./MyAccount";
import Trip from "./Trip";
import Friends from "./Friends";
import Trippin from "./Trippin";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from "reactstrap";
import { DropdownButton } from "react-bootstrap";


class AppNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      user: null
    };
  }

  componentDidMount() {
    this.setState({ user: JSON.parse(localStorage.getItem("user")) });
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };


  logout = () => {
    localStorage.removeItem("user");
    document.location.href = "/";
  };



  render() {




    const LOGGED_IN = (
      <Fragment>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret></DropdownToggle>
          <DropdownMenu right>
            <DropdownItem href="/Home">HOME</DropdownItem>
            <DropdownItem href="/MyAccount">EDIT</DropdownItem>
            <DropdownItem href="/Friends">FRIENDS</DropdownItem>
            <DropdownItem href="/Trip">CREATE A TRIP</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={this.logout} >LOG OUT</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        {/*         <NavItem style={{ cursor: "pointer" }}>
          <NavLink>Logged in!</NavLink>
        </NavItem> */}

      </Fragment>
    );

    const LOGGED_OUT = (
      <Fragment>
        <NavItem>
          <NavLink tag={RRNavLink} exact to="/Login">
            Log In
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RRNavLink} exact to="/Register">
            Register
          </NavLink>
        </NavItem>
      </Fragment>
    );
    return (
      <div style={{ height: "100px !important" }}>
        <Router>
          <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
              <NavbarBrand href="/">Trippin</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse className='bg-dark' isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {this.state.user ? LOGGED_IN : LOGGED_OUT}
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
          <Switch>
            <Route path="/trip">
              <Trip />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/myAccount">
              <MyAccount />
            </Route>
            <Route path="/email">
              <Email />
            </Route>
            <Route path="/friends">
              <Friends />
            </Route>

            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default AppNavBar;
