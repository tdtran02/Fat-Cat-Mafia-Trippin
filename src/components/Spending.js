import React, { Component } from "react";
import { app } from '../utils/AxiosConfig';
//import AXIOS from "axios";
import { Form, Button, ListGroup, Row, ListGroupItem } from "react-bootstrap";
import "../styles/Spending.css";

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip_id: this.props.match.params.id,
      spendings: [],
      spendings_elements: [],
      total_miles: 0,
      number_people: 0,
      itemname: "",
      itemamount: ""
    };
  }

  componentDidMount() {
    app.get("tripinfo/" + this.state.trip_id)
      .then(res => {
        const MILES = res.data.trip.days_miles;
        let total_miles = 0;
        for (let i = 0; i < MILES.length; i++) {
          total_miles += MILES[i];
        }
        this.setState({ total_miles: total_miles });

        this.setState({ number_people: res.data.trip.buddies.length });
        this.setState({ number_people: 6 });
        return app.get(
          "spending/" + this.state.trip_id
        );
      })
      .then(r => {
        this.setState({ spendings: r.data.spendings });
        this.setState({
          spendings_elements: this.createSpendingList(this.state.spendings)
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  change = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  submitItem = () => {
    app.post("spending/add", {
      trip_id: this.state.trip_id,
      itemname: this.state.itemname,
      itemamount: this.state.itemamount
    })
      .then(r => {
        this.setState({ spendings: r.data.spendings });
        this.setState({
          spendings_elements: this.createSpendingList(this.state.spendings)
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteItem(id) {
    app.post("spending/delete", {
      trip_id: this.state.trip_id,
      itemid: id
    })
      .then(r => {
        this.setState({ spendings: r.data.spendings });
        this.setState({
          spendings_elements: this.createSpendingList(this.state.spendings)
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  createSpendingList(list) {
    let elements = [];
    let total_amount = 0;
    for (let i = 0; i < list.length; i++) {
      total_amount += list[i].amount;
      elements.push(
        <ListGroup.Item key={i} className="item">
          <span>{list[i].name}</span>

          <span className="delete" style={{ float: "right" }}>
            <span
              className="fa fa-trash"
              onClick={() => this.deleteItem(list[i]._id)}
            ></span>
          </span>
          <span style={{ float: "right", marginRight: "10px" }}>
            {"$" + list[i].amount}
          </span>
        </ListGroup.Item>
      );
    }
    elements.push(
      <ListGroup.Item key="total" style={{ borderTop: "1px solid black" }}>
        <span>Total</span>

        <span style={{ float: "right", marginRight: "10px" }}>
          {"$" + total_amount.toFixed(2)}
        </span>
      </ListGroup.Item>
    );
    elements.push(
      <ListGroup.Item key="perperson">
        <span>Total per Person</span>

        <span style={{ float: "right", marginRight: "10px" }}>
          {"$" + (total_amount / this.state.number_people).toFixed(2)}
        </span>
      </ListGroup.Item>
    );
    return elements;
  }

  render() {
    return (
      <div
        style={{
          width: "500px",
          boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
          borderRadius: "2px",
          margin: "0 auto",
          marginTop: "100px"
        }}
      >
        <Form style={{ width: "90%", margin: "0 auto", paddingTop: "10px" }}>
          <Form.Group
            style={{
              display: "inline-block",
              width: "150px",
              marginLeft: "10px",
              marginRight: "10px"
            }}
          >
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Item Name"
              name="itemname"
              onChange={this.change}
              required
            />
          </Form.Group>

          <Form.Group style={{ display: "inline-block", width: "150px" }}>
            <Form.Label>Item Amount</Form.Label>
            <Form.Control
              type="text"
              placeholder="Item Amount"
              name="itemamount"
              onChange={this.change}
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={this.submitItem}
            style={{ marginLeft: "10px", height: "40px" }}
          >
            Submit
          </Button>
        </Form>
        <div style={{ width: "90%", margin: "0 auto" }}>
          <div>Milage: {this.state.total_miles.toFixed(2)}</div>
          <div>Number of People: {this.state.number_people}</div>
        </div>

        <ListGroup
          variant="flush"
          style={{ width: "90%", margin: "0 auto", paddingBottom: "10px" }}
        >
          <ListGroup.Item style={{ fontWeight: "bold" }}>
            <span>Item</span>
            <span style={{ float: "right", marginRight: "10px" }}>Amount</span>
          </ListGroup.Item>
          {this.state.spendings_elements}
        </ListGroup>
      </div>
    );
  }
}
export default Schedule;
