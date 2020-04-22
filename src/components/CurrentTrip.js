import React, { Component } from "react";
import { Card, Form, ListGroup, Nav, Tab, Tabs, Toast } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../styles/Friends.css";
import "../styles/Trip.css";
//import AXIOS from "axios";
import InviteBuddy from "./InviteBuddy";
import InviteDriver from "./InviteDriver";
import { app } from "../utils/AxiosConfig";
class CurrentTrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trip_id: this.props.match.params.id,
      start: null,
      end: null,
      trip: {},
      posts: [],
      comment_id: "",
      user_id: "",
      comment: "",
      comment_date: "",
      user: {},

      show_drivers: false,
      all_candidates: [],
      candidates: [],
      all_drivers: [],
      drivers: [],
      all_driver_passengers: [],
      driver_passengers: [],
      driver_number: "0",
      inviteBuddyShow: false,
      options: [],
      pollValidated: false,

      email_success: false,
      show_email_notification: false,
    };
    this.savePoll = this.savePoll.bind(this);
  }

  componentDidMount() {
    app.get("tripid/" + this.state.trip_id).then((result) => {
      // if (result.data.trip.start_date != null)
      console.log(result.data);
      this.setState({ start: result.data.trip[0].start_date.substring(0, 10) });
      this.setState({ end: result.data.trip[0].end_date.substring(0, 10) });
      this.setState({ trip: result.data.trip[0] });
    });
    //get trip info
    app
      .get("comment/" + this.state.trip_id)
      .then((response) => {
        if (response !== "undefined") {
          this.setState({ comment_id: response.data.comment[0]._id });
          this.setState({ comment: response.data.comment[0].text });
          this.setState({ comment_date: response.data.comment[0].date });
          this.setState({ posts: this.createPostCards(response.data.comment) });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //check if any pending invitations
    app
      .get("buddy/" + this.state.trip_id)
      .then((respo) => {
        console.log("xd");
        console.log(respo);
        let invitations = respo.data.tripbuddy;
        console.log(invitations);
        this.getTripBuddies(invitations);
        console.log("XP");
        console.log(localStorage.getItem("user"));
        for (let i = 0; i < invitations.length; i++) {
          console.log(invitations[i].buddy_id);
          if (
            invitations[i].buddy_id ===
            JSON.parse(localStorage.getItem("user"))._id
          ) {
            console.log(invitations[i]);
            if (invitations[i].pending === true) {
              console.log("XDDDDD");
              console.log(invitations);
              this.setState({ invitation: this.createInvitation() });
              localStorage.setItem(
                "invitation",
                JSON.stringify(invitations[i])
              );
            }
          }
        }
        return app.get("user/" + this.state.trip.owner_id);
      })
      .then((response) => {
        console.log(response);
        this.setState({ organizer: this.getTripOrganizer(response.data.user) });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getTripOrganizer(user) {
    return (
      <Card style={{ margin: "0 auto", border: "transparent" }}>
        <Card.Body>
          <div>
            <img style={{ width: "50px" }} src={require(`${user.image}`)} />
          </div>
          <div>
            <strong>{user.first_name}</strong>
          </div>
        </Card.Body>
      </Card>
    );
  }

  getTripBuddies(buddyarray) {
    let buddycardarray = [];
    for (let i = 0; i < buddyarray.length; i++) {
      if (buddyarray[i].accepted == true) {
        let bpicture;
        if (buddyarray[i].buddy_picture == undefined) {
          bpicture = "./images/profile1.jpg";
        } else {
          bpicture = buddyarray[i].buddy_picture;
        }
        buddycardarray.push(
          <div key={i}>
            <Card style={{ margin: "0 auto", border: "transparent" }}>
              <Card.Body>
                <div>
                  <img style={{ width: "50px" }} src={require(`${bpicture}`)} />
                </div>
                <div>
                  <strong>{buddyarray[i].buddy_first_name}</strong>
                </div>
              </Card.Body>
            </Card>
          </div>
        );
      }
    }
    this.setState({ acceptedInvitations: buddycardarray });
    return buddycardarray;
  }

  createInvitation() {
    return (
      <Card
        style={{
          margin: "50px auto 0 auto",
          width: "500px",
          border: "3px solid gray",
          borderRadius: "20px",
        }}
      >
        <Card.Header>YOU'VE BEEN INVITED TO THIS AWESOME TRIP!</Card.Header>
        <Card.Body>
          <div
            style={{
              margin: "0 auto",
              display: "flex",
              alignContent: "center",
            }}
          >
            <Button
              style={{ marginRight: "20px" }}
              onClick={this.acceptInvitation}
              variant="primary"
            >
              ACCEPT
            </Button>
            <Button
              style={{ marginLeft: "20px" }}
              onClick={this.declineInvitation}
              variant="secondary"
            >
              DECLINE
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  acceptInvitation() {
    let buddyyy = JSON.parse(localStorage.getItem("invitation"));
    let newtripbuddy = {
      owner_id: buddyyy.owner_id,
      trip_id: buddyyy.trip_id,
      buddy_id: buddyyy._id,
      accepted: true,
      denied: false,
      pending: false,
    };
    console.log(newtripbuddy);
    app
      .put("buddypending/" + buddyyy._id, newtripbuddy)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });

    let buddies = JSON.parse(localStorage.getItem("trip")).buddies;
    buddies.push(buddyyy.buddy_id);
    let newtrip = {
      buddies: buddies,
    };
    console.log(buddies);

    app
      .put("trip/" + buddyyy.trip_id, newtrip)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/trip/" + JSON.parse(localStorage.getItem("trip"))._id;
  }

  declineInvitation() {
    let buddyyy = JSON.parse(localStorage.getItem("invitation"));
    let newtripbuddy = {
      owner_id: buddyyy.owner_id,
      trip_id: buddyyy.trip_id,
      buddy_id: buddyyy._id,
      accepted: false,
      denied: true,
      pending: false,
    };
    console.log(newtripbuddy);
    app
      .put("buddypending/" + buddyyy._id, newtripbuddy)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
    window.location = "/Home";
  }

  createPostCards(list) {
    let elements = [];
    for (let i = list.length - 1; i >= 0; i--) {
      this.setState({ secondaryComments: [] });
      let secondaryComments = [];
      console.log(i + ": " + list[i].commentsOnThisPost);
      if (list[i].commentsOnThisPost != "") {
        //secondaryComments = this.showCommentsOnPost(list[i].commentsOnThisPost);
        // console.log("*** " + secondaryComments.length);

        let commentlist = list[i].commentsOnThisPost;
        console.log(commentlist.length);
        for (let j = 0; j < commentlist.length; j++) {
          console.log("?/?/");
          let text = commentlist[j].text;
          if (commentlist[j].user_pic != null) {
            this.setState({ commentuserimg: commentlist[j].user_pic });
          } else {
            this.setState({ commentuserimg: "./images/profilepic.png" });
          }
          this.setState({ text: text });
          this.setState({ userfirstname: commentlist[j].first_name });
          secondaryComments.push(
            <div key={j}>
              <ListGroup.Item>
                <img
                  alt="?"
                  style={{
                    width: "25px",
                    height: "25px",
                    border: "1px solid black",
                  }}
                  src={require(`${this.state.commentuserimg}`)}
                />
                <strong> {this.state.userfirstname}: </strong> {this.state.text}
              </ListGroup.Item>
            </div>
          );
        }
        this.setState({ secondaryComments: secondaryComments });
      }

      elements.push(
        <div key={i}>
          <div
            className="post-card"
            style={{
              margin: "0 10px 10px 10px",
              backgroundColor: "white",
              borderRadius: "20px",
              margin: "15px 0",
              boxShadow: "8px 8px 50px #000",
              width: "90%",
            }}
          >
            {/*<div
              className="img-responsive cover"
              style={{
                height: "100px",
                width: "400px",
                backgroundColor: "#6495ED"
              }}
            ></div>*/}
            <Card
              style={{
                borderRadius: "20px",
                backgroundColor: "transparent",
              }}
            >
              <Card.Header
                as="h5"
                style={{
                  textTransform: "uppercase",
                }}
              >
                {" "}
                <img
                  src={require(`${list[i].user_pic}`)}
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "20px",
                  }}
                />
                {list[i].first_name}
              </Card.Header>

              <Card.Body>
                <p>{list[i].text}</p>
                <ListGroup>
                  <div>{this.state.secondaryComments}</div>
                </ListGroup>
              </Card.Body>
              <Card.Footer>
                <Form>
                  <Form.Control
                    id="secondary-comment"
                    as="textarea"
                    rows="1"
                    placeholder="Comment on post..."
                  ></Form.Control>
                  <Button
                    variant="outline-warning"
                    onClick={(e) => this.commentOnPost(e, list[i])}
                    style={{
                      float: "right",
                      marginTop: "10px",
                    }}
                  >
                    POST
                  </Button>
                </Form>
              </Card.Footer>
            </Card>
          </div>
        </div>
      );
    }

    return elements;
  }

  commentOnPost(e, i) {
    console.log(i._id);
    let trip = JSON.parse(localStorage.getItem("trip"));
    let postArr = [];
    const commentOnThisPost = {
      owner_id: JSON.parse(localStorage.getItem("user"))._id,
      first_name: JSON.parse(localStorage.getItem("user")).first_name,
      last_name: JSON.parse(localStorage.getItem("user")).last_name,
      user_pic: JSON.parse(localStorage.getItem("user")).image,
      text: document.getElementById("secondary-comment").value,
      date: Date.now(),
    };
    if (i.commentsOnThisPost == null) {
      postArr.push(commentOnThisPost);
    } else {
      postArr = i.commentsOnThisPost;
      postArr.push(commentOnThisPost);
    }

    let comment = {
      commentsOnThisPost: postArr,
    };
    console.log(JSON.stringify(comment));
    app
      .put("comment/" + i._id, comment)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    window.location = "/trip/" + JSON.parse(localStorage.getItem("trip"))._id;
    console.log(i);
  }

  showRecommendations = () => {
    console.log(this.state.trip_id);
    window.location = "/trip/" + this.state.trip_id + "/recommendations";
  };

  showSpendings = () => {
    window.location = "/trip/" + this.state.trip_id + "/spending";
  };

  getBuddyId() {
    //let self = this;
    app
      .get("useremail/" + document.getElementById("buddyemail").value)
      .then((response) => {
        let buddy = response.data.user;
        console.log(response);
        const buddyinfo = {
          owner_id: JSON.parse(localStorage.getItem("user"))._id,
          trip_id: this.state.trip_id,
          buddy_id: buddy._id,
          buddy_first_name: buddy.first_name,
          buddy_last_name: buddy.last_name,
          buddy_picture: buddy.image,
          accepted: false,
          denied: false,
          pending: true,
        };
        app
          .post("buddy", buddyinfo)
          .then((response) => {
            this.setState({ invitation_boolean: true });
            console.log(this.state.invitation_boolean);
            if (response.data.saved) {
              this.setState({
                invitation_sent: true,
                invitation_variant: "success",
                invitation_sent_msg: "Invitation was sent!",
              });
            } else {
              this.setState({
                invitation_variant: "warning",
                invitation_sent_msg: "Error occured",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addBuddy(buddyid) {
    const buddy = {
      owner_id: JSON.parse(localStorage.getItem("user"))._id,
      trip_id: this.state.trip_id,
      buddy_id: buddyid,
    };
    app
      .post("buddy", buddy)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
    //TODO: see if user and buddy are already friends
    // if they are, add friend to trip
    //send an invite to friend
  }

  postComment() {
    let trip = JSON.parse(localStorage.getItem("trip"));
    let postArr = [];
    if (trip.posts == null) {
      trip.posts = [document.getElementById("comment").value];
    } else {
      postArr = trip.posts;
      postArr.push(document.getElementById("comment").value);
    }

    const comment = {
      owner_id: JSON.parse(localStorage.getItem("user"))._id,
      first_name: JSON.parse(localStorage.getItem("user")).first_name,
      last_name: JSON.parse(localStorage.getItem("user")).last_name,
      user_pic: JSON.parse(localStorage.getItem("user")).image,
      trip_id: JSON.parse(localStorage.getItem("trip"))._id,
      text: document.getElementById("comment").value,
      date: Date.now(),
    };
    app
      .post("comment", comment)
      .then((res) => {
        this.setState({ addSurveyShow: true });
      })
      .catch((err) => {
        console.log(err);
      });
    window.location = "/trip/" + JSON.parse(localStorage.getItem("trip"))._id;
  }

  showDrivers = () => {
    // window.open("/trip/" + this.state.trip_id + "/drivers", "_blank");
    this.setState({ show_drivers: true });
    app
      .get("driver/friends/" + this.state.trip_id)
      .then((result) => {
        console.log(result.data);
        this.setState({ candidates: this.candidates(result.data.candidates) });
        return app.get("driver/" + this.state.trip_id);
      })
      .then((result) => {
        this.setState({ all_drivers: result.data.drivers });
        this.setState({ drivers: this.drivers(result.data.drivers) });
        this.setState({
          driver_passengers: this.passengers(result.data.drivers),
        });
      });
  };

  closeDrivers = () => {
    this.setState({ show_drivers: false });
  };

  updateModalContent() {
    app
      .get("driver/friends/" + this.state.trip_id)
      .then((result) => {
        this.setState({ candidates: this.candidates(result.data.candidates) });
        return app.get("driver/" + this.state.trip_id);
      })
      .then((result) => {
        this.setState({ all_drivers: result.data.drivers });
        this.setState({ drivers: this.drivers(result.data.drivers) });
        this.setState({
          driver_passengers: this.passengers(result.data.drivers),
        });
      });
  }

  candidates(list) {
    const elements = [];
    const httplist = [];
    let user = null;
    for (let i = 0; i < list.length; i++) {
      httplist.push(list[i].buddy_id);
    }
    app
      .post("user/getusersbylist", {
        list: httplist,
      })
      .then((r) => {
        this.setState({ all_candidates: r.data.users });
        for (let j = 0; j < r.data.users.length; j++) {
          user = r.data.users[j];
          if (user.image == null) {
            user.image = "./images/profilepic.png";
          }
          elements.push(
            <div
              style={{
                display: "flex",
                border: "1px solid black",
                borderRadius: "5px",
                margin: "5px",
                padding: "5px",
              }}
              key={j}
            >
              <img
                style={{ width: "50px" }}
                src={require(`${user.image}`)}
                alt="userimage"
              />
              <div style={{ margin: "15px 5px 0 15px" }}>{user.first_name}</div>
              <div style={{ margin: "15px 0" }}>{user.last_name}</div>
              <div
                style={{
                  marginLeft: "5px",
                  marginTop: "15px",
                  float: "right",
                  cursor: "pointer",
                }}
              >
                {" "}
                <i className="fas fa-car" onClick={() => this.addDriver(j)}></i>
              </div>
              <div
                style={{
                  marginLeft: "5px",
                  marginTop: "15px",
                  float: "right",
                  cursor: "pointer",
                }}
              >
                <i
                  className="fas fa-plus-circle"
                  onClick={() => this.addPassenger(j)}
                ></i>
              </div>
            </div>
          );
        }
      });

    return elements;
  }
  drivers(list) {
    const elements = [];
    const httplist = [];
    let user = null;
    for (let i = 0; i < list.length; i++) {
      httplist.push(list[i].driver_id);
    }
    app
      .post("user/getusersbylist", {
        list: httplist,
      })
      .then((r) => {
        this.setState({ all_drivers: r.data.users });
        for (let j = 0; j < r.data.users.length; j++) {
          user = r.data.users[j];
          if (user == null) continue;
          if (user.image == null) {
            user.image = "./images/profilepic.png";
          }
          elements.push(
            <Nav.Item key={j} onClick={() => this.changeDriverNumber(j)}>
              <Nav.Link
                eventKey={j.toString()}
                style={{
                  display: "flex",
                  border: "1px solid black",
                  borderRadius: "5px",
                  margin: "5px",
                  padding: "5px",
                }}
              >
                <img
                  style={{ width: "50px" }}
                  src={require(`${user.image}`)}
                  alt="userimage"
                />
                <div style={{ margin: "15px 5px 0 15px" }}>
                  {user.first_name}
                </div>
                <div style={{ margin: "15px 0" }}>{user.last_name}</div>
                <div
                  style={{
                    marginLeft: "5px",
                    marginTop: "15px",
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="fas fa-minus-circle"
                    onClick={() => this.removeDriver(j)}
                  ></i>
                </div>
              </Nav.Link>
            </Nav.Item>
          );
        }
      });
    return elements;
  }

  passengers(list) {
    const elements = [];
    for (let i = 0; i < list.length; i++) {
      const x = [];
      let user;
      for (let j = 0; j < list[i].passengers.length; j++) {
        if (list[i].passengers[j].passenger == undefined) continue;
        app.get("user/" + list[i].passengers[j].passenger).then((response) => {
          user = response.data.user;
          if (user.image == null) {
            user.image = "./images/profilepic.png";
          }
          x.push(
            <ListGroup.Item
              key={j}
              style={{
                display: "flex",
                border: "1px solid black",
                borderRadius: "5px",
                margin: "5px",
                padding: "5px",
              }}
            >
              <img
                style={{ width: "50px" }}
                src={require(`${user.image}`)}
                alt="userimage"
              />
              <div style={{ margin: "15px 5px 0 15px" }}>{user.first_name}</div>
              <div style={{ margin: "15px 0" }}>{user.last_name}</div>

              <div
                style={{
                  marginLeft: "5px",
                  marginTop: "15px",
                  cursor: "pointer",
                }}
              >
                <i
                  className="fas fa-minus-circle"
                  onClick={() => this.removePassenger(list[i].passengers[j])}
                ></i>
              </div>
            </ListGroup.Item>
          );
        });
      }
      elements.push(
        <Tab.Pane key={i} eventKey={i}>
          <ListGroup>{x}</ListGroup>
        </Tab.Pane>
      );
    }
    return elements;
  }

  changeDriverNumber = (i) => {
    this.setState({ driver_number: i });
  };

  addDriver = (index) => {
    app
      .post("driver/", {
        trip_id: this.state.trip_id,
        driver_id: this.state.all_candidates[index]._id,
        first_name: this.state.all_candidates[index].first_name,
        last_name: this.state.all_candidates[index].last_name,
      })
      .then((result) => {
        this.updateModalContent();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  removeDriver = (index) => {
    app
      .post("driverremove/", {
        trip_id: this.state.trip_id,
        driver_id: this.state.all_drivers[index]._id,
      })
      .then((result) => {
        this.updateModalContent();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addPassenger(j) {
    app
      .post("driver/add", {
        trip_id: this.state.trip_id,
        driver_id: this.state.all_drivers[this.state.driver_number]._id,
        passenger: this.state.all_candidates[j]._id,
        first_name: this.state.all_candidates[j].first_name,
        last_name: this.state.all_candidates[j].last_name,
      })
      .then((result) => {
        this.updateModalContent();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removePassenger(person) {
    app
      .post("driver/remove", {
        trip_id: this.state.trip_id,
        driver_id: this.state.all_drivers[this.state.driver_number]._id,
        passenger: person.passenger,
        first_name: person.first_name,
        last_name: person.last_name,
      })
      .then((result) => {
        this.updateModalContent();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  emailInfo = () => {
    console.log("XD");
    app
      .get("/emailtripinfo/" + this.state.trip_id)
      .then((result) => {
        this.setState({ show_email_notification: true });
        console.log(result.data.sent);
        if (result.data.sent == true) {
          this.setState({ email_success: true });
        } else {
          this.setState({ email_success: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  closeEmailInfo = () => {
    this.setState({ show_email_notification: false });
  };

  /*   showOptions(e) {
      let num = e.target.value;
      this.setState({ options: this.createOptions(num) });
    }
     */
  // createOptions(num) {
  //   let options = [];
  //   for (let i = 1; i <= num; i++) {
  //     console.log(i);
  //     options.push(
  //       <div>
  //         <label>Option {i}:</label>
  //         <input className="form-control" required type="text" key={i} />
  //       </div>
  //     )
  //   }
  /* 
      return options;
    } */

  savePoll = async (event) => {
    let op1 = await document.getElementById("op1").value;
    let op2 = await document.getElementById("op2").value;
    let op3 = await document.getElementById("op3").value;
    let op4 = await document.getElementById("op4").value;

    let tripres = await app.get(
      "tripid/" + JSON.parse(localStorage.getItem("trip"))._id
    );
    console.log(tripres.data.trip[0]);
    let trip = await tripres.data.trip[0];
    let polls = [];
    if (trip.polls != []) {
      polls = await trip.polls;
    }
    await polls.push({
      question: document.getElementById("poll-question").value,
      options: [
        { option: op1, votes: 0 },
        { option: op2, votes: 0 },
        { option: op3, votes: 0 },
        { option: op4, votes: 0 },
      ],
    });
    console.log(polls);
    /* let trip = await localStorage.getItem('trip');
    console.log(trip); */

    let updated_trip = await {
      trip_locations: trip.trip_locations,
      trip_locations_for_scheduling: trip.trip_locations_for_scheduling,
      days: trip.days,
      buddies: trip.buddies,
      posts: trip.posts,
      days_miles: trip.days_miles,
      _id: trip._id,
      owner_id: trip.owner_id,
      trip_name: trip.trip_name,
      destination: trip.destination,
      start_date: trip.start_date,
      end_date: trip.end_date,
      polls: polls,
    };

    let res = await app.put(
      "trippoll/" + JSON.parse(localStorage.getItem("trip"))._id,
      updated_trip
    );

    console.log(res);
    if (res.status == 200) {
      await localStorage.setItem("trip", JSON.stringify(updated_trip));
    }
  };

  render() {
    let inviteBuddyClose = () => this.setState({ inviteBuddyShow: false });
    return (
      <div style={{ height: "91.7%" }}>
        <div
          className="image-container"
          style={{
            height: "100%",
            backgroundImage:
              "url(https://www.diabetes.co.uk/wp-content/uploads/2019/01/iStock-1001927840-1.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            overflow: "auto",
            display: "flex",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <div>{this.state.invitation}</div>
            <div style={{ display: "flex", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "35%",
                }}
              >
                <div
                  className="trip-info"
                  style={{
                    borderRadius: "5px",

                    margin: "50px auto",
                    border: "2px solid gray",
                    boxSizing: "border-box",
                    borderRadius: "20px",
                    boxShadow: "8px 8px 50px #000",
                    color: "#6c757d",
                  }}
                >
                  <Card
                    style={{
                      borderRadius: "20px",
                    }}
                  >
                    <Card.Header as="h3" style={{ textTransform: "uppercase" }}>
                      {this.state.trip.trip_name}
                    </Card.Header>

                    <Card.Body>
                      <Card.Title
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        <i className="fas fa-map-marker-alt"></i>{" "}
                        {this.state.trip.destination}
                      </Card.Title>
                      <Card.Title>
                        <i className="fas fa-plane-departure"></i>{" "}
                        {this.state.start}
                      </Card.Title>
                      <Card.Title>
                        <i className="fas fa-plane-arrival"></i>{" "}
                        {this.state.end}
                      </Card.Title>
                      <Card.Title style={{ marginTop: "10px" }}>
                        DRIVERS
                        <i
                          className="fas fa-info-circle"
                          style={{ marginLeft: "10px", cursor: "pointer" }}
                          onClick={this.showDrivers}
                        ></i>
                      </Card.Title>
                      <InviteDriver
                        show={this.state.show_drivers}
                        onHide={this.closeDrivers}
                        tripid={this.state.trip_id}
                      />
                      <Card.Title style={{ marginTop: "10px" }}>
                        TRIP ORGANIZER:
                      </Card.Title>
                      <div>{this.state.organizer}</div>

                      <Card.Title style={{ marginTop: "10px" }}>
                        TRAVEL BUDDIES:
                      </Card.Title>
                      <div>{this.state.acceptedInvitations}</div>
                      <Button
                        onClick={() => this.setState({ inviteBuddyShow: true })}
                      >
                        INVITE
                      </Button>
                      <InviteBuddy
                        show={this.state.inviteBuddyShow}
                        onHide={inviteBuddyClose}
                        handler={this.handler}
                        size="lg"
                      />
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div
                style={{
                  width: "35%",
                  borderRadius: "5px",
                  height: "395px",
                  margin: "50px auto",
                  borderRadius: "20px",
                  color: "#6c757d",
                }}
              >
                <Card
                  style={{
                    boxShadow: "8px 8px 50px #000",
                    borderRadius: "20px",
                    width: "90%",
                  }}
                >
                  <Card.Header>MAKE A POST</Card.Header>
                  <Card.Body>
                    <Tabs
                      defaultActiveKey="comment"
                      id="uncontrolled-tab-example"
                    >
                      <Tab
                        eventKey="comment"
                        title="Comment"
                        style={{ marginTop: "20px", padding: "20px" }}
                      >
                        <form onSubmit={this.postComment}>
                          <input
                            required
                            id="comment"
                            type="textarea"
                            rows="2"
                            placeholder="Write post..."
                            className="form-control"
                            style={{
                              width: "100%",
                              // backgroundColor: "white",
                              border: "1px solid #CED4DA",
                              backgroundColor: "transparent",
                              color: "#6c757d",
                            }}
                          ></input>

                          <Button
                            type="submit"
                            variant="outline-warning"
                            style={{
                              float: "right",
                            }}
                          >
                            POST
                          </Button>
                        </form>
                      </Tab>
                      <Tab
                        eventKey="poll"
                        title="Poll"
                        style={{ marginTop: "20px", padding: "20px" }}
                      >
                        <form onSubmit={this.savePoll}>
                          <label>QUESTION:</label>
                          <input
                            className="form-control"
                            id="poll-question"
                            required
                            type="text"
                            placeholder="Ask your question here"
                            // controlId="validationCustom01"
                          ></input>

                          <label>OPTIONS:</label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            id="op1"
                          />
                          <input
                            required
                            type="text"
                            className="form-control"
                            id="op2"
                          />
                          <input
                            type="text"
                            className="form-control"
                            id="op3"
                          />
                          <input
                            type="text"
                            className="form-control"
                            id="op4"
                          />

                          <Button
                            type="submit"
                            variant="outline-success"
                            style={{ float: "right" }}
                          >
                            NEXT
                          </Button>
                        </form>
                      </Tab>
                    </Tabs>
                  </Card.Body>
                </Card>
                <div>{this.state.posts}</div>
              </div>

              <div
                style={{
                  width: "30%",
                  borderRadius: "5px",
                  margin: "50px auto",
                  borderRadius: "20px",
                  color: "#6c757d",
                }}
              >
                <Button
                  variant="info"
                  style={{
                    float: "center",
                    boxShadow: "8px 8px 20px #000",
                  }}
                  onClick={this.showRecommendations}
                >
                  Show Recommendations
                </Button>

                <Button
                  variant="info"
                  style={{
                    float: "center",
                    boxShadow: "8px 8px 20px #000",
                    marginTop: "10px",
                  }}
                  onClick={this.showSpendings}
                >
                  Show Spendings
                </Button>

                <Button
                  variant="info"
                  style={{
                    float: "center",
                    boxShadow: "8px 8px 20px #000",
                    marginTop: "10px",
                  }}
                  onClick={this.emailInfo}
                >
                  Email Trip Info
                </Button>
                <Toast
                  show={this.state.show_email_notification}
                  onClose={this.closeEmailInfo}
                  autohide={true}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    marginTop: "60px",
                  }}
                >
                  <Toast.Header>
                    <img
                      src="holder.js/20x20?text=%20"
                      className="rounded mr-2"
                      alt=""
                    />
                    <strong className="mr-auto">Email Trip Info</strong>
                  </Toast.Header>
                  <Toast.Body>
                    {this.state.email_success == true
                      ? "Trip info has been email to the atteendees!"
                      : "Email failed to send"}
                  </Toast.Body>
                </Toast>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentTrip;
