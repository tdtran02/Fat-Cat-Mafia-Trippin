import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { app } from "../utils/AxiosConfig";

export class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      i: this.props.match.params.id,
      comment: " ",
    };
  }

  componentDidMount() {
    console.log(this.state.i);
  }

  onChangeHandler(event) {
    this.setState({
      comment: event.te,
    });
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

    const update = {
      owner_id: JSON.parse(localStorage.getItem("user"))._id,
      //    email: JSON.parse(localStorage.getItem('user')).email,
      destination: trip.destination,
      start_date: trip.start_date,
      end_date: trip.end_date,
      trip_name: trip.trip_name,
      days: trip.days,
      posts: postArr,
    };
    app
      .post("trip/", update)
      .then((res) => {
        localStorage.setItem("trip", JSON.stringify(res.data.trip));
        this.setState({ addSurveyShow: true });
      })
      .catch((err) => {
        console.log(err);
      });
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

  render() {
    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            CREATE POST
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                id="comment"
                as="textarea"
                rows="3"
                placeholder="Write post..."
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" type="submit" onClick={this.handleClick}>
            POST
          </Button>
          <Button variant="secondary" onClick={this.props.onHide}>
            CLOSE
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default CreatePost;
