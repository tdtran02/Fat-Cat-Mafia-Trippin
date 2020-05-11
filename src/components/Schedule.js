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
import { app } from '../utils/AxiosConfig';
//import AXIOS from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/Schedule.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import $ from "jquery";
import "slick-carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { reduce } from "async";

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
      days_miles: [],
      loading: true
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    app.get("tripinfo/" + this.state.trip_id)
      .then(res => {
        this.setState({ days_miles: res.data.trip.days_miles });
        this.setState({ trip_locations: res.data.trip.trip_locations });
        this.setState({
          trip_location_elements: this.getUserLocationsDroppable(
            this.createList(this.state.trip_locations)
          )
        });
        this.setState({ days: res.data.trip.days });
        this.setState({
          days_elements: this.getDaysDroppable(this.state.days)
        });
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateSchedule = e => {
    this.setState({ loading: true });
    app.post("tripinfo/updateschedule", {
      trip_id: this.state.trip_id,
      days: this.state.days,
      trip_locations: this.state.trip_locations
    })
      .then(res => {
        this.setState({ days_miles: res.data.trip.days_miles });
        this.setState({ trip_locations: res.data.trip.trip_locations });
        this.setState({
          trip_location_elements: this.getUserLocationsDroppable(
            this.createList(this.state.trip_locations)
          )
        });
        this.setState({ days: res.data.trip.days });
        this.setState({
          days_elements: this.getDaysDroppable(this.state.days)
        });

        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

  createList(list) {
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
              <div className="card">
                <div className="row no-gutters">
                  <div
                    className="col-auto"
                    style={{
                      marginTop: "8px",
                      marginLeft: "8px"
                    }}
                  >
                    <img
                      src={list[i].image_url}
                      className="img-fluid"
                      alt=""
                      style={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%"
                      }}
                    />
                  </div>
                  <div className="col">
                    <div className="card-block px-2">
                      <div
                        className="card-text"
                        style={{
                          // fontSize: "18px",
                          textOverflow: "ellipsis"
                        }}
                      >
                        <span>{list[i].name}</span>
                      </div>
                      <ul className="list-unstyled list-inline rating mb-0">
                        {this.getRatingStar(list[i].rating)}
                        <span
                          style={{
                            fontSize: "10px",
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
                          clear: "left",
                          fontSize: "10px"
                        }}
                      >
                        {list[i].price} • {list[i].categories[0].title}
                      </span>
                      <span
                        className="card-text"
                        style={{
                          display: "inline-block",
                          float: "left",
                          clear: "left",
                          fontSize: "10px"
                        }}
                      >
                        {list[i].location.display_address[0]}
                        {", "} {list[i].location.display_address[1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {provided.placeholder}
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
            style={{ color: "#ffbf00", fontSize: "10px" }}
          ></i>
        </li>
      );
    }
    if (whole != num) {
      stars.push(
        <li className="list-inline-item mr-0" key="half">
          <i
            className="fas fa-star-half-alt"
            style={{ color: "#ffbf00", fontSize: "10px" }}
          ></i>
        </li>
      );
    }
    return stars;
  }

  getUserLocationsDroppable(list) {
    return (
      <Droppable droppableId="userlist">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              width: "250px",
              minHeight: "100px",
              maxHeight: "1000px",
              backgroundColor: "#DEE7ED",
              paddingBottom: "5px",
              borderRadius: "5px"
            }}
          >
            <div
              style={{
                marginLeft: "10px",
                paddingTop: "5px",
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px"
              }}
            >
              My Locations
            </div>
            {list}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }

  getDaysDroppable(daysList) {
    const elements = [];
    for (let i = 0; i < daysList.length; i++) {
      {
        elements.push(
          <div style={{ flex: "1" }} key={i}>
            <Droppable droppableId={i.toString()}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  ref={provided.innerRef}
                  style={{
                    width: "250px",
                    minHeight: "100px",
                    maxHeight: "1000px",
                    backgroundColor: "#DEE7ED",
                    paddingBottom: "5px",
                    borderRadius: "5px"
                  }}
                >
                  <div
                    style={{
                      marginLeft: "10px",
                      paddingTop: "5px",
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "16px"
                    }}
                  >
                    Day {i + 1}
                    {this.state.days_miles &&
                      this.state.days_miles.length != 0 &&
                      this.state.days_miles[i] != 0 ? (
                        <span
                          style={{
                            float: "right",
                            marginRight: "20px",
                            fontSize: "12px",
                            paddingTop: "5px"
                          }}
                        >
                          {this.state.days_miles[i].toFixed(2) + " miles"}
                        </span>
                      ) : (
                        ""
                      )}
                  </div>

                  {this.state.days[i].map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="draggable"
                        >
                          <div className="card">
                            <div className="row no-gutters">
                              <div
                                className="col-auto"
                                style={{
                                  marginTop: "8px",
                                  marginLeft: "8px"
                                }}
                              >
                                <img
                                  src={item.image_url}
                                  className="img-fluid"
                                  alt=""
                                  style={{
                                    height: "40px",
                                    width: "40px",
                                    borderRadius: "50%"
                                  }}
                                />
                              </div>
                              <div className="col">
                                <div className="card-block px-2">
                                  <span className="card-text">{item.name}</span>
                                  <ul className="list-unstyled list-inline rating mb-0">
                                    {this.getRatingStar(item.rating)}
                                    <span
                                      style={{
                                        fontSize: "10px",
                                        color: "#6c757d",
                                        marginLeft: "10px"
                                      }}
                                    >
                                      {item.rating} {"("}
                                      {item.review_count}
                                      {")"}
                                    </span>
                                  </ul>
                                  <span
                                    className="card-text"
                                    style={{
                                      display: "inline-block",
                                      float: "left",
                                      clear: "left",
                                      fontSize: "10px"
                                    }}
                                  >
                                    {item.price} • {item.categories[0].title}
                                  </span>
                                  <span
                                    className="card-text"
                                    style={{
                                      display: "inline-block",
                                      float: "left",
                                      clear: "left",
                                      fontSize: "10px"
                                    }}
                                  >
                                    {item.location.display_address[0]}
                                    {", "} {item.location.display_address[1]}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        );
      }
    }
    return elements;
  }

  onDragEnd = result => {
    if (result.destination == null) {
      return;
    }

    if (
      result.source.droppableId == "userlist" &&
      result.destination.droppableId == "userlist"
    ) {
      this.state.trip_locations.splice(
        result.destination.index,
        0,
        this.state.trip_locations.splice(result.source.index, 1)[0]
      );
      this.setState({
        trip_location_elements: this.getUserLocationsDroppable(
          this.createList(this.state.trip_locations)
        )
      });
      return;
    } else if (
      result.source.droppableId == "userlist" &&
      result.destination.droppableId != "userlist"
    ) {
      let item = this.state.trip_locations.splice(result.source.index, 1);
      this.setState({
        trip_location_elements: this.getUserLocationsDroppable(
          this.createList(this.state.trip_locations)
        )
      });
      this.state.days[parseInt(result.destination.droppableId)].splice(
        result.destination.index,
        0,
        item[0]
      );
      this.setState({
        days_elements: this.getDaysDroppable(this.state.days)
      });
    } else if (
      result.source.droppableId != "userlist" &&
      result.destination.droppableId == "userlist"
    ) {
      let item = this.state.days[parseInt(result.source.droppableId)].splice(
        result.source.index,
        1
      );
      this.state.trip_locations.splice(result.destination.index, 0, item[0]);

      this.setState({
        trip_location_elements: this.getUserLocationsDroppable(
          this.createList(this.state.trip_locations)
        )
      });
      this.setState({
        days_elements: this.getDaysDroppable(this.state.days)
      });
    } else if (
      result.source.droppableId != "userlist" &&
      result.destination.droppableId !== "userlist"
    ) {
      let item = this.state.days[parseInt(result.source.droppableId)].splice(
        result.source.index,
        1
      );
      this.state.days[parseInt(result.destination.droppableId)].splice(
        result.destination.index,
        0,
        item[0]
      );

      this.setState({
        trip_location_elements: this.getUserLocationsDroppable(
          this.createList(this.state.trip_locations)
        )
      });
      this.setState({
        days_elements: this.getDaysDroppable(this.state.days)
      });
    }
  };

  render() {
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
      <div>
        {!this.state.loading ? (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div style={{ width: "100%", height: "60px", display: "flex", justifyContent: "space-around", padding: "10px" }}>
              <Button
                style={{
                  textShadow: "1px 1px black",
                  borderRadius: "3px",
                  backgroundColor: "#4a7199",
                  border: "1px solid black"
                }}
                onClick={() => { window.location.href = "/trip/" + this.state.trip_id }}>
                Trip Page
              </Button>
              <Button
                style={{
                  textShadow: "1px 1px black",
                  borderRadius: "3px",
                  backgroundColor: "#4a7199",
                  border: "1px solid black"
                }}

                onClick={() => { window.location.href = "/trip/" + this.state.trip_id + "/recommendations" }}
              >
                Recommendations
              </Button>
              <Button

                style={{
                  textShadow: "1px 1px black",
                  borderRadius: "3px",

                  border: "1px solid black"
                }}
                variant="info"
                onClick={this.updateSchedule}
              >
                Save Schedule
              </Button>
            </div>

            <div
              className="row"
              style={{
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <div className="col-md-3">
                {this.state.trip_location_elements.length != 0
                  ? this.state.trip_location_elements
                  : ""}
              </div>

              <div className="col-md-9">
                {this.state.days.length != 0 ? (
                  <div style={{ display: "flex" }}>
                    {this.state.days_elements}
                  </div>
                ) : (
                    ""
                  )}
              </div>
            </div>
          </DragDropContext>
        ) : (
            LoadingBar
          )}
      </div>
    );
  }
}

export default Schedule;

// getDaysDraggableList(list) {
//   const elements = [];
//   for (let i = 0; i < list.length; i++) {
//     // for (let i = 0; i < 2; i++) {
//     const per_day = [];
//     for (let j = 0; j < list[i].length; j++) {
//       //   for (let j = 0; j < 2; j++) {
//       per_day.push(
//         <Draggable draggableId={i.toString()} index={i} key={list[i][j].id}>
//           {provided => (
//             <div
//               ref={provided.innerRef}
//               {...provided.draggableProps}
//               {...provided.dragHandleProps}
//               className="draggable"
//             >
//               <div className="card">
//                 <div className="row no-gutters">
//                   <div className="col">
//                     <div
//                       className="card-block px-2"
//                       style={{ textOverflow: "ellipsis" }}
//                     >
//                       <span className="card-text">{list[i][j].name}</span>
//                       <ul className="list-unstyled list-inline rating mb-0">
//                         {this.getRatingStar(list[i][j].rating)}
//                         <span
//                           style={{
//                             fontSize: "11px",
//                             color: "#6c757d",
//                             marginLeft: "10px"
//                           }}
//                         >
//                           {list[i][j].rating} {"("}
//                           {list[i][j].review_count}
//                           {")"}
//                         </span>
//                       </ul>
//                       <span
//                         className="card-text"
//                         style={{
//                           display: "inline-block",
//                           float: "left",
//                           clear: "left"
//                         }}
//                       >
//                         {list[i][j].price} • {list[i][j].categories[0].title}
//                       </span>
//                       <span
//                         className="card-text"
//                         style={{
//                           display: "inline-block",
//                           float: "left",
//                           clear: "left"
//                         }}
//                       >
//                         {list[i][j].location.display_address[0]}
//                         {", "} {list[i][j].location.display_address[1]}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </Draggable>
//       );
//     }
//     elements.push(per_day);
//   }
//   return elements;
// }
