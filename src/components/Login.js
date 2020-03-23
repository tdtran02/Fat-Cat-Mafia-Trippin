import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import "../styles/Login.css";
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
      <div className="container h">
        <div className="row h justify-content-center align-items-center">
          <form className="col-md-9" onSubmit={this.displayLogin}>
            <div className="AppForm shadow-lg">
              <div className="row">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                  <div className="AppFormLeft">
                    <h1>Login</h1>
                    <div className="form-group position-relative mb-4">
                      <input
                        className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                        type="email"
                        placeholder="Email..."
                        value={this.state.email}
                        onChange={this.update}
                        name="email"
                        required
                      />
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="form-group position-relative mb-4">
                      <input
                        className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                        type="password"
                        placeholder="Password..."
                        value={this.state.password}
                        onChange={this.update}
                        name="password"
                        required
                      />
                      <i className="fa fa-key"></i>
                    </div>
                    <div className="row  mt-4 mb-4">
                      <div className="col-md-6"></div>
                      <div className="col-md-6 text-right">
                        <a href="/forgotPassword">Forgot Password?</a>
                      </div>
                    </div>

                    <button
                      value="Login"
                      type="submit"
                      className="btn btn-success btn-block shadow border-0 py-2 text-uppercase "
                    >
                      Log in
                    </button>

                    <p className="text-center mt-5">
                      Don't have an account?
                      <Link
                        to="/register"
                        style={{ color: "blue", marginLeft: "5px" }}
                      >
                        Create an account
                      </Link>
                    </p>

                    {this.state.show_message ? ERROR_MESSAGE : ""}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
                    <h2 className="position-relative px-4 pb-3 mb-4">
                      Welcome
                    </h2>
                    <p>Log in and plan your trip!</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      // <div className="login">
      //   <form onSubmit={this.displayLogin}>
      //     <h2>Login</h2>
      //     <div className="username">
      //       <input
      //         type="text"
      //         placeholder="Username..."
      //         value={this.state.email}
      //         onChange={this.update}
      //         name="email"
      //       />
      //     </div>

      //     <div className="password">
      //       <input
      //         type="password"
      //         placeholder="Password..."
      //         value={this.state.password}
      //         onChange={this.update}
      //         name="password"
      //       />
      //     </div>

      //     <input type="submit" value="Login" />
      //   </form>
      //   {this.state.show_message ? ERROR_MESSAGE : ""}

      //   <Link to="/register">Create an account</Link>
      // </div>
    );
  }
}

export default Login;
