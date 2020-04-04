import React, { Component } from "react";
import {
  Card,
  FormControl,
  InputGroup,
  Form,
  ListGroup,
  Alert,
  Modal,
  Container,
  Row,
  Col,
  Accordion,
  Tab,
  Nav,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../styles/Friends.css";
import "../styles/Trip.css";
import AXIOS from "axios";

class CurrentTrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trip_id: this.props.match.params.id,
      start: JSON.parse(localStorage.getItem("trip")).start_date.substring(
        0,
        10
      ),
      end: JSON.parse(localStorage.getItem("trip")).end_date.substring(0, 10),
      posts: [],
      comment_id: "",
      user_id: "",
      comment: "",
      comment_date: "",
      user: {},
      invitation_boolean: false,
      invitation_sent_msg: "",
      invitation_sent_variant: "",
      show_drivers: false,
      all_drivers: [],
      candidates: [],
      drivers: [],
      driver_passengers: [],
      driver_number: "1",
    };
  }

  componentDidMount() {
    //get trip info
    AXIOS.get(
      "http://localhost:4000/comment/" +
        JSON.parse(localStorage.getItem("trip"))._id
    )
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
    AXIOS.get(
      "http://localhost:4000/buddy/" +
        JSON.parse(localStorage.getItem("trip"))._id
    )
      .then((response) => {
        console.log(response);
        let invitations = response.data.tripbuddy;
        this.getTripBuddies(invitations);
        for (let i = 0; i < invitations.length; i++) {
          if (
            (invitations[i].buddy_id = JSON.parse(
              localStorage.getItem("user")
            )._id)
          ) {
            if (invitations[i].pending == true) {
              console.log(invitations);
              this.setState({ invitation: this.createInvitation() });
              localStorage.setItem(
                "invitation",
                JSON.stringify(invitations[i])
              );
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    AXIOS.get(
      "http://localhost:4000/user/" +
        JSON.parse(localStorage.getItem("trip")).owner_id
    )
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
    console.log(buddyarray);
    console.log(buddyarray.length);
    let buddycardarray = [];
    for (let i = 0; i < buddyarray.length; i++) {
      //console.log(JSON.parse(buddyarray[i]));
      if (buddyarray[i].accepted === true) {
        buddycardarray.push(
          <div key={i}>
            <Card style={{ margin: "0 auto", border: "transparent" }}>
              <Card.Body>
                <div>
                  <img
                    style={{ width: "50px" }}
                    src={require(`${buddyarray[i].buddy_picture}`)}
                  />
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
    AXIOS.put("http://localhost:4000/buddypending/" + buddyyy._id, newtripbuddy)
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

    AXIOS.put("http://localhost:4000/trip/" + buddyyy.trip_id, newtrip)
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
    AXIOS.put("http://localhost:4000/buddypending/" + buddyyy._id, newtripbuddy)
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
    AXIOS.put("http://localhost:4000/comment/" + i._id, comment)
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

  getBuddyId() {
    //let self = this;
    AXIOS.get(
      "http://localhost:4000/useremail/" +
        document.getElementById("buddyemail").value
    )
      .then((response) => {
        let buddy = response.data.user;
        console.log(response);
        const buddyinfo = {
          owner_id: JSON.parse(localStorage.getItem("user"))._id,
          trip_id: JSON.parse(localStorage.getItem("trip"))._id,
          buddy_id: buddy._id,
          buddy_first_name: buddy.first_name,
          buddy_last_name: buddy.last_name,
          buddy_picture: buddy.image,
          accepted: false,
          denied: false,
          pending: true,
        };
        AXIOS.post("http://localhost:4000/buddy", buddyinfo)
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
      trip_id: JSON.parse(localStorage.getItem("trip"))._id,
      buddy_id: buddyid,
    };
    AXIOS.post("http://localhost:4000/buddy", buddy)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
    //TODO: see if user and buddy are already friends
    // if they are, add friend to trip
    //send an invite to friend
  }

  handleClick() {
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
    AXIOS.post("http://localhost:4000/comment", comment)
      .then((res) => {
        this.setState({ addSurveyShow: true });
      })
      .catch((err) => {
        console.log(err);
      });
    window.location = "/trip/" + JSON.parse(localStorage.getItem("trip"))._id;
  }

  showDrivers = () => {
    this.setState({ show_drivers: true });
    AXIOS.get("http://localhost:4000/driver/friends/" + this.state.trip_id)
      .then((result) => {
        // console.log(result);
        this.setState({
          candidates: this.candidates(result.data.tripbuddy),
        });
        return AXIOS.get("http://localhost:4000/driver/" + this.state.trip_id);
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

  candidates(list) {
    const elements = [];
    for (let i = 0; i < list.length; i++) {
      elements.push(
        <ListGroup.Item key={i}>
          {list[i].buddy_first_name} {list[i].buddy_last_name}{" "}
          <i
            style={{ marginTop: "3px", float: "right" }}
            className="fas fa-car"
            onClick={() => this.addDriver(list[i])}
          ></i>
          <i
            style={{ marginTop: "3px", float: "right", marginRight: "10px" }}
            className="fas fa-plus-circle"
            onClick={() => this.addPassenger(list[i])}
          ></i>
        </ListGroup.Item>
      );
    }
    return elements;
  }
  drivers(list) {
    const elements = [];
    for (let i = 0; i < list.length; i++) {
      console.log(i);
      elements.push(
        <Nav.Item key={i} onClick={() => this.changeDriverNumber(i)}>
          <Nav.Link eventKey={i.toString()}>
            {list[i].first_name} {list[i].last_name}
          </Nav.Link>
        </Nav.Item>
      );
    }
    return elements;
  }

  passengers(list) {
    const elements = [];
    for (let i = 0; i < list.length; i++) {
      const x = [];
      for (let j = 0; j < list[i].passengers.length; j++) {
        x.push(
          <ListGroup.Item key={j}>
            {list[i].passengers[j].first_name} {list[i].passengers[j].last_name}
            <i
              style={{ marginTop: "3px", float: "right" }}
              className="fas fa-minus-circle"
              onClick={() => this.removePassenger(list[i].passengers[j])}
            ></i>
          </ListGroup.Item>
        );
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

  addDriver(person) {
    AXIOS.post("http://localhost:4000/driver/", {
      trip_id: this.state.trip_id,
      driver_id: person.buddy_id,
      first_name: person.buddy_first_name,
      last_name: person.buddy_last_name,
    })
      .then((result) => {
        return AXIOS.get(
          "http://localhost:4000/driver/friends/" + this.state.trip_id
        );
      })
      .then((result) => {
        this.setState({
          candidates: this.candidates(result.data.tripbuddy),
        });
        return AXIOS.get("http://localhost:4000/driver/" + this.state.trip_id);
      })
      .then((result) => {
        this.setState({ all_drivers: result.data.drivers });
        this.setState({ drivers: this.drivers(result.data.drivers) });
        this.setState({
          driver_passengers: this.passengers(result.data.drivers),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addPassenger(person) {
    AXIOS.post("http://localhost:4000/driver/add", {
      trip_id: this.state.trip_id,
      driver_id: this.state.all_drivers[this.state.driver_number].driver_id,
      passenger: person.buddy_id,
      first_name: person.buddy_first_name,
      last_name: person.buddy_last_name,
    })
      .then((result) => {
        return AXIOS.get(
          "http://localhost:4000/driver/friends/" + this.state.trip_id
        );
      })
      .then((result) => {
        this.setState({
          candidates: this.candidates(result.data.tripbuddy),
        });
        return AXIOS.get("http://localhost:4000/driver/" + this.state.trip_id);
      })
      .then((result) => {
        this.setState({ all_drivers: result.data.drivers });
        this.setState({ drivers: this.drivers(result.data.drivers) });
        this.setState({
          driver_passengers: this.passengers(result.data.drivers),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removePassenger(person) {
    console.log(person);
    AXIOS.post("http://localhost:4000/driver/remove", {
      trip_id: this.state.trip_id,
      driver_id: this.state.all_drivers[this.state.driver_number].driver_id,
      passenger: person.passenger,
      first_name: person.first_name,
      last_name: person.last_name,
    })
      .then((result) => {
        return AXIOS.get(
          "http://localhost:4000/driver/friends/" + this.state.trip_id
        );
      })
      .then((result) => {
        this.setState({
          candidates: this.candidates(result.data.tripbuddy),
        });
        return AXIOS.get("http://localhost:4000/driver/" + this.state.trip_id);
      })
      .then((result) => {
        this.setState({ all_drivers: result.data.drivers });
        this.setState({ drivers: this.drivers(result.data.drivers) });
        this.setState({
          driver_passengers: this.passengers(result.data.drivers),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
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
                      {JSON.parse(localStorage.getItem("trip")).trip_name}
                    </Card.Header>

                    <Card.Body>
                      <Card.Title
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        <i className="fas fa-map-marker-alt"></i>{" "}
                        {JSON.parse(localStorage.getItem("trip")).destination}
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
                      <Card.Title style={{ marginTop: "10px" }}>
                        TRIP ORGANIZER:
                      </Card.Title>
                      <div>{this.state.organizer}</div>

                      <Card.Title style={{ marginTop: "10px" }}>
                        TRAVEL BUDDIES:
                      </Card.Title>
                      <div>{this.state.acceptedInvitations}</div>
                      <InputGroup>
                        <FormControl
                          id="buddyemail"
                          placeholder="username"
                          aria-label="username"
                        />
                        <InputGroup.Append>
                          <Button
                            variant="outline-success"
                            onClick={this.getBuddyId}
                          >
                            INVITE
                          </Button>
                        </InputGroup.Append>
                      </InputGroup>
                      {this.state.invitation_boolean ? (
                        <Alert
                          variant={this.state.invitation_sent_variant}
                          style={{ marginBottom: "0", marginTop: "6px" }}
                        >
                          {this.state.invitation_sent_msg}
                        </Alert>
                      ) : (
                        ""
                      )}
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
                    <Form>
                      <Form.Group>
                        <Form.Control
                          id="comment"
                          as="textarea"
                          rows="2"
                          placeholder="Write post..."
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        variant="outline-warning"
                        onClick={this.handleClick}
                        style={{
                          float: "right",
                        }}
                      >
                        POST
                      </Button>
                    </Form>
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
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={this.state.show_drivers}
          centered
          onHide={this.closeDrivers}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Drivers</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Container>
              <Row className="show-grid">
                <Col md={6}>
                  <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                    <Row>
                      <Col md={6}>
                        <h5>Drivers</h5>
                        <Nav variant="pills" className="flex-column">
                          {this.state.drivers}
                        </Nav>
                      </Col>
                      <Col md={6}>
                        <h5>Passengers</h5>
                        <Tab.Content>
                          {this.state.driver_passengers}
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </Col>
                <Col md={2}></Col>
                <Col md={4}>
                  <ListGroup>
                    <h5>Candidates</h5>
                    {this.state.candidates}
                  </ListGroup>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default CurrentTrip;
