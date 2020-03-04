import React, { Component } from "react";
import {
  Container,
  Col,
  Row,
  Dropdown,
  Form,
  Button,
  Card
} from "react-bootstrap";
import AXIOS from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/Recommendation.scss";

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip_id: this.props.match.params.id,
      trip_locations: [],
      trip_location_elements: [],

      days: [],
      days_elements: [],
      daylist: [],
      loading: true
    };
  }
  componentDidMount() {
    AXIOS.get("http://localhost:4000/tripinfo/" + this.state.trip_id)
      .then(res => {
        this.setState({ trip_locations: res.data.trip.trip_locations });

        console.log(this.state);

        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return <div>easkjdhskj</div>;
  }
}

export default Schedule;
