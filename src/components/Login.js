import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
const AXIOS = require("axios").default;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      show_message: false
    };

    this.update = this.update.bind(this);

    this.displayLogin = this.displayLogin.bind(this);
  }

  update(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  displayLogin(e) {
    e.preventDefault();
    AXIOS.post("http://localhost:4000/user/login", {
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        if (response.data.logged_in) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          document.location.href = "/home";
        } else {
          this.setState({ show_message: true });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const ERROR_MESSAGE = (
      <Alert key={1} variant="danger">
        {localStorage.getItem("user")
          ? localStorage.getItem("user").response
          : "Logged in failed"}
      </Alert>
    );
    return (
      <div className="login">
        <form onSubmit={this.displayLogin}>
          <h2>Login</h2>
          <div className="username">
            <input
              type="text"
              placeholder="Username..."
              value={this.state.email}
              onChange={this.update}
              name="email"
            />
          </div>

          <div className="password">
            <input
              type="password"
              placeholder="Password..."
              value={this.state.password}
              onChange={this.update}
              name="password"
            />
          </div>

          <input type="submit" value="Login" />
        </form>
        {this.state.show_message ? ERROR_MESSAGE : ""}

        <Link to="/register">Create an account</Link>
      </div>
    );
  }
}

export default Login;
