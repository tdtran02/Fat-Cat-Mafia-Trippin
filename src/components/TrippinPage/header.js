import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
     
      <header>
        <div className="head">
            <h1>We Design,< br/>You Travel</h1>
            <div>
              <p>Integer posuere leo non erat ornare dictum id vitae magna. Proin consectetur iaculis nisi, ut convallis tortor tempor congue. Curabitur sit amet tempus felis. Duis tellus eros, pellentesque at rhoncus eu, maximus ut diam.</p>
              <div><a className="contact" href="#">Get Started</a></div>
            </div>
        </div>
       
      </header>
      
    );
  }
}

export default Header;
