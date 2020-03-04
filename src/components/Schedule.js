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
// import "../styles/Recommendation.scss";
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
      loading: true,
      initialData: {
        column: {
          id: "column-1",
          numberIds: ["four", "one", "five", "three", "two"]
        },
        numbers: {
          five: { id: "five", content: "5" },
          four: { id: "four", content: "4" },
          one: { id: "one", content: "1" },
          three: { id: "three", content: "3" },
          two: { id: "two", content: "2" }
        }
      }
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // the item was dropped!
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
    const numbers = this.state.initialData.column.numberIds.map(
      numberId => this.state.initialData.numbers[numberId]
    );
    const list = [];
    for (let i = 0; i < this.state.trip_locations.length; i++) {
      list.push(
        <div style={{ border: "1px solid black", margin: "10px" }} key={i}>
          {this.state.trip_locations[i].name}
        </div>
      );
    }
    let id2 = "2";
    let index2 = 22;
    let id3 = "3";
    let index3 = 33;
    return (
      <DragDropContext droppableId="1" onDragEnd={this.onDragEnd}>
        <Droppable droppableId="1">
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...provided.droppablePlaceholder}
            >
              <Draggable draggableId={id2} index={index2}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    1
                  </div>
                )}
              </Draggable>
              <Draggable draggableId={id3} index={index3}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    2
                  </div>
                )}
              </Draggable>
            </div>
          )}
        </Droppable>
        {/* <div column={this.state.column}></div> */}
      </DragDropContext>
      //   <Droppable
      //     droppableId="1"
      //     style={{ width: "200px", border: "1px solid black" }}
      //   >
      //     {provided => (
      //       <span innerRef={provided.innerRef} {...provided.droppableProps}>
      //         {list.length != 0 ? list : ""}
      //       </span>
      //     )}
      //   </Droppable>
    );
  }
}

export default Schedule;
