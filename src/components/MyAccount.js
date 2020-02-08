import React, { Component } from "react";
import "../styles/MyAccount.css";
// Profile
// Trip
// Recommendation
// Setting
// Sign out


export class MyAccount extends Component {
  render() {
    return (
      <body>


        <div class='content-container'>
          <div class='content-grid'>
            <div class=' main'>
              <div class="profile-container">
                <div class="profile-pic-buffer">
                  <div class="profilepic">
                    <img src={require("./images/profilepic.png")} alt="city" width="100" height="80" />
                  </div>
                  <div class="edit-pic">
                    <button class="trigger">CHANGE PHOTO</button>
                    <div class="modal">
                      <div class="modal-content" >
                        <span class="close-button">&times;</span>
                        <h1>Hello!</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="buffer"></div>
                <div class="profile-text-buffer">


                  <div class="profile-text">
                    <label for="full-name">NAME</label>
                    <input type="text" />
                    <button>UPDATE</button>
                  </div>
                </div>
              </div>

            </div>
            <div class='side-pic-container'>
              <img class="side-pic" src={require("./images/city.png")} alt="city" width="100" height="80" />
            </div>


          </div>
        </div>
      </body>
    );
  }
}
export default MyAccount;
