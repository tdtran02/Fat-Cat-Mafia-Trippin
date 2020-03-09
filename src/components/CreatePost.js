import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, Input } from 'react-bootstrap';

const AXIOS = require("axios").default;

export class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: " "
        }

    }

    onChangeHandler(event) {
        this.setState({
            comment: event.te
        })
    }

    handleClick() {
        let trip = JSON.parse(localStorage.getItem("trip"));
        let postArr = []
        if (trip.posts == null) {
            trip.posts = [document.getElementById("comment").value]
        }
        else {
            postArr = trip.posts;
            postArr.push(document.getElementById("comment").value);
        }

        const update = {
            owner_id: JSON.parse(localStorage.getItem("user"))._id,
            //    email: JSON.parse(localStorage.getItem('user')).email,
            destination: trip.destination,
            start_date: trip.start_date,
            end_date: trip.end_date,
            trip_name: trip.trip_name,
            days: trip.days,
            posts: postArr
        };
        AXIOS.post("http://localhost:4000/trip/", update)
            .then(res => {
                localStorage.setItem("trip", JSON.stringify(res.data.trip));

                this.setState({ addSurveyShow: true });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <Modal
                {...this.props}

                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        CREATE POST
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form>
                        <Form.Group>
                            <Form.Control id="comment" as="textarea" rows="3" placeholder="Write post..."></Form.Control>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="submit" onClick={this.handleClick}>POST</Button>
                    <Button variant="secondary" onClick={this.props.onHide}>CLOSE</Button>
                </Modal.Footer>
            </Modal>

        )
    }
}
export default CreatePost;