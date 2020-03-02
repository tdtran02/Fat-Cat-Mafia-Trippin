import React, { Component } from "react";
import { ButtonToolbar, Card, FormControl, InputGroup } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../styles/Friends.css";
import "../styles/Trip.css";
import AXIOS from "axios";

class CurrentTrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trip_id: this.props.match.params.id,
      start: JSON.parse(localStorage.getItem('trip')).start_date.substring(0, 10),
      end: JSON.parse(localStorage.getItem('trip')).end_date.substring(0, 10)
    };
  }

  showRecommendations = () => {
    console.log(this.state.trip_id);
    window.location = "/trip/" + this.state.trip_id + "/recommendations";
  };



  render() {
    return (
      <div>
        <div className="image-container" style={{
          backgroundImage: "url(https://www.diabetes.co.uk/wp-content/uploads/2019/01/iStock-1001927840-1.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "auto",
          display: "flex",
          flexDirection: "vertical"
        }}>
          <div className="trip-info" style={{
            width: "400px",
            backgroundColor: "white",
            borderRadius: "5px",
            margin: "150px auto ",
            border: "1px solid transparent",
            boxSizing: "border-box",
            borderRadius: "20px",
            boxShadow: "8px 8px 50px #000",
            color: "#6c757d"
          }}>

            <Card
              style={{
                borderRadius: "20px",
                backgroundColor: "transparent"
              }}
            >
              <Card.Header as="h3" style={{ textTransform: "uppercase" }}>{JSON.parse(localStorage.getItem('trip')).trip_name}</Card.Header>

              <Card.Body>
                <Card.Title style={{
                  textTransform: "uppercase",
                  marginTop: "5px"
                }}><i class="fas fa-map-marker-alt"></i>  {JSON.parse(localStorage.getItem('trip')).destination}</Card.Title>
                <Card.Title><i class="fas fa-plane-departure"></i>  {this.state.start}</Card.Title>
                <Card.Title><i class="fas fa-plane-arrival"></i>  {this.state.end}</Card.Title>
                <Card.Title style={{ marginTop: "50px" }}>TRAVEL BUDDIES:</Card.Title>
                <InputGroup>
                  <FormControl
                    placeholder="username"
                    aria-label="username" />
                  <InputGroup.Append>
                    <Button variant="outline-success">INVITE</Button>
                  </InputGroup.Append>
                </InputGroup>
              </Card.Body>
            </Card>


          </div>
          <div style={{
            width: "300px",
            borderRadius: "5px",
            margin: "100px auto ",
            borderRadius: "20px",
            color: "#6c757d"
          }}>
            <Button variant="info" style={{
              float: "center",
              marginTop: "50px",
              boxShadow: "8px 8px 20px #000"
            }} onClick={this.showRecommendations}>Show Recommendations</Button>
          </div>

        </div>

      </div>

    );
  }
}

export default CurrentTrip;
