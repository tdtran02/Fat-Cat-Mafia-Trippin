import React, { Component } from "react";
import { Button, ListGroup, Form } from "react-bootstrap";
import AXIOS from "axios";

import "../styles/Friends.css";

class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friend: null,
      friend_list: [],
      incoming_pending_friends: [],
      search_email: ""
    };
  }

  componentDidMount() {
    AXIOS.get(
      "http://localhost:4000/friend/" +
        JSON.parse(localStorage.getItem("user"))._id
    )
      .then(res => {
        this.setState({ friend: res.data.friend });
        this.setState({
          friend_list: this.createList(res.data.confirmed_friends)
        });

        this.setState({
          incoming_pending_friends: this.createPendingList(
            res.data.pending_friend_requests
            // res.data.confirmed_friends
          )
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  emailOnChange = e => {
    this.setState({ search_email: e.target.value });
  };

  onSearchFieldClick = () => {
    const USER = JSON.parse(localStorage.getItem("user"));
    AXIOS.post("http://localhost:4000/friend/add", {
      user_id: USER._id,
      user_email: USER.email,
      adding_friend: this.state.search_email
    })
      .then(response => {
        // do something with the response later
      })
      .catch(err => {
        console.log(err);
      });
  };

  acceptFriend = e => {
    let index = e.target.id.replace("incoming_friends", "");
    AXIOS.post("http://localhost:4000/friend/accept", {
      user_id: this.state.friend.owner_id,
      adding_friend: this.state.friend.incoming_pending_friends[index]
    }).then(response => {
      console.log(response);
      this.setState({
        friend_list: this.createList(response.data.confirmed_friends)
      });
      this.setState({
        incoming_pending_friends: this.createPendingList(
          response.data.pending_friend_requests
        )
      });
    });
  };

  createList(list) {
    let elements = [];
    for (var i = 0; i < list.length; i++) {
      elements.push(
        <div className="col-md-3 col-sm-6" key={i}>
          <div className="friend-card">
            <div
              className="img-responsive cover"
              style={{
                height: "100px",
                width: "400px",
                backgroundColor: "#6495ED"
              }}
            ></div>
            <div className="card-info">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="user"
                className="profile-photo-lg"
              />
              <div className="friend-info">
                <span className="pull-right text-green">My Friend</span>
                <h5>
                  <p href="timeline.html" className="profile-link">
                    {list[i].first_name} {list[i].last_name}
                  </p>
                </h5>
                <p>Description here</p>
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

  createPendingList(list) {
    let elements = [];
    for (var i = 0; i < list.length; i++) {
      elements.push(
        <div className="col-md-3 col-sm-6" key={i}>
          <div className="friend-card">
            <div
              className="img-responsive cover"
              style={{
                height: "100px",
                width: "400px",
                backgroundColor: "#cd5c5c"
              }}
            ></div>
            <div className="card-info">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="user"
                className="profile-photo-lg"
              />
              <div className="friend-info">
                <span
                  className="pull-right text-green"
                  onClick={this.acceptFriend}
                  id={"incoming_friends" + i}
                  style={{ cursor: "pointer", color: "#cd5c5c" }}
                >
                  Accept Friend Request
                </span>
                <h5>
                  <p href="timeline.html" className="profile-link">
                    {list[i].first_name} {list[i].last_name}
                  </p>
                </h5>
                <p>Description here</p>
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
      <div className="container">
        <div className="create-post">
          <div className="row">
            <div className="col-md-8">
              <Form
                style={{
                  display: "table",
                  tableLayout: "fixed"
                }}
              >
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt=""
                  className="profile-photo-md"
                />
                <Form.Group
                  style={{
                    display: "table-cell",
                    verticalAlign: "middle",
                    textAlign: "center"
                  }}
                >
                  <Form.Control
                    className="ml-2"
                    type="email"
                    placeholder="name@example.com"
                    onChange={this.emailOnChange}
                  />
                </Form.Group>
                <Button
                  className="ml-3"
                  variant="info"
                  onClick={this.onSearchFieldClick}
                >
                  Add
                </Button>
              </Form>
            </div>
          </div>
        </div>
        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-3" style={{ margin: "0 auto 20px 0" }}>
            <span
              style={{
                // borderBottom: "1px solid",
                fontFamily: "Lemonada, cursive",
                fontSize: "14px",
                fontWeight: "normal"
              }}
            >
              Pending Friend Requests
            </span>
          </div>
          <div className="col-md-9"></div>
        </div>
        {/* pending friends */}
        <div className="friend-list">
          <div className="row">{this.state.incoming_pending_friends}</div>
        </div>

        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-3" style={{ margin: "0 auto 20px 0" }}>
            <span
              style={{
                // borderBottom: "1px solid",
                fontFamily: "Lemonada, cursive",
                fontSize: "14px"
              }}
            >
              My Friends
            </span>
          </div>
          <div className="col-md-9"></div>
        </div>
        {/* friends */}
        <div className="friend-list">
          <div className="row">{this.state.friend_list}</div>
        </div>
      </div>
    );
  }
}

export default Friends;
