import React, { Component } from "react";

export class ValidateEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert(this.state.value + ' is valid.');
        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Enter email:
              <input type="email" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Validate" />
          </form>
        );
      }
    
}

export default ValidateEmail;
