import React from "react";
import {
  Button,
  Card
} from "react-bootstrap";
import { app } from '../utils/AxiosConfig';
//import AXIOS from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/Recommendation.scss";

class Recommendation extends React.Component {
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
      daylist: [],
      loading: true,
      trip_location_events: [],
      location_events: [],
      event_locations: [],
      trip_event_elements: [],
      event_list: [],
      destination: null,
      startDate: null,
      endDate: null,
      show_event: [],
      eventCopy: []
    };
  }

  async componentDidMount() {
    app.get("tripinfo/" + this.state.trip_id)
      .then(res => {
        console.log(res.data.trip);
        let get_start = new Date(res.data.trip.start_date);
        let get_end = new Date(res.data.trip.end_date);
        get_start = get_start.getFullYear() + "-" + (get_start.getMonth() + 1) + "-" + (get_start.getDate() + 1);
        get_end = get_end.getFullYear() + "-" + (get_end.getMonth() + 1) + "-" + (get_end.getDate() + 1);

        this.setState({
          trip_locations: res.data.trip.trip_locations,
          destination: res.data.trip.destination,
          startDate: new Date(get_start),
          endDate: new Date(get_end),
          event_locations: res.data.trip.event_locations
        });

        return app.post("question/searchlocation", {
          trip_id: this.state.trip_id,
          search_term: this.state.search_term
        });
      })
      .then(res => {
        this.setState({ locations: res.data.recs });
        this.setState({
          location_elements: this.createList(this.state.locations, "add"),
          location_events: this.createEvent(res.data.eventKey, "add"),
        });

        console.log(this.state);
       
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  createList(list, option) {
    let elements = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i] != null){
      elements.push(
        <div key={i}>
          <Card
            style={{
              overflowY: "auto",
              margin: "0 auto",
              marginBottom: "5px",
              width: "300px",
              minHeight: "300px",
              borderRadius: "0px",
              boxShadow:
                "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)"
            }}
          >
            <Card.Img
              style={{ width: "300px", height: "200px", borderRadius: "0px" }}
              variant="top"
              src={list[i].image_url}
              onClick={() => this.openLink(list[i].url)}
            />
            <Card.Body
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap"
              }}
            >
              <Card.Title
                style={{
                  fontSize: "20px",
                  fontFamily: "Roboto, sans-serif",
                  //color: "#212529",
                  color: "#026cdd",
                  textOverflow: "ellipsis",
                }}
                onClick={() => this.openLink(list[i].url)}
              >
                <span>{list[i].name}</span>
              </Card.Title>
              <Card.Subtitle style={{ marginBottom: "16px" }}>
                <ul className="list-unstyled list-inline rating mb-0">
                  {this.getRatingStar(list[i].rating)}
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#6c757d",
                      marginLeft: "10px"
                    }}
                  >
                    {list[i].rating} {"("}
                    {list[i].review_count}
                    {")"}
                  </span>
                </ul>
              </Card.Subtitle>
              <Card.Subtitle
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "16px",
                  marginBottom: "16px"
                }}
              >
                {list[i].price} • {list[i].categories[0].title}
                {option === "add" ? (
                  <i
                    className="fas fa-plus-circle"
                    style={{
                      color: "#8dc63f",
                      marginLeft: "10px",
                      cursor: "pointer",
                      fontSize: "20px"
                    }}
                    onClick={e => {
                      this.addToTripLocations(e, i);
                    }}
                  ></i>
                ) : (
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
                  )}
              </Card.Subtitle>
              <Card.Text style={{ fontSize: "12px" }}>
                {list[i].location.display_address[0]}
                {", "} {list[i].location.display_address[1]}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    }
    }
    return elements;
  }

  createEventList(list, option) {
    let event_elements = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i] != null) {
        event_elements.push(
          <div key={i}>
            <Card
              style={{
                overflowY: "auto",
                margin: "0 auto",
                marginBottom: "5px",
                width: "300px",
                minHeight: "300px",
                borderRadius: "0px",
                boxShadow:
                  "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)"
              }}
            >
              <Card.Img
                style={{ width: "300px", height: "200px", borderRadius: "0px" }}
                variant="top"
                src={list[i].images[0].url}
                onClick={() => this.openLink(list[i].url)}
              />
              <Card.Body
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap"
                }}
              >
                <Card.Title
                  style={{
                    fontSize: "20px",
                    fontFamily: "Roboto, sans-serif",
                    color: "#212529",
                    textOverflow: "ellipsis"
                  }}
                >
                  <span>{list[i].name}</span>
                  <div>
                    <button className="ticket-button"
                      onClick={() => this.openLink(list[i].url)}>find tickets
                 </button>
                  </div>
                </Card.Title>
                <Card.Subtitle style={{ marginBottom: "16px" }}>
                  <ul className="list-unstyled list-inline rating mb-0">
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#6c757d"
                      }}
                    >
                      {list[i]._embedded.venues[0].name}
                    </span>
                  </ul>
                </Card.Subtitle>
                <Card.Subtitle
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "16px",
                    marginBottom: "16px"
                  }}
                >
                  {list[i].dates.start.localDate}  {list[i].dates.start.localTime}
                  {option === "add" ? (
                    <i
                      className="fas fa-plus-circle"
                      style={{
                        color: "#8dc63f",
                        marginLeft: "10px",
                        cursor: "pointer",
                        fontSize: "20px"
                      }}
                      onClick={e => {
                        this.addToEventLocations(e, i);
                      }}
                    ></i>

                  ) : (
                      <i
                        className="fas fa-minus-circle"
                        style={{
                          color: "#cd5c5c",
                          marginLeft: "5px",
                          cursor: "pointer"
                        }}
                        onClick={e => {
                          this.deleteEventLocation(e, i);
                        }}
                      ></i>
                    )}
                </Card.Subtitle>
                <Card.Text style={{ fontSize: "12px" }}>
                  {list[i]._embedded.venues[0].city.name}, {list[i]._embedded.venues[0].state.stateCode}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        );
      }
    }
   
    return event_elements;
  }

  createEvent(key, option) {
    let selectEndDate = null;
    let selectStartDate = null;
    const { startDate, endDate, destination } = this.state;

    if ((startDate.getMonth() + 1) < 10 || (startDate.getDate()) < 10) {
      if ((startDate.getMonth() + 1) < 10 && (startDate.getDate()) < 10) {
        selectStartDate = ((startDate.getFullYear() + "-" + "0" + (startDate.getMonth() + 1) + "-" + "0" + (startDate.getDate())));
      }
      else if ((startDate.getMonth() + 1) < 10 && (startDate.getDate()) >= 10) {
        selectStartDate = ((startDate.getFullYear() + "-" + "0" + (startDate.getMonth() + 1) + "-" + (startDate.getDate())));

      }
      else if ((startDate.getMonth() + 1) >= 10 && (startDate.getDate()) < 10) {
        selectStartDate = ((startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + "0" + (startDate.getDate())));
      }
    }
    else {
      selectStartDate = ((startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + (startDate.getDate())));
    }

    if ((endDate.getMonth() + 1) < 10 || (endDate.getDate()) < 10) {
      if ((endDate.getMonth() + 1) < 10 && (endDate.getDate()) < 10) {
        selectEndDate = ((endDate.getFullYear() + "-" + "0" + (endDate.getMonth() + 1) + "-" + "0" + (endDate.getDate())));
      }
      else if ((endDate.getMonth() + 1) < 10 && (endDate.getDate()) >= 10) {
        selectEndDate = ((endDate.getFullYear() + "-" + "0" + (endDate.getMonth() + 1) + "-" + (endDate.getDate())));

      }
      else if ((endDate.getMonth() + 1) >= 10 && (endDate.getDate()) < 10) {
        selectEndDate = ((endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + "0" + (endDate.getDate())));
      }
    }
    else {
      selectEndDate = ((endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + (endDate.getDate())));
    }
    fetch("https://app.ticketmaster.com/discovery/v2/events.json?sort=date,asc&startDateTime=" + selectStartDate + "T23:59:59Z&endDateTime=" + selectEndDate + "T23:59:59Z&size=200&radius=75&unit=miles&city=" + destination + "&apikey=" + key)
      .then(res => res.json())
      .then(json => {
        let j = 0;
        for (let i = 0; i < json._embedded.events.length; i++) {
          this.state.eventCopy[j] = (json._embedded.events[i]);
          j = j + 1;
        }
        
        this.setState({
          location_events: this.createEventList(this.state.eventCopy, "add")
        });
      })
      .catch(err => {
        console.log(err);
      });
    return this.state.location_events;
  }

  openLink = (e) => {
    window.open(e);
  }

  addToTripLocations(e, i) {
    
    this.setState({ loading: true });
    app.post("trip/addtotriplocation", {
      trip_id: this.state.trip_id,
      trip_location: this.state.locations[i],
 
    })
      .then(res => {
        return app.post("question/searchlocation", {
          trip_id: this.state.trip_id,
          search_term: this.state.search_term
        });
      })
      .then(r => {
        console.log("in addtotrip: ");
        console.log(r.data.user_locations);
        this.setState({
          trip_locations: r.data.user_locations,
        });
       
        this.setState({
          trip_location_elements: this.createList(
            this.state.trip_locations,
            "delete"
          )
        });



        this.setState({ locations: r.data.recs });
        this.setState({
          location_elements: this.createList(this.state.locations, "add"),
        });
        this.setState({ loading: false });

      })
      .catch(err => {
        console.error(err);
      });
  }

  deleteTripLocation(e, i) {
    this.setState({ loading: true });
    app.post("trip/deletefromtriplocations", {
      trip_id: this.state.trip_id,
      trip_location: this.state.trip_locations[i],
    })
      .then(res => {
        return app.post("question/searchlocation", {
          trip_id: this.state.trip_id,
          search_term: this.state.search_term
        });
      })
      .then(r => {
        this.setState({ trip_locations: r.data.user_locations, event_locations: r.data.add_events });
        this.setState({
          trip_location_elements: this.createList(
            this.state.trip_locations,
            "delete"
          )
        });

        this.setState({ locations: r.data.recs });
        this.setState({
          location_elements: this.createList(this.state.locations, "add"),
        });
        this.setState({ loading: false });
      })
      .catch(err => {
        console.error(err);
      });
  }

  addToEventLocations(e, i) {
    this.setState({ loading: true });
    app.post("trip/addtotriplocation", {
      trip_id: this.state.trip_id,
      trip_location_events: this.state.eventCopy[i]
    })
      .then(res => {
        return app.post("question/searchlocation", {
          trip_id: this.state.trip_id,
          search_term: this.state.search_term
        });
      })
      .then(r => {
        this.setState(prevState => ({ trip_location_events: [...prevState.trip_location_events, this.state.eventCopy[i]] }))
        this.setState({
          event_locations: r.data.add_events
        });
       
        this.setState({
          event_list: this.createEventList(
            this.state.event_locations,
            "delete"
          )
        });

        this.setState({
          location_events: this.createEventList(this.state.eventCopy, "add")
        });
        this.setState({ loading: false });

      })
      .catch(err => {
        console.error(err);
      });
  }

  deleteEventLocation(e, i) {
    this.setState({ loading: true });
    app.post("trip/deletefromtriplocations", {
      trip_id: this.state.trip_id,
      trip_location_events: this.state.event_locations[i]
    })
      .then(res => {
        return app.post("question/searchlocation", {
          trip_id: this.state.trip_id,
          search_term: this.state.search_term
        });
      })
      .then(r => {
        var checked = this.state.trip_location_events;
        checked.splice(i, 1);
        this.setState({ trip_location_events: checked });
        this.setState({ event_locations: r.data.add_events });
        this.setState({
          event_list: this.createEventList(
            this.state.event_locations,
            "delete"
          )
        });
        this.setState({
          location_events: this.createEventList(this.state.eventCopy, "add")
        });
        this.setState({ loading: false });
      })
      .catch(err => {
        console.error(err);
      });
  }

  getRatingStar(num) {
    let whole = 0;
    let stars = [];
    for (let i = 1; i < num; i++) {
      whole++;
      stars.push(
        <li className="list-inline-item mr-1" key={i}>
          <i
            className="fas fa-star"
            style={{ color: "#ffbf00", fontSize: "13px" }}
          ></i>
        </li>
      );
    }
    if (whole !== num) {
      stars.push(
        <li className="list-inline-item mr-0" key="half">
          <i
            className="fas fa-star-half-alt"
            style={{ color: "#ffbf00", fontSize: "13px" }}
          ></i>
        </li>
      );
    }
    return stars;
  }
  onChangeSearch = e => {
    this.setState({ search_term: e.target.value });
  };

  searchLocation = e => {
    if (e.key === "Enter") {
      this.setState({ loading: true });
      app.post("question/searchlocation", {
        trip_id: this.state.trip_id,
        search_term: this.state.search_term
      })
        .then(r => {
          this.setState({ locations: r.data.recs });
          this.setState({
            location_elements: this.createList(this.state.locations, "add"),
            event_list: this.createEventList(this.state.eventCopy, "add")
          });
          this.setState({ loading: false });
        })
        .catch(err => {
          console.error(err);
        });
    }
  };
  render() {
    console.log(this.state);
    
    let settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    const LoadingBar = (
      <div id="cupcake" className="box">
        <span className="letter">L</span>

        <div className="cupcakeCircle box">
          <div className="cupcakeInner box">
            <div className="cupcakeCore box"></div>
          </div>
        </div>

        <span className="letter box">A</span>
        <span className="letter box">D</span>
        <span className="letter box">I</span>
        <span className="letter box">N</span>
        <span className="letter box">G</span>
      </div>
    );
    return (
      <div id="backgroundRecommendation" style={{ width: "100%" }}>
        {this.state.loading ? (
          LoadingBar
        ) : (
            <span>
              <div className="searchbar" style={{}}>
                <input
                  type="text"
                  placeholder="Search..."
                  onKeyDown={this.searchLocation}
                  onChange={this.onChangeSearch}
                />
                <div className="search"></div>
              </div>

              {this.state.location_elements.length !== 0 ? (
                <h1
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "20px",
                    fontWeight: "normal",
                    margin: "0 auto 15px auto",
                    width: "80%"
                  }}
                >
                  My Recommendations
                </h1>
              ) : (
                  <span></span>
                )}
              {this.state.location_elements.length !== 0 ? (
                <Slider
                  {...settings}
                  style={{
                    width: "80%",
                    margin: "0 auto"
                  }}
                >
                  {this.state.location_elements}
                </Slider>
              ) : (
                  ""
                )}
              <div className="searchbar">
                <input
                  type="text"
                  placeholder="Search..."
                  onKeyDown={this.searchLocation}
                  onChange={this.onChangeSearch}
                />
                <div className="search"></div>
              </div>

              {this.state.location_events.length != 0 ? (
                <h1
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "20px",
                    fontWeight: "normal",
                    margin: "0 auto 15px auto",
                    //marginTop: "20px",
                    marginTop: "80px",
                    width: "80%"
                  }}
                >
                  Event Recommendations
                </h1>
              ) : (
                  <span></span>
                )}
              {this.state.location_events.length != 0 ? (
                <Slider
                  {...settings}
                  style={{
                    width: "80%",
                    margin: "0 auto"
                  }}
                >
                  {this.state.location_events}
                </Slider>

              ) : (
                  ""
                )}

              <div
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "20px",
                  fontWeight: "normal",
                  margin: "30px auto 15px auto",
                  width: "80%"
                }}
              >
                {this.state.trip_location_elements.length !== 0 ||
                  this.state.event_list.length !== 0 ? (
                    <span>My Trip Locations</span>
                  ) : (
                    ""
                  )}
                <Button
                  variant="info"
                  style={{
                    fontSize: "12px",

                    marginTop: "10px",
                    float: "right"
                  }}
                  href="./schedule">
                  Arrange Trip Schedule
                  </Button>

              </div>

              {this.state.trip_location_elements.length !== 0 ||
                this.state.event_list.length !== 0 ? (
                  <Slider
                    className="placeholderhere"
                    {...settings}
                    style={{
                      width: "80%",
                      margin: "0 auto"
                    }}
                  >
                    {this.state.trip_location_elements}
                    {this.state.event_list}
                  </Slider>
                ) : (
                  ""
                )}
            </span>
          )}
      </div>
    );
  }
}

export default Recommendation;
