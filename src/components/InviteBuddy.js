import React, { Component } from "react";
import { Modal, Button, Form, Alert, ListGroup } from "react-bootstrap";
import "../styles/InviteBuddy.css";
const AXIOS = require("axios").default;

export class InviteBuddy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitation_sent: false,
      invitation_boolean: false,
      invitation_sent_msg: "",
      invitation_sent_variant: "",
      currentFriend: {},
      selectedFriends: [],
    };

    this.handleChange = this.handleChange.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    AXIOS.get(
      "http://localhost:4000/friend/" +
        JSON.parse(localStorage.getItem("user"))._id
    ).then((result) => {
      console.log(result.data.friend.confirmed_friends);

      this.setState({
        friends: this.showFriends(result.data.friend.confirmed_friends),
      });
    });
  }

  showFriends(list) {
    let friendslist = [];
    let user = null;
    for (let i = 0; i < list.length; i++) {
      AXIOS.get("http://localhost:4000/user/" + list[i]).then((response) => {
        user = response.data.user;
        friendslist.push(
          <label type="checkbox" key={i} label="Check me out">
            <input type="radio" value={user._id} onChange={this.handleChange} />
            <div
              style={{
                display: "flex",
                border: "1px solid black",
                borderRadius: "5px",
                margin: "5px",
                padding: "5px",
              }}
            >
              {/* <img style={{ width: "50px" }} src={require(`${user.image}`)} alt="userimage" /> */}
              <div style={{ margin: "15px 5px 0 15px" }}>{user.first_name}</div>
              <div style={{ margin: "15px 0" }}>{user.last_name}</div>
            </div>
          </label>
        );
      });
      // this.setState({ currentFriend: user });
    }
    return friendslist;
  }

  handleChange(event) {
    let selected = [];
    if (this.state.selectedFriends != null) {
      selected = this.state.selectedFriends;
    }

    selected.push(event.target.value);
    this.setState({ selectedFriends: selected });
    console.log(this.state.selectedFriends);
  }

  /* handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.selectedFriends);
        for (let i = 0; i < this.state.selectedFriends; i++) {
            console.log(this.state.selectedFriends[i])
            this.inviteBuddy(this.state.selectedFriends[i])
        }
    } */

  inviteBuddy() {
    console.log(this.state.selectedFriends);
    let buddies = this.state.selectedFriends;
    if (buddies != null) {
      for (let i = 0; i < buddies.length; i++) {
        AXIOS.get("http://localhost:4000/user/" + buddies[i]).then((resp) => {
          let buddy = resp.data.user;
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
              console.log(response);
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
        });
      }
    }
  }

  getBuddyId() {
    //let self = this;
    console.log(document.getElementById("buddyemail").value);
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
            console.log(response);
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

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>INVITE</Modal.Header>
        <Modal.Body>
          <form>
            {this.state.friends}

            <Button onClick={this.inviteBuddy.bind(this)}>SEND</Button>
          </form>
          <div>
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
          </div>
          <Form>
            <Form.Label>Non-Trippin Members</Form.Label>

            <Form.Control type="email" id="buddyemail" />
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
                    <Button onClick={this.getBuddyId} >SEND</Button>
                    <Button onClick={this.props.onHide} >CLOSE</Button>
                </Modal.Footer> */}
      </Modal>
    );
  }
}

export default InviteBuddy;
