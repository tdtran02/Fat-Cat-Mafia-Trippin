import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  NavLink,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import { Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Email from "./ValidateEmail";
import Home from "./Home";
import MyAccount from "./MyAccount";
import Trip from "./Trip";
import Friends from "./Friends";
import TRIPPIN from "./Trippin";
import CurrentTrip from "./CurrentTrip";
import Spending from "./Spending";
import { DropdownButton } from "react-bootstrap";
import Recommendation from "./Recommendation";
import ForgotPassword from "./ForgotPassword";

import ResetPassword from "./ResetPassword";
//import UpdatePasswordViaEmail from "./UpdatePasswordViaEmail";
import Schedule from "./Schedule";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";

class AppNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      user: null,
    };
  }

  componentDidMount() {
    this.setState({ user: JSON.parse(localStorage.getItem("user")) });
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
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
            <DropdownItem onClick={this.logout}>LOG OUT</DropdownItem>
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
      <div style={{ height: "100%" }}>
        <Router>
          <Navbar sticky="top" color="dark" dark expand="sm">
            <Container>
              <NavbarBrand href="/">
                <img
                  src={require("./images/trippinicon.jpg")}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{" "}
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse className="bg-dark" isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  {/*                   <NavItem>
                    <NavLink tag={RRNavLink} exact to="/email">
                      Email
                    </NavLink>
                  </NavItem> */}
                  {this.state.user ? LOGGED_IN : LOGGED_OUT}
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
          <Switch>
            <Route path="/trip/:id/schedule" exact component={Schedule}></Route>
            <Route
              path="/trip/:id/recommendations"
              exact
              component={Recommendation}
            ></Route>
            <Route path="/trip/:id/spending" exact component={Spending}></Route>
            <Route path="/trip/:id" exact component={CurrentTrip}></Route>
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
            <Route path="/forgotPassword">
              <ForgotPassword />
            </Route>
            {/* <Route path="/resetPassword/:token">
              <ResetPassword />
            </Route> */}
            <Route
              exact
              path="/resetPassword/:token"
              component={ResetPassword}
            />
            <Route path="/updatePasswordViaEmail"></Route>
            <Route path="/tripbuddy"></Route>
            <Route path="/home">
              <Home />
            </Route>

            <Route path="/">
              <TRIPPIN />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default AppNavBar;
