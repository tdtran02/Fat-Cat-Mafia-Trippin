import React, { Component } from 'react';

class Register extends Component {

    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleClick(e){
        e.preventDefault();
        let {firstName, lastName, email, password} = this.state
        let err = {}
        if(firstName === '' || lastName === '' || email === '' || password === ''){
            err.firstName = firstName === '';
            err.lastName = lastName === '';
            err.password = password === '';
            err.email = email === '';
        }
        this.setState({
            errors: err
        })

    }

  render() {
      const {firstName, lastName, email, password, errors} = this.state;
    return (
      <div className="register">
        <h1 className="title">Register</h1>
        <form action="">
            <div>
                <input type="text" name="firstName"  className={`form name ${errors.firstName === true ? 'error' : ''}`} placeholder="First Name*" value={firstName} onChange={this.handleChange}/>
                <input type="text" name="lastName" className={`form name ${errors.lastName === true ? 'error' : ''}`} placeholder="Last Name*" value={lastName} onChange={this.handleChange} />
            </div>
            <input type="email" name="email" className={`form email ${errors.email === true ? 'error' : ''}`} placeholder="Email*" value={email} onChange={this.handleChange} />
            <input type="password" name="password" className={`form password ${errors.password === true ? 'error' : ''}`} placeholder="Password*" value={password} onChange={this.handleChange} />
            <input type="button" className="submit" value='GET STARTED' onClick={this.handleClick}/>
        </form>
      </div>
    )
  }
}

export default Register;