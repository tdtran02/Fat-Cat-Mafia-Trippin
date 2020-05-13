import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
//import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { Button, ButtonToolbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "../styles/ResetPassword.css"
import { app } from '../utils/AxiosConfig';


const loading = {
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'Password Reset Screen',
};

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      updated: false,
      isLoading: true,
      error: false,
      token: this.props.match.params.token,
    };
    console.log(this.props.match.params.token)
  }
  componentDidMount() {
    console.log(this.state.token)
    app.get('resetPassword/' + this.state.token)
      .then(response => {
        console.log(response);
        if (response.data.message === "Password reset link is ok") {
          this.setState({
            email: response.data.email,
            updated: false,
            isLoading: false,
            error: false,
          });
        } else {
          this.setState({
            updated: false,
            isLoading: false,
            error: true,
          });
        }
      }).catch(error => {
        console.log(error.data);
      });
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = async (e) => {
    e.preventDefault();
    app.put(
      "updatePasswordViaEmail",
      {
        email: this.state.email,
        password: this.state.password,
        resetPasswordToken: this.state.token
      }).then(response => {
        console.log(response.data);
        if (response.data.message === "password updated") {
          this.setState({
            updated: true,
            error: false,
          });
        } else {
          this.setState({
            updated: false,
            error: true,
          });
        }
      }).catch(error => {
        console.log(error.response.data);
      });
  };

  render() {
    const {
      password, error, isLoading, updated
    } = this.state;

    if (error) {
      return (
        <div>
          <div style={loading}>
            <h4>Problem resetting password. Please send another reset link.</h4>
            <ButtonToolbar>
              <button
                buttontext="Go Home"
                //buttonStyle={homeButton}
                link="/">

              </button>
            </ButtonToolbar>
            <p className="text-center mt-5">
              Go Home
              <Link
                to="/"
                style={{ color: "blue", marginLeft: "5px" }}
              >
                Go Home
              </Link>
            </p>
            <ButtonToolbar>
              <Button
                //buttonStyle={forgotButton}
                buttontext="Forgot Password?"
                link="/forgotPassword">
              </Button>
            </ButtonToolbar>
          </div>
        </div>
      );
    }
    if (isLoading) {
      return (
        <div>
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    }
    return (
      <div className="container h">
        <div className="row h justify-content-center align-items-center">
          <form className="password-form" onSubmit={this.updatePassword}>
            <div className="AppForm shadow-lg">
              <div className="row">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                  <div className="AppFormLeft">
                    <h2> Reset Password</h2>
                    <div className="new-password">
                      <input
                        type="text"
                        placeholder="Password..."
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        name="password"
                        required />
                    </div>
                    <button
                      value="update"
                      type="submit"
                      className="btn btn-success btn-block shadow border-0 py-2 text-uppercase "
                    >
                      Reset
                    </button>
                    {updated && (
                      <div>
                        <p>Your password has been successfully reset.</p>
                        <p>Please try logging in again.</p>
                        <Link
                          to="/login"
                          style={{ color: "blue", marginLeft: "5px" }}
                        >
                          Go back to login
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
                    <h2 className="position-relative px-4 pb-3 mb-4">
                      Don't worry
                      </h2>
                    <p>Give us your new password, and then you can login with your new password</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
ResetPassword.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
  }),
};

export default ResetPassword;