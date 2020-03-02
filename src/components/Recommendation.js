import React, { Component } from "react";
import { Container, Col, Row, Dropdown, Form, Button } from "react-bootstrap";
import AXIOS from "axios";

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip_id: this.props.match.params.id,
      trip_locations: [],
      trip_location_elements: [],
      locations: [],
      location_elements: [],
      search_term: "",
      days: [],
      days_elements: [],
      daylist: []
    };
  }
  componentDidMount() {
    AXIOS.get("http://localhost:4000/tripinfo/" + this.state.trip_id)
      .then(res => {
        console.log(res.data.trip);
        localStorage.setItem("trip", JSON.stringify(res.data.trip));
        this.setState({ trip_locations: res.data.trip.trip_locations });
        this.setState({
          trip_location_elements: this.createUserLocationList(
            this.state.trip_locations
          )
        });
        // console.log(res.data);
        // console.log(res.data.trip);
        this.setState({ days: res.data.trip.days });
        this.setState({ daylist: this.getDays() });
        return AXIOS.post("http://localhost:4000/question/searchlocation", {
          trip_id: this.state.trip_id,
          search_term: this.state.search_term
        });
      })
      .then(res => {
        this.setState({ locations: res.data.recs });
        this.setState({
          location_elements: this.createRecommendationList(this.state.locations)
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  toRecommendation(e, url) {
    window.open(url, "");
  }

  addtoday(e, daynum, i) {
    let days = this.state.days;
    days[daynum].push(this.state.trip_locations[i]);
    this.setState({ days: days });
    AXIOS.post("http://localhost:4000/tripinfo/addtodays", {
      trip_id: this.state.trip_id,
      days: this.state.days
    }).then(res => {
      console.log(res);
    });
  }
  daylist(list) {
    let elements = [];
    for (let i = 0; i < list.length; i++) {
      let x = [];
      x.push(<h2>Day {i + 1}</h2>);
      for (let j = 0; j < list[i].length; j++) {
        x.push(<span>{list[i][j].name}</span>);
      }
      elements.push(x);
    }
    return elements;
  }

  getDays() {
    let elements = [];
    console.log(this.state.days);
    for (let i = 1; i <= this.state.days.length; i++) {
      console.log(i);
      elements.push(<Dropdown.Item key={i}>Day {i}</Dropdown.Item>);
    }
    console.log(elements);
    return (
      <Dropdown style={{ display: "inline-block" }}>
        <Dropdown.Toggle variant="success">Schedule it</Dropdown.Toggle>

        <Dropdown.Menu>{elements}</Dropdown.Menu>
      </Dropdown>
    );
  }

  addToTripLocations(e, i) {
    AXIOS.post("http://localhost:4000/trip/addtotriplocation", {
      trip_id: this.state.trip_id,
      trip_location: this.state.locations[i]
    })
      .then(res => {
        return AXIOS.post("http://localhost:4000/question/searchlocation", {
          trip_id: this.state.trip_id,
          search_term: this.state.search_term
        });
      })
      .then(r => {
        this.setState({ trip_locations: r.data.user_locations });
        this.setState({
          trip_location_elements: this.createUserLocationList(
            this.state.trip_locations
          )
        });
        this.setState({ locations: r.data.recs });
        this.setState({
          location_elements: this.createRecommendationList(this.state.locations)
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
        return AXIOS.post("http://localhost:4000/question/searchlocation", {
          trip_id: this.state.trip_id,
          search_term: this.state.search_term
        });
      })
      .then(r => {
        this.setState({ trip_locations: r.data.user_locations });
        this.setState({
          trip_location_elements: this.createUserLocationList(
            this.state.trip_locations
          )
        });
        this.setState({ locations: r.data.recs });
        this.setState({
          location_elements: this.createRecommendationList(this.state.locations)
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
  searchLocations = () => {
    AXIOS.post("http://localhost:4000/question/searchlocation", {
      trip_id: this.state.trip_id,
      search_term: this.state.search_term
    })
      .then(r => {
        this.setState({ locations: r.data.recs });
        this.setState({
          location_elements: this.createRecommendationList(this.state.locations)
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
  onChangeSearch = e => {
    this.setState({ search_term: e.target.value });
  };

  createUserLocationList(list) {
    // let d = this.getDays();
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
                src={list[i].image_url}
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
          <Dropdown>
            <Dropdown.Toggle variant="success">Schedule it</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={e => {
                  this.addtoday(e, 0, i);
                }}
              >
                Day 1
              </Dropdown.Item>
              <Dropdown.Item
                onClick={e => {
                  this.addtoday(e, 1, i);
                }}
              >
                Day 2
              </Dropdown.Item>
              {/* <Dropdown.Item onClick={this.addtoday(2)}>Day 2</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      );
    }
    return elements;
  }

  createRecommendationList(list) {
    let elements = [];

    // for (let i = 0; i < list.length; i++) {
    for (let i = 0; i < 5; i++) {
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
                src={list[i].image_url}
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
    let daylist = this.daylist(this.state.days);
    console.log(daylist);
    return (
      <div>
        <Container style={{ width: "100%" }}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter a key word"
              style={{
                backgroundColor: "white",
                border: "1px solid black",
                marginTop: "5px",
                marginBottom: "3px"
              }}
              onChange={this.onChangeSearch}
            />
            <Button variant="dark" onClick={this.searchLocations}>
              Search
            </Button>
          </Form.Group>
          <Row style={{ width: "100%" }}>
            <Col md={{ span: 6 }}>
              <Row className="friend-list">
                {this.state.trip_location_elements.length != 0 ? (
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
                {this.state.trip_location_elements.length != 0
                  ? this.state.trip_location_elements
                  : ""}
              </Row>
            </Col>
            <Col md={{ span: 6 }}>
              <Row className="friend-list">
                {this.state.location_elements.length != 0 ? (
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
                ) : (
                  <span></span>
                )}
                {this.state.location_elements.length != 0
                  ? this.state.location_elements
                  : ""}
              </Row>
            </Col>
          </Row>
          <Container>
            <Row>{daylist}</Row>
          </Container>
        </Container>
      </div>
    );
  }
}

export default Recommendation;
