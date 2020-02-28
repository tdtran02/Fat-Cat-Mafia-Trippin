import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import AXIOS from "axios";

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip_id: this.props.match.params.id,
      trip_locations: [],
      trip_location_elements: [],
      locations: []
    };
  }
  componentDidMount() {
    AXIOS.get("http://localhost:4000/tripinfo/" + this.state.trip_id)
      .then(res => {
        localStorage.setItem("trip", JSON.stringify(res.data.trip));
        return AXIOS.get(
          "http://localhost:4000/question/" +
            JSON.parse(localStorage.getItem("trip"))._id
        );
      })
      .then(res => {
        this.setState({ locations: res.data.recs });
      })
      .catch(err => {
        console.log(err);
      });
  }

  toRecommendation(e, url) {
    window.open(url, "");
  }

  addToTripLocations(e, i) {
    console.log(this.state.trip_id);
    console.log(this.state.locations[i]);
    AXIOS.post("http://localhost:4000/trip/addtotriplocation", {
      trip_id: this.state.trip_id,
      trip_location: this.state.locations[i]
    })
      .then(res => {
        this.setState({ trip_locations: res.data.trip.trip_locations });
        this.setState({
          trip_location_elements: this.createUserLocationList(
            this.state.trip_locations
          )
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  deleteTripLocation(e, i) {
    AXIOS.post("http://localhost:4000/trip/deletefromtriplocations", {
      trip_id: this.state.trip_id,
      trip_location: this.state.trip_locations[i]
    })
      .then(res => {
        console.log(res);
        this.setState({ trip_locations: res.data.trip.trip_locations });
        this.setState({
          trip_location_elements: this.createUserLocationList(
            this.state.trip_locations
          )
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  createUserLocationList(list) {
    let elements = [];

    for (let i = 0; i < list.length; i++) {
      elements.push(
        <Col md={{ span: 12 }} key={i}>
          <div className="friend-card">
            <img
              src={require("./images/yelp.jpg")}
              className="img-responsive cover"
              style={{
                height: "70px",
                width: "400px",
                backgroundColor: "#cd5c5c",
                cursor: "pointer"
              }}
              onClick={e => {
                this.toRecommendation(e, list[i].url);
              }}
            />
            <div className="card-info">
              <img
                src="http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg"
                alt="user"
                className="profile-photo-lg"
              />

              <div className="friend-info">
                <div>
                  {list[i].name}{" "}
                  <i
                    className="fas fa-minus-circle"
                    style={{
                      color: "#cd5c5c",
                      marginLeft: "5px",
                      cursor: "pointer"
                    }}
                    onClick={e => {
                      this.deleteTripLocation(e, i);
                    }}
                  ></i>
                </div>

                <h6 style={{ fontSize: "12px" }}>
                  <i className="fas fa-star-half-alt"></i>: {list[i].rating}
                </h6>
                <h6 style={{ fontSize: "12px" }}>
                  <i className="fas fa-dollar-sign"></i>: {list[i].price}
                </h6>
                <h6 style={{ fontSize: "12px" }}>
                  {list[i].location.address1} {"    "} {list[i].location.city}
                </h6>
              </div>
            </div>
          </div>
        </Col>
      );
    }
    return elements;
  }

  createRecommendationList(list) {
    let elements = [];

    for (let i = 0; i < list.length; i++) {
      elements.push(
        <Col md={{ span: 12 }} key={i}>
          <div className="friend-card">
            <img
              src={require("./images/yelp.jpg")}
              className="img-responsive cover"
              style={{
                height: "70px",
                width: "400px",
                backgroundColor: "#cd5c5c",
                cursor: "pointer"
              }}
              onClick={e => {
                this.toRecommendation(e, list[i].url);
              }}
            />
            <div className="card-info">
              <img
                src="http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg"
                alt="user"
                className="profile-photo-lg"
              />

              <div className="friend-info">
                <div>
                  {list[i].name}{" "}
                  <i
                    className="fas fa-plus-circle"
                    style={{
                      color: "#8dc63f",
                      marginLeft: "5px",
                      cursor: "pointer"
                    }}
                    onClick={e => {
                      this.addToTripLocations(e, i);
                    }}
                  ></i>
                </div>

                <h6 style={{ fontSize: "12px" }}>
                  <i className="fas fa-star-half-alt"></i>: {list[i].rating}
                </h6>
                <h6 style={{ fontSize: "12px" }}>
                  <i className="fas fa-dollar-sign"></i>: {list[i].price}
                </h6>
                <h6 style={{ fontSize: "12px" }}>
                  {list[i].location.address1} {"    "} {list[i].location.city}
                </h6>
              </div>
            </div>
          </div>
        </Col>
      );
    }
    return elements;
  }
  render() {
    let recommendations = this.createRecommendationList(this.state.locations);
    return (
      <Container style={{ width: "100%" }}>
        <Row style={{ width: "100%" }}>
          <Col md={{ span: 6 }}>
            <Row className="friend-list">
              {this.state.trip_locations != 0 ? (
                <span
                  style={{
                    fontFamily: "Lemonada, cursive",
                    fontSize: "14px",
                    fontWeight: "normal",
                    marginBottom: "10px"
                  }}
                >
                  My Trip Locations
                </span>
              ) : (
                <span></span>
              )}
              {this.state.trip_locations.length != 0
                ? this.state.trip_location_elements
                : ""}
            </Row>
          </Col>
          <Col md={{ span: 6 }}>
            <Row className="friend-list">
              <span
                style={{
                  fontFamily: "Lemonada, cursive",
                  fontSize: "14px",
                  fontWeight: "normal",
                  marginBottom: "10px"
                }}
              >
                My Recommendations
              </span>
              {recommendations}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Recommendation;