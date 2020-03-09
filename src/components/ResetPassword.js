import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import PropTypes from 'prop-types';
import queryString from 'query-string';
//import { HashRouter, Route } from 'react-router-dom';
//import axios from 'axios';
//import TextField from '@material-ui/core/TextField';
import { Button, ButtonToolbar } from 'react-bootstrap';
//import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const AXIOS = require("axios").default;

// import {
//   LinkButtons,
//   updateButton,
//   homeButton,
//   loginButton,
//   HeaderBar,
//   forgotButton,
//   inputStyle,
//   SubmitButtons,
// } from '../components';

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
      username: '',
      password: '',
      updated: false,
      isLoading: true,
      error: false,
    };
  }
  // <Router>
  //   <App>
  //       <Switch>
  //               <Route exact path='/resetPassword/:param' component={ResetPassword} />
  //       </Switch>         
  //   </App>
  // </Router>
  //<Route exact path='/resetPassword/:param' component={Data} />
  async componentDidMount() {
    const {
      match: {
        params: { token },
      },
    } = this.props;
    try {
      const response = await AXIOS.get('http://localhost:3003/resetPassword', {
        params: {
          resetPasswordToken: token,
        },
      });
      // console.log(response);
      if (response.data.message === 'password reset link a-ok') {
        this.setState({
          username: response.data.username,
          updated: false,
          isLoading: false,
          error: false,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true,
      });
    }
  }

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
                buttonText="Go Home"
                //buttonStyle={homeButton}
                link="/">
                
              </button>
            </ButtonToolbar>
            <ButtonToolbar>
                <button
                    //buttonStyle={forgotButton}
                    buttonText="Forgot Password?"
                    link="/forgotPassword">
                </button>
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
      <div>
        
        <form className="password-form" onSubmit={this.updatePassword}>
          <input
            //style={inputStyle}
            id="password"
            label="password"
            onChange={this.handleChange("password")}
            value={password}
            type="password"
          />
          <button
            //buttonStyle={updateButton}
            buttonText="Update Password">
          </button>
        </form>

        {updated && (
          <div>
            <p>
              Your password has been successfully reset, please try logging in
              again.
            </p>
            <ButtonToolbar>
                <button
                    //buttonStyle={loginButton}
                    buttonText="Login"
                    link="/login">
                </button>
            </ButtonToolbar>
          </div>
        )}
        <ButtonToolbar> 
            <button buttonText="Go Home" 
            //buttonStyle={homeButton} 
            link="/">
            </button>
         </ButtonToolbar>
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