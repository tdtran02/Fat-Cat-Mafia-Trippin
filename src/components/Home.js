import React, { Component } from "react";
import "../styles/Home.css";
import MyAccount from "./MyAccount.js";
import Trip from "./Trip.js";
import ProfilePicture from './ProfilePicture';
import {
  Alert,
  Button,
  Card,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { element } from "prop-types";
const AXIOS = require("axios").default;

let profilePicPath = localStorage.getItem("user");

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      first_name: "",
      last_name: "",
      image: './images/empty.jpg',
      _v: "",
      hometown: "",
      trip: null,
      trip_id: "",
      trip_number: null,
      trip_list: [],
      invite: null,
      invitation_list: [],
      showInvitations: false,
    };

    if (JSON.parse(localStorage.getItem("user")).image == null) {
      this.state = {
        image: "./images/profilepic.png",
      };
    }
  }
  componentDidMount() {
    //  console.log(this.state.user.email);
    AXIOS.get(
      "http://localhost:4000/user/" +
      JSON.parse(localStorage.getItem("user"))._id
    )
      .then((response) => {
        console.log(response.data.user.email);
        this.setState({ email: response.data.user.email });
        this.setState({ first_name: response.data.user.first_name });
        this.setState({ last_name: response.data.user.last_name });
        if (response.data.user.image != null) {
          this.setState({ image: response.data.user.image });
        }

        if (response.data.user.hometown != null) {
          this.setState({ hometown: response.data.user.hometown });
        }
        console.log(JSON.stringify(this.state.user));
        console.log(this.state.hometown);
      })
      .catch(function (error) {
        console.log(error);
      });

    AXIOS.get(
      "http://localhost:4000/trip/" +
      JSON.parse(localStorage.getItem("user"))._id
    ).then((response) => {
      console.log(response);
      this.setState({ trip: response.data.trip });
      this.setState({
        trip_list: this.createList(response.data.trip),
      });
    });

    AXIOS.get(
      "http://localhost:4000/buddypending/" +
      JSON.parse(localStorage.getItem("user"))._id
    ).then((res) => {
      console.log(res);
      this.setState({ invite: res.data.tripbuddy });
      this.setState({
        invitation_list: this.createInvitations(res.data.tripbuddy),
      });
    });
  }
  onDeleteFieldClick(e, i) {
    //console.log(i);
    const OneTrip = this.state.trip[i];
    // console.log(OneTrip);
    // console.log(this.state.trip[i]);
    // console.log(JSON.parse(localStorage.getItem('user')))
    const USER_ID = JSON.parse(localStorage.getItem("user"))._id;
    console.log(USER_ID);
    AXIOS.delete("http://localhost:4000/trip/" + OneTrip._id)
      .then((res) => {
        console.log(res);
        this.setState({ trip: res.data.trip });
        this.setState({
          trip_list: this.createList(res.data.trip),
        });
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
      });

    AXIOS.delete("http://localhost:4000/buddy/" + OneTrip._id)
      .then((res) => { })
      .catch((err) => {
        console.log(err);
      });
  }

  updateLocalTrip(e, i) {
    console.log(i);
    localStorage.setItem("trip", JSON.stringify(i));
    window.location = "/trip/" + i._id;
  }

  updateLocalTripInvite(e, i) {
    AXIOS.get("http://localhost:4000/tripid/" + i.trip_id)
      .then((res) => {
        console.log(res.data.trip[0]);
        localStorage.setItem("trip", JSON.stringify(res.data.trip[0]));
        window.location = "/trip/" + i.trip_id;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserEmail(i) {
    AXIOS.get("http://localhost:4000/user/" + i.owner_id)
      .then((res) => {
        console.log(res.data.user.email);
        return res.data.user.email;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createInvitations(list) {
    let elements = [];
    let trip = {};
    for (let i = 0; i < list.length; i++) {
      console.log(list[i].trip_id);
      if (list[i].pending == true) {
        this.setState({ status: "PENDING" });
      } else {
        if (list[i].accepted == true) {
          this.setState({ status: "ACCEPTED" });
        } else {
          this.setState({ status: "DECLINED" });
        }
      }

      if (list[i].denied == false) {
        elements.push(
          <div className="col-md-3 col-sm-6" key={i}>
            <Card style={{ minWidth: "150px" }}>
              <Card.Header as="h5">
                <Button
                  onClick={(e) => {
                    this.updateLocalTripInvite(e, list[i]);
                  }}
                  id="linkbtn"
                  className="trip-fonts"
                  style={{
                    textDecoration: "none",
                    backgroundColor: "transparent",
                    border: "none",
                    borderRadius: "20px",
                    color: "black",
                  }}
                >
                  {list[i].trip_name}
                </Button>
              </Card.Header>
              <Card.Body>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "10px",
                  }}
                >
                  <label style={{ margin: "auto" }}>
                    <strong>FROM: </strong>
                  </label>
                  <div style={{ display: "flex" }}>
                    <label style={{ margin: "auto" }}>
                      {list[i].owner_first_name}
                    </label>
                    <label style={{ margin: "auto" }}>
                      {list[i].owner_last_name}
                    </label>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ margin: "auto" }}>
                    <strong>STATUS: </strong>
                  </label>
                  <label style={{ margin: "auto" }}>{this.state.status}</label>
                </div>
                <Button
                  variant="info"
                  onClick={(e) => {
                    this.updateLocalTripInvite(e, list[i]);
                  }}
                  style={{ display: "block", margin: "20px auto 0 auto" }}
                >
                  VIEW
                </Button>
              </Card.Body>
            </Card>
            <div
              className="trip-card"
              style={{
                margin: "10px 10px 10px 10px",
              }}
            ></div>
          </div>
        );
      }
    }
    if (elements.length > 0) {
      this.setState({ showInvitations: true });
    }
    return elements;
  }

  createList(list) {
    let elements = [];
    const date_mark = new Date();
    date_mark.setDate(date_mark.getDate() + 7);
    let once = false;
    let twice = false;

    let temp = [];
    for (let i = 0; i < list.length; i++) {
      if (once != true && date_mark < new Date(list[i].start_date)) {
        elements.push(
          <div className="container" key="once">
            <h3>Upcoming Week</h3>
            <div className="row">{temp}</div>
          </div>
        );
        date_mark.setDate(date_mark.getDate() + 21);
        once = true;
        temp = [];
      }
      if (
        once == true &&
        twice != true &&
        date_mark < new Date(list[i].start_date)
      ) {
        elements.push(
          <div className="container" key="twice">
            <h3 className="trip_dates"> Within a Month</h3>
            <div className="row">{temp}</div>
          </div>
        );
        twice = true;
        temp = [];
      }
      temp.push(
        <div className="col-md-4 col-sm-6" key={i}>
          <Card style={{ border: "2px solid gray" }}>
            <Card.Img
              variant="top"
              style={{ border: "2px solid gray" }}
              src={require("./images/trip_profile_photo.png")}
            />
            <Card.Title as="h5">
              <Button
                id="linkbtn"
                onClick={(e) => {
                  this.updateLocalTrip(e, list[i]);
                }}
                className="trip-fonts"
                style={{
                  textDecoration: "none",
                  backgroundColor: "transparent",
                  border: "none",
                  borderRadius: "20px",
                  color: "black",
                }}
              >
                {list[i].trip_name}
              </Button>
            </Card.Title>
            <Card.Body>
              <p className="trip_destination">{list[i].destination}</p>
              <div
                className="trip-deletion"
                style={{ paddingBottom: "10px" }}
              ></div>
            </Card.Body>
            <Card.Footer>
              <Button
                variant="info"
                onClick={(e) => {
                  this.updateLocalTrip(e, list[i]);
                }}
                style={{ margin: "10px auto" }}
              >
                VIEW
              </Button>
              <Button
                variant="warning"
                style={{ margin: "10px 5px" }}
                onClick={(e) => {
                  this.onDeleteFieldClick(e, i);
                }}
              >
                Delete
              </Button>
            </Card.Footer>
          </Card>
        </div>
      );
    }
    if (list.length < 4) {
      for (let i = 0; i < 4 - list.length - 1; i++) {
        elements.push(
          <div
            className="col-md-3 col-sm-6"
            style={{ minWidth: "200px" }}
            key={4 - i}
          ></div>
        );
      }
    }
    if (once == false) {
      elements.push(
        <div className="container" key="once">
          <h3>Upcoming Week</h3>
          <div className="row">{temp}</div>
        </div>
      );
    } else if (twice == false) {
      elements.push(
        <div className="container" key="twice">
          <h3 className="trip_dates">Within a Month</h3>
          <div className="row">{temp}</div>
        </div>
      );
    } else if (twice == true && once == true && temp.length != 0) {
      elements.push(
        <div className="container" key="third">
          <h3 className="trip_dates">Rest of My Upcoming Trips</h3>
          <div className="row">{temp}</div>
        </div>
      );
    }
    return elements;
  }
  render() {
    const img = this.state.image;
    return (
      <div
        className="image-container"
        style={{
          height: "91.7%",
          backgroundImage:
            "url(https://wallpaperscute.com/wp-content/uploads/2019/05/Sunset-Wallpaper-For-Desktop.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          overflow: "auto",
          display: "flex",
        }}
      >
        <div style={{ height: "100%", display: "flex", width: "100%" }}>
          <Card
            style={{
              height: "60%",
              margin: "3%",
              borderRadius: "5px",
              border: "2px solid gray",
              boxSizing: "border-box",
              borderRadius: "20px",
              boxShadow: "8px 8px 50px #000",
              color: "#6c757d",
            }}
          >
            <Card.Body>
              <div style={{ display: "flex", alignContent: "center" }}>
                <img
                  alt="profile"
                  className="responsive"
                  src={require(`${img}`)}

                  style={{
                    display: "block",
                    margin: "5px auto",
                    width: "150px",
                    border: "1px solid black"
                  }}
                />
                {/* <ProfilePicture /> */}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    margin: "5px auto",
                  }}
                >
                  <label
                    id="same-line"
                    style={{
                      marginRight: "5px",
                    }}
                  >
                    <strong>NAME: </strong>
                  </label>
                  <label>{`  ${this.state.first_name}  ${this.state.last_name}`}</label>
                </div>
                <div
                  style={{
                    margin: "5px auto",
                  }}
                >
                  <label
                    id="same-line"
                    style={{
                      marginRight: "5px",
                    }}
                  >
                    <strong>HOMETOWN: </strong>
                  </label>
                  <label>{`${this.state.hometown}`}</label>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <Button
                  style={{ margin: "5px 5px" }}
                  variant="outline-success"
                  id="home-btns"
                  href="/Friends"
                >
                  VIEW FRIENDS
                </Button>
                <Button
                  style={{ margin: "5px 5px" }}
                  variant="outline-primary"
                  id="home-btns"
                  href="/Trip"
                >
                  CREATE A TRIP
                </Button>
              </div>
            </Card.Body>
          </Card>
          <div
            style={{
              disply: "flex",
              flexDirection: "column",
              marginTop: "3%",
              width: "50%",
            }}
          >
            <Alert show={this.state.showInvitations}>
              <Card
                style={{
                  margin: "3%",
                  borderRadius: "5px",
                  border: "2px solid gray",
                  boxSizing: "border-box",
                  borderRadius: "20px",
                  boxShadow: "8px 8px 50px #000",
                  color: "#6c757d",
                }}
              >
                <Card.Header as="h3" style={{ padding: "10px" }}>
                  TRIP INVITATIONS
                </Card.Header>
                <Card.Body>
                  <div className="row">{this.state.invitation_list}</div>
                </Card.Body>
              </Card>
            </Alert>
            <Card
              style={{
                margin: "3%",
                borderRadius: "5px",
                border: "2px solid gray",
                boxSizing: "border-box",
                borderRadius: "20px",
                boxShadow: "8px 8px 50px #000",
                color: "#6c757d",
              }}
            >
              <Card.Header as="h3" style={{ padding: "10px" }}>
                TRIPS
              </Card.Header>
              <Card.Body>
                {/* <div className="row">{this.state.trip_list}</div> */}
                {this.state.trip_list}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
