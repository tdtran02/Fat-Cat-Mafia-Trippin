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

                    <label for="email">EMAIL</label>
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
        <form>
          <div class="phone">
            <label for="telNo">PHONE NUMBER </label>
            <input id="telNo" name="telNo" type="tel" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="XXX-XXX-XXXX"></input>
            <span class="validity"></span>
          </div>
          <div>
            <button>UPDATE</button>
          </div>
        </form>
        <div class="container">
          <div class="panel panel-primary">
            <div class="panel-heading">
              <h3 class="panel-title">Address</h3>
            </div>
            <div class="panel-body">
              <input id="autocomplete" placeholder="Enter your address" onFocus="geolocate()" type="text" class="form-control"></input>
              <br></br>
              <div id="address">
                <div class="row">
                  <div class="col-md-6">
                    <label class="control-label">Stress Address</label>
                    <input class="form-control" id="stress_number" placeholder="Enter your street number and street name"></input>
                  </div>
                  <div class="col-md-6">
                    <label class="control-label">Apt Number</label>
                    <input class="form-control" id="apt_number" placeholder="Enter your Apartment number"></input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label class="control-label">City</label>
                    <input class="form-control field" id="locality" placeholder="Enter your city"></input>
                  </div>
                  <div class="col-md-6">
                    <label class="control-label">State</label>
                    <input class="form-control" id="administrative_area_level_1" placeholder="Enter your State"></input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label class="cotrol-label">Zip Code</label>
                    <input class="form-control" id="postal_code" placeholder="Enter your Zip Code"></input>
                  </div>
                  <div class="col-md-6">
                    <label class="control-label">Country</label>
                    <input class="form-control" id="country" placeholder="Enter your country"></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk&libraries=places&callback=initAutocomplete" async defer></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous"></link>
        <script src="auto-complete.js"></script>
      </body>
    );
  }
}
export default MyAccount;

