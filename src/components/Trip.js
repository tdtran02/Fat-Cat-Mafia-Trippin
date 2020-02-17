import React, { Component } from "react";
import "../styles/Trip.css";
import {Survey} from "./Survey"
import { Button, ButtonToolbar } from 'react-bootstrap';

export class Trip extends Component {


    constructor(props) {
        super(props);
        this.state = { editPhotoShow: false, option: '2', addSurveyShow: false};

    }



    render() {

        let addSurveyClose =() => this.setState({addSurveyShow: false});

        return (
            <div>
            <div className="container-form">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">TRAVEL</h3>
                    </div>
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
                                        <input className="form-control" type="date" name="start-day" min="2020-02-10" max="2022-02-10" required></input>
                                            <span className="validity"></span>
                                        </label>
                                    </form>
                                </div>
                                <div className="col-md-6">
                                    <form>
                                        <label htmlFor="control-label">End Date
                                        <input className="form-control" type="date" name="end-day" min="2020-02-11" max="2022-02-11" required></input>
                                            <span className="validity"></span>
                                        </label>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ButtonToolbar>
                        <Button variant='primary'
                        onClick={() => this.setState({addSurveyShow: true})}
                        >Let's Go!</Button>
                        <Survey
                            show={this.state.addSurveyShow}
                            onHide={addSurveyClose}
                            closeButton={addSurveyClose}
                        />
                    </ButtonToolbar>
                </div>
            </div>
            </div>

        );
    }
}



export default Trip;

