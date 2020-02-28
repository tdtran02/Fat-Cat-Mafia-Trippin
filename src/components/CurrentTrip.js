import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../styles/Friends.css";
import "../styles/CurrentTrip.css";
import AXIOS from "axios";

class CurrentTrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trip_id: this.props.match.params.id
    };
  }

  showRecommendations = () => {
    console.log(this.state.trip_id);
    window.location = "/trip/" + this.state.trip_id + "/recommendations";
  };

  render() {
    return (
      <Button onClick={this.showRecommendations}>Show Recommendations</Button>
    );
  }
}

export default CurrentTrip;
