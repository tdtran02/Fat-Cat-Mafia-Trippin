import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import PropTypes from 'prop-types';
import queryString from 'query-string';
//import { HashRouter, Route } from 'react-router-dom';
//import axios from 'axios';
//import TextField from '@material-ui/core/TextField';
import { Button, ButtonToolbar } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "../styles/ResetPassword.css"
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
      email: '',
      password: '',
      updated: false,
      isLoading: true,
      error: false,
      token: this.props.match.params.token,
    };
    console.log(this.props.match.params.token)
  }
  // <Router>
  //   <App>
  //       <Switch>
  //               <Route exact path='/resetPassword/:param' component={ResetPassword} />
  //       </Switch>         
  //   </App>
  // </Router>
  //<Route exact path='/resetPassword/:param' component={Data} />
  componentDidMount() {
    //const token = queryString.parse(this.props.location.search);
    //<Route path="/resetPassword/:token" /> 
    //const token = this.props.match.params.token;
    //console.log(this.props.match.params.token);
    // const {
    //   match: {
    //     params: { token },
    //   },
    // } = this.props;
    // try {
    //   const response = await 
      // AXIOS.get('http://localhost:4000/resetPassword', {
      //   params: {
      //     resetPasswordToken: this.token,
      //   },
      // }).then(response =>{
    console.log(this.state.token)
    AXIOS.get('http://localhost:4000/resetPassword/'+this.state.token)
    .then(response =>{
        console.log(response);
      if (response.data.message === "Password reset link is ok") {
        this.setState({
          email: response.data.email,
          updated: false,
          isLoading: false,
          error: false,
        });
      }else{
      //console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true,
      });
    }
  }).catch(error =>{
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
    // const { username, password } = this.state;
    // const {
    //   match: {
    //     params: { token },
    //   },
    // } = this.props;
    // try {
    //   const response = await 
      AXIOS.put(
        "http://localhost:4000/updatePasswordViaEmail",
        {
          email: this.state.email,
          password: this.state.password,
          resetPasswordToken: this.state.token
          //resetPasswordToken: token,
        }).then(response =>{
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
    }). catch (error => {
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
      <div>
        <div className ="restPassword">
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
                        require/>
                      
                    </div>
                    <button
                      value="update"
                      type="submit"
                      className="btn btn-success btn-block shadow border-0 py-2 text-uppercase "
                    >
                      Reset
                    </button>
                  </div>
               </div>
            </div>
            </div>
          </form>
        </div>
      
        {updated && (
          <div>
            <p>
              Your password has been successfully reset, please try logging in
              again.
            </p>
            <ButtonToolbar>
                <Button
                    //buttonStyle={loginButton}
                    buttontext="Login"
                    link="/login">
                </Button>
            </ButtonToolbar>
          </div>
        )}
        <ButtonToolbar> 
            <Button buttontext="Go Home" 
            //buttonStyle={homeButton} 
            link="/">
            </Button>
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