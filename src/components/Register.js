import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Login from "./Login.js"
const AXIOS = require("axios").default;

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: "",
      email: "",
      password: "",
      show_message: false
    };

    this.update = this.update.bind(this);

    this.displayLogin = this.displayRegister.bind(this);
  }

  update(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  displayRegister = e => {
    e.preventDefault();
    // console.log("You have successfully registered");
    AXIOS.post("http://localhost:4000/user/register", {
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.full_name,
      last_name: ""
    })
      .then(response => {
        if (response.data.registered) {
          document.location.href = "/login";
        } else {
          this.setState({ show_message: true });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const ERROR_MESSAGE = (
      <Alert key={1} variant="danger">
        Register not sucessful, try another email
      </Alert>
    );
    return (
      <div className="register">
        <form onSubmit={this.displayRegister}>
          <h2>Register</h2>

          <div className="name">
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={this.state.fullname}
              onChange={this.update}
            />
          </div>

          <div className="email">
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              value={this.state.email}
              onChange={this.update}
            />
          </div>

          <div className="pasword">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.update}
            />
          </div>

          <div className="password">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password1"
            />
          </div>

          <input type="submit" value="Register" />
        </form>

        <Link to="/Login">Login Here</Link>
      </div>
    );
  }
}

export default Register;
