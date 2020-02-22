import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Friends.css";
import "../styles/CurrentTrip.css";

import AXIOS from "axios";

class CurrentTrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [
        {
          rating: 4,
          price: "$",
          phone: "+14152520800",
          id: "E8RJkjfdcwgtyoPMjQ_Olg",
          alias: "four-barrel-coffee-san-francisco",
          is_closed: false,
          categories: [
            {
              alias: "coffee",
              title: "Coffee & Tea"
            }
          ],
          review_count: 1738,
          name: "Four Barrel Coffee",
          url: "https://www.yelp.com/biz/four-barrel-coffee-san-francisco",
          coordinates: {
            latitude: 37.7670169511878,
            longitude: -122.42184275
          },
          image_url:
            "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
          location: {
            city: "San Francisco",
            country: "US",
            address2: "",
            address3: "",
            state: "CA",
            address1: "375 Valencia St",
            zip_code: "94103"
          },
          distance: 1604.23,
          transactions: ["pickup", "delivery"]
        },
        {
          rating: 4,
          price: "$",
          phone: "+14152520800",
          id: "E8RJkjfdcwgtyoPMjQ_Olg",
          alias: "four-barrel-coffee-san-francisco",
          is_closed: false,
          categories: [
            {
              alias: "coffee",
              title: "Coffee & Tea"
            }
          ],
          review_count: 1738,
          name: "Four Barrel Coffee",
          url: "https://www.yelp.com/biz/four-barrel-coffee-san-francisco",
          coordinates: {
            latitude: 37.7670169511878,
            longitude: -122.42184275
          },
          image_url:
            "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
          location: {
            city: "San Francisco",
            country: "US",
            address2: "",
            address3: "",
            state: "CA",
            address1: "375 Valencia St",
            zip_code: "94103"
          },
          distance: 1604.23,
          transactions: ["pickup", "delivery"]
        },
        {
          rating: 4,
          price: "$",
          phone: "+14152520800",
          id: "E8RJkjfdcwgtyoPMjQ_Olg",
          alias: "four-barrel-coffee-san-francisco",
          is_closed: false,
          categories: [
            {
              alias: "coffee",
              title: "Coffee & Tea"
            }
          ],
          review_count: 1738,
          name: "Four Barrel Coffee",
          url: "https://www.yelp.com/biz/four-barrel-coffee-san-francisco",
          coordinates: {
            latitude: 37.7670169511878,
            longitude: -122.42184275
          },
          image_url:
            "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
          location: {
            city: "San Francisco",
            country: "US",
            address2: "",
            address3: "",
            state: "CA",
            address1: "375 Valencia St",
            zip_code: "94103"
          },
          distance: 1604.23,
          transactions: ["pickup", "delivery"]
        },
        {
          rating: 4,
          price: "$",
          phone: "+14152520800",
          id: "E8RJkjfdcwgtyoPMjQ_Olg",
          alias: "four-barrel-coffee-san-francisco",
          is_closed: false,
          categories: [
            {
              alias: "coffee",
              title: "Coffee & Tea"
            }
          ],
          review_count: 1738,
          name: "Four Barrel Coffee",
          url: "https://www.yelp.com/biz/four-barrel-coffee-san-francisco",
          coordinates: {
            latitude: 37.7670169511878,
            longitude: -122.42184275
          },
          image_url:
            "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
          location: {
            city: "San Francisco",
            country: "US",
            address2: "",
            address3: "",
            state: "CA",
            address1: "375 Valencia St",
            zip_code: "94103"
          },
          distance: 1604.23,
          transactions: ["pickup", "delivery"]
        }
      ]
    };
  }

  toRecommendation(e, url) {
    console.log(url);
    window.open(url, "");
  }

  componentDidMount() {
    // this.setState({
    //   recommendation_list: this.createRecommendationList(this.state.locations)
    // });
    // console.log(this.createRecommendationList(this.state.locations));
    // this.setState({ locations: [] });
    // console.log(this.state);
  }

  createRecommendationList(list) {
    console.log(list);
    let elements = [];

    for (let i = 0; i < list.length; i++) {
      elements.push(
        <Col md={{ span: 4, offset: 8 }}>
          <div className="friend-card" key={i}>
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
                // onClick={this.toRecommendation(list[i].url)}
              />

              <div className="friend-info">
                <h6>{list[i].name}</h6>
                <h6 style={{ fontSize: "12px" }}>
                  <i className="fas fa-star-half-alt"></i>: {list[i].rating}
                </h6>
                <h6 style={{ fontSize: "12px" }}>
                  <i className="fas fa-dollar-sign"></i>: {list[i].price}
                </h6>
                <h6 style={{ fontSize: "12px" }}>
                  {list[i].location.address1}
                  {list[i].location.city}
                </h6>
              </div>
            </div>
          </div>
          {/* </div> */}
        </Col>
      );
    }
    console.log(elements);
    return elements;
  }

  render() {
    let recommendations = this.createRecommendationList(this.state.locations);
    return (
      <Container style={{ width: "100%" }}>
        <Row style={{ width: "100%" }} className="friend-list">
          {recommendations}
        </Row>
      </Container>
    );
  }
}

export default CurrentTrip;
