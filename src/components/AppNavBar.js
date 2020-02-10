import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { NavLink as RRNavLink } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import { Route } from 'react-router-dom';
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
} from 'reactstrap';

class AppNavBar extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Router>
                    <Navbar color="dark" dark expand="sm" className="mb-5">
                        <Container>

                            <NavbarBrand href="/">Trippin</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>

                                    <NavItem>
                                        <NavLink tag={RRNavLink} exact to="/home" >Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} exact to="/LogIn" >Log In</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} exact to="/Register">Register</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} exact to="/email">Email</NavLink>
                                    </NavItem>

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