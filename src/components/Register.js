import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
const AXIOS = require("axios").default;

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmed_password: "",
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
    if (this.state.confirmed_password != this.state.password) {
      this.setState({ show_message: true });
      return;
    }

    // console.log("You have successfully registered");
    AXIOS.post("http://localhost:4000/user/register", {
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name
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
        Register not sucessful
      </Alert>
    );
    return (
      <div className="container h">
        <div className="row h justify-content-center align-items-center">
          <form className="col-md-9" onSubmit={this.displayLogin}>
            <div className="AppForm shadow-lg">
              <div className="row">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                  <div className="AppFormLeft" style={{ width: "300px" }}>
                    <h1>Register</h1>
                    <div className="form-group position-relative mb-4">
                      <input
                        className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        value={this.state.first_name}
                        onChange={this.update}
                        required
                      />
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="form-group position-relative mb-4">
                      <input
                        className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        value={this.state.last_name}
                        onChange={this.update}
                        required
                      />
                      <i className="fas fa-user"></i>
                    </div>

                    <div className="form-group position-relative mb-4">
                      <input
                        className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={this.state.email}
                        onChange={this.update}
                        required
                      />
                      <i className="fas fa-envelope"></i>
                    </div>

                    <div className="form-group position-relative mb-4">
                      <input
                        className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.update}
                        required
                      />
                      <i className="fa fa-key"></i>
                    </div>

                    <div className="form-group position-relative mb-4">
                      <input
                        className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmed_password"
                        value={this.state.confirmed_password}
                        onChange={this.update}
                        required
                      />
                      <i className="fa fa-key"></i>
                    </div>

                    <button
                      value="Login"
                      type="submit"
                      className="btn btn-success btn-block shadow border-0 py-2 text-uppercase "
                    >
                      Register
                    </button>

                    {this.state.show_message ? ERROR_MESSAGE : ""}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
                    <h2 className="position-relative px-4 pb-3 mb-4">
                      Welcome
                    </h2>
                    <p>Register here!</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      // <div className="register">
      //   <form onSubmit={this.displayRegister}>
      //     <h2>Register</h2>

      //     <div className="name">
      //       <input
      //         type="text"
      //         placeholder="First Name"
      //         name="first_name"
      //         value={this.state.first_name}
      //         onChange={this.update}
      //       />
      //     </div>
      //     <div className="name">
      //       <input
      //         type="text"
      //         placeholder="Last Name"
      //         name="last_name"
      //         value={this.state.last_name}
      //         onChange={this.update}
      //       />
      //     </div>

      //     <div className="email">
      //       <input
      //         type="email"
      //         placeholder="Enter your email"
      //         name="email"
      //         value={this.state.email}
      //         onChange={this.update}
      //       />
      //     </div>

      //     <div className="pasword">
      //       <input
      //         type="password"
      //         placeholder="Password"
      //         name="password"
      //         value={this.state.password}
      //         onChange={this.update}
      //       />
      //     </div>

      //     <div className="password">
      //       <input
      //         type="password"
      //         placeholder="Confirm Password"
      //         name="password1"
      //       />
      //     </div>

      //     <input type="submit" value="Register" />
      //   </form>

      //   <Link to="/login">Login Here</Link>
      // </div>
    );
  }
}

export default Register;
