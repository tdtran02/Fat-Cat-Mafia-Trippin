import React, { Component } from "react";
import "../styles/MyAccount.css";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { EditPhotoModal } from './EditPhotoModal';
/* import Profile from './images/profilepic.png';
import Profile1 from './images/profile1.jpg';
import Profile2 from './images/profile2.jpg';
import Profile3 from './images/profile3.jpg';
import Profile4 from './images/profile4.jpg';
import Profile5 from './images/profile5.jpg';
import Profile6 from './images/profile6.jpg';
import Profile7 from './images/profile7.jpg';
import Profile8 from './images/profile8.jpg';
import Profile9 from './images/profile9.jpg';
import Profile10 from './images/profile10.jpg'; */

const AXIOS = require("axios").default;

/* function ChangePhoto() {
  function handleClick(e) {

    e.preventDefault();
    document.getElementById("profile-pic-myA").src = { Profile10 };
    console.log();
  }

} */

export class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editPhotoShow: false,
      option: '2',
      image: JSON.parse(localStorage.getItem('user')).image,
      id: "",
      email: "",
      first_name: "",
      last_name: "",
      __v: "",

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Click = this.onChange.bind(this);

    if (JSON.parse(localStorage.getItem('user')).image == null) {

      this.state = {
        image: "./images/profilepic.png"
      };
    }

  };
  componentDidMount() {
    //  console.log(this.state.user.email);
    AXIOS.get('http://localhost:4000/user/' + JSON.parse(localStorage.getItem('user'))._id)
      .then(response => {
        console.log(response.data.user.email);
        this.setState({ email: response.data.user.email });
        this.setState({ first_name: response.data.user.first_name });
        this.setState({ last_name: response.data.user.last_name });
        this.setState({ __v: response.data.user.__v });
        console.log(this.state.first_name);
      })
      .catch(function (error) {
        console.log(error);
      })

  };

  onChange(event) {
    console.log(this.state.first_name)
    console.log(event.target.value)
    this.setState({ first_name: event.target.value });
  };

  handleSubmit(e) {

    console.log("teestinggg");
    var x = document.getElementById("myA-inputname").value;
    console.log(x);

    this.setState({ __v: this.state.__v++ });

    const update = {
      user: {
        _id: JSON.parse(localStorage.getItem('user'))._id,
        //    email: JSON.parse(localStorage.getItem('user')).email,
        first_name: x,
        last_name: JSON.parse(localStorage.getItem('user')).last_name,
        //    password: JSON.parse(localStorage.getItem('user')).password,
        image: "./images/profilepic6.jpg",
        __v: this.state.__v
      }

    }
    console.log(JSON.stringify(update));
    AXIOS.put('http://localhost:4000/user/' + JSON.parse(localStorage.getItem('user'))._id, update)
      .then(res => console.log(res.data))
      .catch(err => { console.log(err) });
    e.preventDefault();
  }


  render() {
    let editModalClose = () => this.setState({ editPhotoShow: false });

    return (
      <div>


        <div className='content-container'>
          <div className='content-grid-myA'>
            <div className=' main-myA'>
              <div className="profile-container-myA">
                <div className="profile-pic-buffer-myA">
                  <div className="profilepic">
                    <img className="responsive" id="profile-pic-myA" src={require(`${this.state.image}`)} alt="city" width="100" height="80" />
                  </div>
                  <div className="edit-pic">
                    <ButtonToolbar>
                      <Button variant="primary" onClick={() => this.setState({ editPhotoShow: true, option: '3' })}>
                        Change Photo
                      </Button>
                      <EditPhotoModal
                        show={this.state.editPhotoShow}
                        onHide={editModalClose}
                        handler={this.handler}
                      />
                    </ButtonToolbar>
                  </div>
                </div>
                <div className="buffer"></div>
                <div className="profile-text-buffer">
                  <div className="profile-text">
                    <form id="update" onSubmit={this.handleSubmit}>
                      <label htmlFor="full-name">NAME</label>
                      <input type="text" className="myA" id="myA-inputname" />
                      {/* <button>UPDATE</button> */}

                      {/*  <label htmlFor="email">EMAIL</label>
                    <input type="text" className="myA" /> */}
                      {/* <button>UPDATE</button> */}


                      {/* <div className="phone">
                        <label htmlFor="telNo">PHONE NUMBER </label>
                        <input id="telNo" name="telNo" type="tel" required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="XXX-XXX-XXXX"></input>
                        <span className="validity"></span>
                      </div> */}
                      <div>
                        <button >UPDATE</button>
                      </div>
                    </form>
                    {/* <div className="container-form">
                      <div className="panel panel-primary">
                        <div className="panel-heading">
                          <h3 className="panel-title">Address</h3>
                        </div>
                        <div className="panel-body">
                          <input id="autocomplete" placeholder="Enter your address" onFocus="geolocate()" type="text" className="form-control"></input>
                          <br></br>
                          <div id="address">
                            <div className="row">
                              <div className="col-md-6">
                                <label className="control-label">Street Address</label>
                                <input className="form-control" id="stress_number" placeholder="Enter your street number and street name"></input>
                              </div>
                              <div className="col-md-6">
                                <label className="control-label">Apt Number</label>
                                <input className="form-control" id="apt_number" placeholder="Enter your Apartment number"></input>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <label className="control-label">City</label>
                                <input className="form-control field" id="locality" placeholder="Enter your city"></input>
                              </div>
                              <div className="col-md-6">
                                <label className="control-label">State</label>
                                <input className="form-control" id="administrative_area_level_1" placeholder="Enter your State"></input>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <label className="cotrol-label">Zip Code</label>
                                <input className="form-control" id="postal_code" placeholder="Enter your Zip Code"></input>
                              </div>
                              <div className="col-md-6">
                                <label className="control-label">Country</label>
                                <input className="form-control" id="country" placeholder="Enter your country"></input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="submit-btn">
                        <button>SUBMIT CHANGES</button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*     <div className="container-form">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">TRAVEL</h3>
            </div>
            <div className="panel-body">
              <br></br>
              <div id="location">
                <div className="row">
                  <div className="col-md-6">
                    <label className="control-label">Departure</label>
                    <input className="form-control" id="departue_location" placeholder="City Country Depart"></input>
                  </div>
                  <div className="col-md-6">
                    <label className="control-label">Arrival</label>
                    <input className="form-control" id="arrival_location" placeholder="City Country Arrive"></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <form>
                      <label htmlFor="control-label">Start Date
                        <input className="form-control" type="date" name="start-day" min="2020-02-10" max="2022-02-10" required></input>
                        <span className="validity"></span>
                      </label>
                    </form>
                  </div>
                  <div className="col-md-6">
                    <form>
                      <label htmlFor="control-label">End Date
                        <input className="form-control" type="date" name="end-day" min="2020-02-11" max="2022-02-11" required></input>
                        <span className="validity"></span>
                      </label>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk&libraries=places&callback=initAutocomplete" async defer></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossOrigin="anonymous"></script>
        <script src="auto-complete.js"></script>
      </div>
    );
  }
}

/* var modal = document.getElementById("myModal");
var btn = document.getElementById("trigger");
var span = document.getElementByClassName("close")[0];
 
btn.onclick = function () {
      modal.style.display = "block";
  }
  
span.onclick = function () {
      modal.style.display = "none";
  }
  
window.onclick = function (event) {
if (event.target == modal) {
      modal.style.display = "none";
  }
} */


export default MyAccount;

