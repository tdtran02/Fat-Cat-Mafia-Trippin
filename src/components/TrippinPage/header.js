import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header>
        <div className="head">
          <h1>
            We Design,
            <br /> You Travel
          </h1>
          <div>
            <p>
              We help you plan and schedule your perfect trip. So you can spend
              and enjoy your vacation time with friends and family
            </p>
            <div>
              <a className="contact" href="/home">
                Let's get started!
              </a>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
