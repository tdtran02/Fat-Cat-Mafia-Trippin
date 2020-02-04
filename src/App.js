import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loginButton: 'active',
      registerButton:'inactive'
    }
    this.changeClass = this.changeClass.bind(this);
  }

  changeClass(e){
    if(e.target.id === 'login'){
      this.setState({
        loginButton: 'active',
        registerButton:'inactive'
      })
    }else{
      this.setState({
        loginButton: 'inactive',
        registerButton:'active'
      })
    }
  }


  render() {
    const {loginButton, registerButton} = this.state;
    return (
      <div className="App">
      <div className="auth-block">
      <Router>

      <Link id="login" className={`btn ${loginButton}`} to="/login" onClick={this.changeClass}>Login</Link>
      <Link id="register" className={`btn ${registerButton}`} to="/register" onClick={this.changeClass}>Register</Link>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register} />
      </Router>
      </div>
      </div>
    );
  }
}

export default App;
