import React, { Component } from "react";
import {
  Container,
  Col,
  Row,
  Dropdown,
  Form,
  Button,
  Card,
  Carousel
} from "react-bootstrap";
import AXIOS from "axios";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/Schedule.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd = result => {
    // the item was dropped!
    console.log(result);
    console.log("hi");
    console.log(this.state.trip_locations);
    let new_order = this.state.trip_locations.splice(
      result.destination.index,
      0,
      this.state.trip_locations.splice(result.source.index, 1)[0]
    );
    this.setState({ trip_loations: new_order });
    console.log(this.state);
  };

  componentDidMount() {
    AXIOS.get("http://localhost:4000/tripinfo/" + this.state.trip_id)
      .then(res => {
        this.setState({ trip_locations: res.data.trip.trip_locations });
        this.setState({
          trip_location_elements: this.createList(this.state.trip_locations)
        });

        console.log(res.data.trip);

        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getDayList(days) {
    const elements = [];
    for (let i = 0; i < days.length; i++) {
      elements.push(<div></div>);
    }
  }
  createList(list) {
    // <Draggable draggableId={i.toString()} index={i} key={i}>
    //   {provided => (
    //     <div
    //       ref={provided.innerRef}
    //       {...provided.draggableProps}
    //       {...provided.dragHandleProps}
    //       className="draggable"
    //       //   style={{ background: "green" }}
    //       //   {...provided.draggableplaceholder}
    //     >
    //       {this.state.trip_locations[i].name}
    //     </div>
    //   )}
    // </Draggable>;
    let elements = [];
    for (let i = 0; i < list.length; i++) {
      elements.push(
        <Draggable draggableId={i.toString()} index={i} key={i}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="draggable"
            >
              {/* <Card
                className="flex-row flex-wrap"
                style={{
                  overflowY: "auto",
                  margin: "0 auto",
                  marginBottom: "5px",
                  width: "300px",
                  minHeight: "100px",
                  borderRadius: "0px",
                  boxShadow:
                    "0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)"
                }}
              >
                <Card.Header
                  style={{
                    width: "100%",
                    height: "100px"
                  }}
                >
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      margin: "10px"
                    }}
                    src={list[i].image_url}
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      fontFamily: "Roboto, sans-serif",
                      color: "#212529",
                      width: "230px",
                      height: "50px"
                      //   textOverflow: "ellipsis"
                    }}
                  >
                    <span>{list[i].name}</span>
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
                    <span>
                      {list[i].price} • {list[i].categories[0].title}
                    </span>
                  </span>
                  <Card.Subtitle
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "16px",
                      marginBottom: "16px"
                    }}
                  >
                    {list[i].price} • {list[i].categories[0].title}
                  </Card.Subtitle>
                </Card.Header>
                <Card.Body
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: "250px"
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
                  </Card.Subtitle>
                <Card.Text style={{ fontSize: "12px" }}>
                    {list[i].location.display_address[0]}
                    {", "} {list[i].location.display_address[1]}
                  </Card.Text>
                </Card.Body> */}
              {/* </Card> */}
              <div className="card">
                <div className="row no-gutters">
                  {/* <div class="col-auto">
                    <img
                      src={list[i].image_url}
                      class="img-fluid"
                      alt=""
                      style={{ height: "100px", width: "100px" }}
                    />
                  </div> */}
                  <div className="col">
                    <div
                      className="card-block px-2"
                      style={{ textOverflow: "ellipsis" }}
                    >
                      <span className="card-text">{list[i].name}</span>
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
                      <span
                        className="card-text"
                        style={{
                          display: "inline-block",
                          float: "left",
                          clear: "left"
                        }}
                      >
                        {list[i].price} • {list[i].categories[0].title}
                      </span>
                      <span
                        className="card-text"
                        style={{
                          display: "inline-block",
                          float: "left",
                          clear: "left"
                        }}
                      >
                        {list[i].location.display_address[0]}
                        {", "} {list[i].location.display_address[1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      );
    }
    return elements;
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
    if (whole != num) {
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

  getUserLocationsDroppable(list) {
    return (
      <Droppable droppableId="userlist" style={{ overflow: "scroll" }}>
        {provided => (
          <div
            className="droppable"
            ref={provided.innerRef}
            {...provided.droppableProps}
            //   {...provided.droppablePlaceholder}
          >
            {list}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }

  getDaysDraggableList(list) {
    const elements = [];
    // for (let i = 0; i < list.length; i++) {
    for (let i = 0; i < 5; i++) {
      const per_day = [];
      //   for (let j = 0; j < list[i].length; j++) {
      for (let j = 0; j < 5; j++) {
        per_day.push(
          <Draggable draggableId={i.toString()} index={i}>
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="draggable"
              >
                {/* {list[i].name} */}
                haha
                {provided.placeholder}
              </div>
            )}
          </Draggable>
        );
      }
      elements.push(per_day);
    }
    return elements;
  }

  getDaysDroppable(daysList) {
    const elements = [];
    for (let i = 0; i < daysList.length; i++) {
      {
        elements.push(
          <Droppable droppableId={i.toString()}>
            {provided => (
              <div
                className="droppable"
                ref={provided.innerRef}
                {...provided.droppableProps}
                //   {...provided.droppablePlaceholder}
              >
                {daysList[i]}
              </div>
            )}
          </Droppable>
        );
      }
    }
    return elements;
  }

  render() {
    let settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0
      //   responsive: [
      //     {
      //       breakpoint: 1600,
      //       settings: {
      //         slidesToShow: 3,
      //         slidesToScroll: 3,
      //         infinite: true,
      //         dots: true
      //       }
      //     },
      //     {
      //       breakpoint: 1100,
      //       settings: {
      //         slidesToShow: 2,
      //         slidesToScroll: 2,
      //         initialSlide: 2
      //       }
      //     },
      //     {
      //       breakpoint: 800,
      //       settings: {
      //         slidesToShow: 1,
      //         slidesToScroll: 1
      //       }
      //     }
      //   ]
    };

    let USERLIST;
    if (this.state.trip_location_elements.length != 0) {
      USERLIST = this.getUserLocationsDroppable(
        this.state.trip_location_elements
      );
    } else {
      USERLIST = "";
    }

    let x = this.getDaysDraggableList(this.state.days);
    console.log(x);
    let DAYLIST = this.getDaysDroppable(x);
    console.log(DAYLIST);

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div style={{ backgroundColor: "yellow" }}>
          <div
            style={{
              width: "300px",
              backgroundColor: "red"
            }}
          >
            {USERLIST}
          </div>

          <Carousel
            style={{
              height: "400px",
              background: "black",
              width: "100%",
              float: "right"
            }}
          >
            <Carousel.Item>
              <div style={{ width: "300px", margin: "0 auto" }}>
                <Droppable
                  droppableId="2"
                  style={{
                    overflow: "scroll",
                    backgroundColor: "white",
                    color: "white"
                  }}
                >
                  {provided => (
                    <div
                      //   className="droppable"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      //   {...provided.droppablePlaceholder}
                    >
                      XD
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=Second slide&bg=282c34"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=Third slide&bg=20232a"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        {/* <span
          style={{
        
            width: "300px",
            backgroundColor: "red"
          }}
        >
          {USERLIST}
        </span>

        <span
          style={{
            width: "1000px",
            background: "yellow",
            margin: "0 auto"
          }}
        >
          <Slider
            className="placeholderhere"
            {...settings}
            style={{
              width: "80%",
              margin: "0 auto"
            }}
          >
            {DAYLIST}
          </Slider>
        </span> */}

        {/* <Droppable droppableId="2" style={{ overflow: "scroll" }}>
          {provided => (
            <div
              className="droppable"
              ref={provided.innerRef}
              {...provided.droppableProps}
              //   {...provided.droppablePlaceholder}
            >
             
              {provided.placeholder}
            </div>
          )}
        </Droppable> */}
      </DragDropContext>
    );
  }
}

export default Schedule;
