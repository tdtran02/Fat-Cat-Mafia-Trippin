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

        console.log(this.state);

        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
      });
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
              <div class="card">
                <div class="row no-gutters">
                  {/* <div class="col-auto">
                    <img
                      src={list[i].image_url}
                      class="img-fluid"
                      alt=""
                      style={{ height: "100px", width: "100px" }}
                    />
                  </div> */}
                  <div class="col">
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

  render() {
    const list = [];
    for (let i = 0; i < this.state.trip_locations.length; i++) {
      list.push(
        <Draggable draggableId={i.toString()} index={i} key={i}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="draggable"
              //   style={{ background: "green" }}
              //   {...provided.draggableplaceholder}
            >
              {this.state.trip_locations[i].name}
            </div>
          )}
        </Draggable>
      );
    }
    return (
      <DragDropContext droppableId="1" onDragEnd={this.onDragEnd}>
        <Droppable
          droppableId="1"
          style={{ overflow: "scroll", height: "50px", background: "yellow" }}
        >
          {provided => (
            <div
              className="droppable"
              ref={provided.innerRef}
              {...provided.droppableProps}
              //   {...provided.droppablePlaceholder}
            >
              {this.state.trip_location_elements.length != 0
                ? this.state.trip_location_elements
                : ""}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="2" style={{ overflow: "scroll" }}>
          {provided => (
            <div
              className="droppable"
              ref={provided.innerRef}
              {...provided.droppableProps}
              //   {...provided.droppablePlaceholder}
            >
              {/* {this.state.trip_location_elements.length != 0
                ? this.state.trip_location_elements
                : ""} */}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default Schedule;
