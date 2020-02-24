import React, { Component } from "react";

export class ValidateEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
          email: '',
          pattern: /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z]*@[0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
          password: ''
        };
    
        this.handleEmail = this.handleEmail.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
      }
    
      handleEmail(event) {
        const value = event.target.value;
        this.setState({email: value});
      }

      handlePassword(event) {
        const value = event.target.value;
        this.setState({password: value});
      }
    
      handleChange(event) {
        if (this.state.pattern.test(this.state.email)){
          this.sendEmail();
        }
        else{
          alert("Please enter correct email format.");
        }
        if (this.state.password !== null){
          alert("Password: " + this.state.password);
        }
        else{
          alert("Enter password.");
        }
        event.preventDefault();
        
      }

      sendEmail(event) {
        alert(this.state.email + ' is valid');

      }

    
      render() {
        return (
          <form onSubmit={this.handleChange}>
            <div>
              <label>
                <input type="email" placeholder="Email *" value={this.state.email} onChange={this.handleEmail}/>
              </label>
              <label>
                <input type="password" placeholder="Password *" value={this.state.password} onChange={this.handlePassword}/>
              </label>
                <input type="submit" value="Validate" onChange={this.handleChange}/>
            </div>
          
          </form>
        );
      }
    
}

export default ValidateEmail;
