import React, { Component } from 'react'

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
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
        let {email, password} = this.state
        let err = {}
        if(email === '' || password === ''){
            err.password = password === '';
            err.email = email === '';
        }
        this.setState({
            errors: err
        })

    }

  render() {
      const {email, password, errors} = this.state;
    return (
      <div className="register">
        <h1 className="title">Login</h1>
        <form action="">
            <input type="email" name="email" className={`form email ${errors.email === true ? 'error' : ''}`} placeholder="Email*" value={email} onChange={this.handleChange} />
            <input type="password" name="password" className={`form password ${errors.password === true ? 'error' : ''}`} placeholder="Password*" value={password} onChange={this.handleChange} />
            <input type="button" className="submit" value='LOG IN' onClick={this.handleClick}/>
        </form>
      </div>
    )
  }
}

export default Login;