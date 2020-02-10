import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { NavLink as RRNavLink } from "react-router-dom";
import { NavLink } from "reactstrap";
import { Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Email from "./ValidateEmail";
import Home from "./Home";
import MyAccount from "./MyAccount";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from "reactstrap";

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
        <NavItem style={{ cursor: "pointer" }}>
          <NavLink>Logged in!</NavLink>
        </NavItem>
        <NavItem style={{ cursor: "pointer" }} onClick={this.logout}>
          <NavLink>Log out</NavLink>
        </NavItem>
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
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={RRNavLink} exact to="/home">
                      Home
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={RRNavLink} exact to="/email">
                      Email
                    </NavLink>
                  </NavItem>
                  {this.state.user ? LOGGED_IN : LOGGED_OUT}
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
          <Switch>
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
