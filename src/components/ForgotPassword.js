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
    if (email == "") {
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
        if (response.data == "recovery email sent") {
          this.setState({
            showError: false,
            messageFromServer: "recovery email sent",
            showNullError: false,
          });
        }
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data == 'email not in db') {
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
        <form className="profile-form" onSubmit={this.sendEmail}>
          <input
            //style={inputStyle}
            id="email"
            label="email"
            value={this.state.email}
            onChange={this.handleChange("email")}
            placeholder="Email Address"
          />
          <ButtonToolbar>
                <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                    style={{ backgroundColor: "transparent" }}
                  >
                    Send Password Reset Email
                 </button>
            </ButtonToolbar>
        </form>
        {this.state.showNullError && (
          <div>
            <p>The email address cannot be null.</p>
          </div>
        )}
        {this.state.showError && (
          <div>
            <p>
              That email address isn&apos;t recognized. Please try again or
              register for a new account.
            </p>
            <Link to="/register">Register</Link>
          </div>
        )}
        {this.state.messageFromServer == "recovery email sent" && (
          <div>
            <h3>Password Reset Email Successfully Sent!</h3>
          </div>
        )}
        <Link to="/login">Go back to login</Link>
      </div>
    );
  }
}
export default ForgotPassword;