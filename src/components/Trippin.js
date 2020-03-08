import React, { Component } from 'react';

import Header from "./TrippinPage/header";
import Main from "./TrippinPage/main";
import Footer from "./TrippinPage/footer";


class Trippin extends Component {
  render() {
    return (
      <div className="container" >

        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default Trippin;