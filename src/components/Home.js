import React, { Component } from "react";
import "../styles/Home.css";
import MyAccount from "./MyAccount.js";
import Trip from "./Trip.js";
import { ButtonToolbar, Button } from "react-bootstrap";
const AXIOS = require("axios").default;



let profilePicPath = localStorage.getItem("user");

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "",
      email: "",
      first_name: "",
      last_name: "",
      image: "./images/profilepic.png",
      _v: "",
      hometown: "",
      trip: null,
      trip_id: "",
      trip_number: null,
      trip_list: [],
      invite: null,
      invitation_list: []
    }

    if (JSON.parse(localStorage.getItem('user')).image == null) {

      this.state = {
        image: "./images/profilepic.png"
      }
    }


  }
  componentDidMount() {
    //  console.log(this.state.user.email);
    AXIOS.get('http://localhost:4000/user/' + JSON.parse(localStorage.getItem('user'))._id)
      .then(response => {
        console.log(response.data.user.email)
        this.setState({ email: response.data.user.email })
        this.setState({ first_name: response.data.user.first_name })
        this.setState({ last_name: response.data.user.last_name })
        if (response.data.user.image != null) {
          this.setState({ image: response.data.user.image });
        }

        if (response.data.user.hometown != null) {
          this.setState({ hometown: response.data.user.hometown })
        }
        console.log(JSON.stringify(this.state.user));
        console.log(this.state.hometown);
      })
      .catch(function (error) {
        console.log(error);
      })

    AXIOS.get("http://localhost:4000/trip/" + JSON.parse(localStorage.getItem('user'))._id)
      .then(response => {
        console.log(response);
        this.setState({ trip: response.data.trip });
        this.setState({
          trip_list: this.createList(response.data.trip)
        });
      });

    AXIOS.get("http://localhost:4000/buddypending/" + JSON.parse(localStorage.getItem('user'))._id)
      .then(res => {
        // console.log(res);
        this.setState({ invite: res.data.tripbuddy });
        this.setState({
          invitation_list: this.createInvitations(res.data.tripbuddy)
        });
      });
  }
  onDeleteFieldClick(e, i) {
    //console.log(i);
    const OneTrip = this.state.trip[i];
    // console.log(OneTrip);
    // console.log(this.state.trip[i]);
    // console.log(JSON.parse(localStorage.getItem('user')))
    const USER_ID = JSON.parse(localStorage.getItem('user'))._id;
    console.log(USER_ID)
    AXIOS.delete("http://localhost:4000/trip/" + OneTrip._id)
      .then(res => {
        console.log(res);
        this.setState({ trip: res.data.trip });
        this.setState({
          trip_list: this.createList(res.data.trip)
        });
        window.location.reload();
      })
      .catch(err => {
        console.error(err);
      })
  }

  updateLocalTrip(e, i) {
    console.log(i);
    localStorage.setItem('trip', JSON.stringify(i));
  }

  updateLocalTripInvite(e, i) {
    AXIOS.get('http://localhost:4000/tripid/' + i.trip_id)
      .then(res => {
        console.log(res.data.trip[0]);
        localStorage.setItem('trip', JSON.stringify(res.data.trip[0]));
        window.location = '/trip/' + i.trip_id;
      }).catch(err => {
        console.log(err);
      })
  }

  getUserEmail(i) {
    AXIOS.get('http://localhost:4000/user/' + i.owner_id)
      .then(res => {
        console.log(res.data.user.email)
        return res.data.user.email;
      }).catch(err => {
        console.log(err);
      })
  }

  createInvitations(list) {
    let elements = [];
    for (let i = 0; i < list.length; i++) {
      console.log(list[i].trip_id);
      AXIOS.get('http://localhost:4000/trip/' + list[i].trip_id)
        .then(response => {
          console.log(response);
          console.log(response.data.trip_name);
          this.setState({ tripname: response.data.trip_name });
        }).catch(err => {
          console.log(err);
        })

      if (list[i].pending == true) {
        this.setState({ status: "PENDING" });
      }
      else {
        if (list[i].accepted == true) {
          this.setState({ status: "ACCEPTED" });
        }
        else {
          this.setState({ status: "DECLINED" });
        }
      }


      elements.push(
        <div className="col-md-3 col-sm-6" key={i}>
          <div className="trip-card" style={{
            margin: "10px 10px 10px 10px"
          }}>

            <div className="card-info" style={{ width: "150px", border: "solid black 3px", backgroundColor: "gray", borderRadius: "20px" }}>


              <div className="trip-info" >

                <h5>
                  <Button onClick={e => { this.updateLocalTripInvite(e, list[i]) }} id="linkbtn" className="trip-fonts" style={{
                    textDecoration: "none",
                    backgroundColor: "transparent",
                    border: "none",
                    borderRadius: "20px",
                  }}>
                    Invitation
                  </Button>
                </h5>
                <p className="trip_destination">{this.state.tripname}</p>
                <p><strong>STATUS: </strong> {this.state.status}</p>
                <div className="trip-deletion" style={{ paddingBottom: "10px" }}>

                </div>
              </div>
            </div>
          </div>
        </div>

      )

    }
    return elements;
  }

  createList(list) {
    let elements = [];
    for (let i = 0; i < list.length; i++) {
      elements.push(
        <div className="col-md-3 col-sm-6" key={i}>
          <div className="trip-card" style={{
            margin: "0 10px 10px 10px"
          }}>
            {/*<div
              className="img-responsive cover"
              style={{
                height: "100px",
                width: "400px",
                backgroundColor: "#6495ED"
              }}
            ></div>*/}
            <div className="card-info" style={{ width: "150px", border: "solid black 3px", backgroundColor: "gray", borderRadius: "20px" }}>
              {list[i].image ? (
                <img
                  src={require(`${list[i].image}`)}
                  alt="trip"
                  className="trip-photo-lg"
                />
              ) : (
                  <a onClick={e => { this.updateLocalTrip(e, list[i]) }} href={`/trip/${list[i]._id}`}><img
                    src={require("./images/trip_profile_photo.png")}
                    width="120"
                    height="120"
                    alt="trip"
                    className="trip-photo-lg"

                    style={{ border: "solid black 1px", margin: "12px 0 0 12px" }}
                  /></a>
                )}

              <div className="trip-info" >

                <h5>
                  <Button id="linkbtn" onClick={e => { this.updateLocalTrip(e, list[i]) }} href={`/trip/${list[i]._id}`} className="trip-fonts" style={{
                    textDecoration: "none",
                    backgroundColor: "transparent",
                    border: "none",
                    borderRadius: "20px",
                  }}>
                    {list[i].trip_name}
                  </Button>
                </h5>
                <p className="trip_destination">{list[i].destination}</p>
                <div className="trip-deletion" style={{ paddingBottom: "10px" }}>
                  <Button className="ml-3" variant="info" style={{ marginLeft: "40px" }}
                    onClick={e => { this.onDeleteFieldClick(e, i); }}>
                    Delete
                    </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (list.length < 4) {
      for (let i = 0; i < 4 - list.length - 1; i++) {
        elements.push(
          <div
            className="col-md-3 col-sm-6"
            style={{ minWidth: "400px" }}
            key={4 - i}
          ></div>
        );
      }
    }
    return elements;
  }
  render() {
    return (
      <div>
        <div className="content-container">
          <div className="content-grid">
            <div className=" main">
              <div className="profile-container">
                <div className="profile-pic-buffer">
                  <div className="profilepic">
                    <img
                      className="responsive"
                      src={require(`${this.state.image}`)}
                      alt="city"
                      width="100"
                      height="80"
                    />
                  </div>
                </div>
                <div className="buffer"></div>
                <div className="profile-text-buffer">
                  <div className="edit-buffer">

                  </div>

                  <form className="profile-text">
                    <div className="fullName" >
                      <label id="same-line">NAME: </label>
                      <label>{`${this.state.first_name}`}

                      </label>
                      <label>{`${this.state.last_name}`}

                      </label>
                    </div>
                    <div className="hometown">
                      <label id="same-line">HOMETOWN: </label>
                      <label>{`${this.state.hometown}`}</label>
                    </div>


                    <div className="number-of-trips">Trips: 3</div>
                    <div className="view-friends-list">View Frends Lists</div>
                  </form>
                </div>
              </div>
              <div id="trips-container">
                <ButtonToolbar>
                  <Button variant="primary" id="home-btns" href="/Friends">VIEW FRIENDS</Button>
                  <Button variant="primary" id="home-btns" href="/Trip" >CREATE A TRIP</Button>
                </ButtonToolbar>
              </div>
              <div className="trip-invitations">
                <label>TRIP INVITATIONS</label>
                <div className="row">{this.state.invitation_list}</div>
              </div>
              <div className="trip-list">
                <label>YOUR TRIPS</label>
                <div className="row">{this.state.trip_list}</div>
              </div>
            </div>
            <div className="side-pic-container">
              <img
                className="responsive side-pic"
                src={require("./images/city.png")}
                alt="city"
                width="100"
                height="80"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
