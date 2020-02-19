import React, { Component } from "react";
import "../styles/Trip.css";
import {Survey} from "./Survey"
import { Button, ButtonToolbar } from 'react-bootstrap';
const AXIOS = require("axios").default;

export class Trip extends Component {


    constructor(props) {
        super(props);
        this.state = {
            owner_id: "",
            destination: "",
            start_date: null,
            end_date: null,
            // length: null,
        };
    
        //this.handleSubmit = this.handleSubmit.bind(this);
        //this.Click = this.onChange.bind(this);
    };
    componentDidMount() {
        AXIOS.get(
            "http://localhost:4000/trip/" +
            JSON.parse(localStorage.getItem("user"))._id
        ).then(res => {
            this.setState({ trip: res.data.trip });
        })
        .catch(err => {
            console.log(err);
        });
    };
    tripOnChange(e){
        this.setState({destination: e.target.value});
    }
    /*onCreateFieldClick = () => {
        const USER = JSON.parse(localStorage.getItem("user"));
        AXIOS.post("http://localhost:4000/trip/add", {
            user_id: USER._id,
        }
    }*/
    onCreateFieldClick(e) {
        //const USER = JSON.parse(localStorage.getItem("trip"));
        console.log("teestinggg");
        var x = document.getElementById("arrival_location").value;
        var y = document.getElementById("start-day").value;
        var z = document.getElementById("end-day").value;
        console.log(y);
        console.log(x);

        const update = {
            trip: {
                owner_id: JSON.parse(localStorage.getItem('user'))._id,
                //    email: JSON.parse(localStorage.getItem('user')).email,
                destination: x,
                start_date: y,
                end_date: z,
            }
        }
        console.log(JSON.stringify(update));
        AXIOS.post('http://localhost:4000/trip/' + JSON.parse(localStorage.getItem('user'))._id, update)
        .then(res => console.log(res.data))
        .catch(err => { console.log(err) });
        e.preventDefault();
    }
    render() {
        return (
            <div className="background-container">
                {/*<div>
                    <img className="pic-background"
                    src={require("./images/trip_photo_2.png")}
                    alt="road"
                    />
                </div>*/}
                {/*<div className="container-form">
                    <div className="panel-heading">
                            <h3 className="panel-title">Start Your New Itinerary </h3>
                        </div>
                </div>*/}
                <div className="container-form">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3 className="panel-title">Itinerary</h3>
                        </div>
                        <form id="update" onSubmit={this.onCreateFieldClick}>
                            <div className="panel-body">
                                <br></br>
                                <div id="location">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="control-label">Departure</label>
                                            <input className="form-control" id="departue_location" placeholder="City Country Depart"></input>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="control-label">Arrival</label>
                                            <input className="form-control" id="arrival_location" placeholder="City Country Arrive"></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <form>
                                                <label htmlFor="control-label">Start Date
                                                    <input className="form-control" type="date" id="start-day" min="2020-02-16" max="2022-02-16" required></input>
                                                    <span className="validity"></span>
                                                </label>
                                            </form>
                                        </div>
                                        <div className="col-md-6">
                                            <form>
                                                <label htmlFor="control-label">End Date
                                                    <input className="form-control" type="date" id="end-day" min="2020-02-17" max="2022-02-17" required></input>
                                                    <span className="validity"></span>
                                                </label>
                                            </form>
                                        </div>
                                    </div>
                                    {/*<div className="buttons">
                                        <ButtonToolbar>
                                        <Button variant="outline-light" type="submit">
                                            Create
                                        </Button>
                                        </ButtonToolbar>
                                    </div>*/}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Button className="ml-3" variant="info" onClick={this.onCreateFieldClick}>
                                                Create
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/*<ButtonToolbar>
                        <Button variant='primary'
                        onClick={() => this.setState({addSurveyShow: true})}
                        >Let's Go!</Button>
                        <Survey
                            show={this.state.addSurveyShow}
                                onHide={addSurveyClose}
                            closeButton={addSurveyClose}
                        />
                    </ButtonToolbar>*/}
                </div>
            </div>

        );
    }
}



export default Trip;

