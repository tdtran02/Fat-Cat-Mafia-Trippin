import React, { Component } from "react";

export class ValidateEmail extends Component {
    ValEmail(e){
        let getEmail = document.getElementById("email");
        console.log("Email: " + getEmail);
    }

  render() {
 //   var regexConst = new RegExp('^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z]*@[0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$')
    return (
        <div>
                <form action = " ">
                    <p>
                        <label>Enter email: 
                            <input type="email" myemail="myemail" id="email"></input>
                        </label>                

                        <button id="button" onClick={this.ValEmail}>Validate Email</button>

                </p>
                </form>
        </div>
        
      
    
        
    );
  }
}

export default ValidateEmail;
