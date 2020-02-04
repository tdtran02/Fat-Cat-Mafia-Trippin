import React, { Component } from "react";

export class ValidateEmail extends Component {
  render() {
 //   var regexConst = new RegExp('^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z]*@[0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$')
    return (
        
        
        <html>
        <head> 
            <title>Text Box</title>
        </head>
            <body>
                <form action = " ">
                    <p>
                        <label>Enter email: 
                            <input type="email" myemail="myemail" id="email"></input>
                        </label>                

                        <button id="button">Validate Email</button>

                        
                
                </p>
                </form>

            </body>
        </html>
      
    
        
    );
  }
}

export default ValidateEmail;
