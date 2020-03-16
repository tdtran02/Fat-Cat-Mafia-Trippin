import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { Button, ButtonToolbar } from 'react-bootstrap';
//import TextField from '@material-ui/core/TextField';
const AXIOS = require("axios").default;

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      showError: false,
      messageFromServer: "",
      showNullError: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    if (email === "") {
      this.setState({
        showError: false,
        messageFromServer: "",
        showNullError: true,
      });
    } else {
      try {
        const response = await AXIOS.post(
          'http://localhost:4000/forgotPassword',
          {
            email,
          },
        );
        console.log(response.data);
        if (response.data === "recovery email sent") {
          this.setState({
            showError: false,
            messageFromServer: "recovery email sent",
            showNullError: false,
          });
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === "email not in db") {
          this.setState({
            showError: true,
            messageFromServer: "",
            showNullError: false,
          });
        }
      }
    }
  };
 render() {
  return (
      <div>
        <div className="container h">
            <div className="row h justify-content-center align-items-center">
                <form className="profile-form" onSubmit={this.sendEmail}>
                    <div className="AppForm shadow-lg">
                        <div className="row">
                            <div className="col-md-6 d-flex justify-content-center align-items-center">
                                <div className="AppFormLeft">
                                    <h1>Forgot Password</h1>
                                    <input
                                        className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                                        type="email"
                                        placeholder="Email..."
                                        value={this.state.email}
                                        onChange={this.handleChange("email")}
                                        name="email"
                                        required
                                    />
                                    <button
                                        value="send"
                                        type="submit"
                                        className="btn btn-success btn-block shadow border-0 py-2 text-uppercase "
                                        >
                                        Send
                                    </button>
                                    <p className="text-center mt-5">
                                        Remember your password?
                                        <Link
                                            to="/login"
                                            style={{ color: "blue", marginLeft: "5px" }}
                                        >
                                            Go back to login
                                        </Link>
                                    </p>
                                    <p className="text-center mt-5">
                                        Don't have an account?
                                        <Link
                                            to="/register"
                                            style={{ color: "blue", marginLeft: "5px" }}
                                        >
                                            Create an account
                                        </Link>
                                    </p>
                                    {this.state.showNullError && (
                                        <div>
                                            <p>The email address cannot be null.</p>
                                        </div>
                                    )}
                                    {this.state.showError && (
                                        <div>
                                            <p>That email address isn&apos;t recognized. </p>
                                            <p>Please try again or register for a new account.</p>
                                        </div>
                                    )}
                                    {this.state.messageFromServer === "recovery email sent" && (
                                        <div>
                                            <h3>Password Reset Email Successfully Sent!</h3>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
                                    <h2 className="position-relative px-4 pb-3 mb-4">
                                    Don't worry
                                    </h2>
                                    <p>Give us your email, and receive a reset link!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
      </div>
    );
  }
}
export default ForgotPassword;