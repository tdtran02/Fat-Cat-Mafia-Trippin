import React, { Component } from 'react';


class Footer extends Component {
  render() {
    return (

      <footer style={{
        backgroundColor: '#4a7199',
        height: "150px",
        display: "flex",
        justifyContent: "space-around"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: "0.4"
        }}>
          <h3 style={{ textShadow: "2px 2px black", color: "rgb(230,250,230)" }}>TRIPPIN</h3>
          <p>a project by</p>
          <h5 style={{ color: "rgb(200,200,200)", textShadow: "2px 2px black" }}>FAT CAT MAFIA</h5>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h5 style={{
            textShadow: "0.5px 0.5px rgb(200,200,200)"
          }}>THE TEAM</h5>
          <div style={{
            width: "300px",
            display: "flex",
            height: "80px"
          }}>
            <div style={{
              width: "145px",
              float: "left",
              textAlign: "right",
              lineHeight: "0.2",
              color: "rgb(230,250,230)",
              textShadow: "1px 1px black"
            }}>
              <p>melanie</p>
              <p>david</p>
              <p>sopheak</p>
              <p>xinbei</p>
              <p>thuy</p>
            </div >

            <div style={{
              width: "145px",
              marginLeft: "10px",
              textAlign: "left",
              lineHeight: "0.2",
              color: "rgb(200,200,200)",
              textShadow: "1px 1px black"
            }}>
              <p>goncalves</p>
              <p>li</p>
              <p>ko</p>
              <p>shen</p>
              <p>tran</p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h5 style={{
            textShadow: "0.5px 0.5px rgb(200,200,200)"
          }}>SUPPORT</h5>
          <p>FAQ</p>
          <p>CONTACT</p>
        </div>

        {/* <p>Support <br /> trippinwebapp@gmail.com</p> */}

      </footer>

    );
  }
}

export default Footer;
