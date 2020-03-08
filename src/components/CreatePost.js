import React, { Component } from 'react';
import { Modal, Button, Form, FormGroup, Input } from 'react-bootstrap';

const AXIOS = require("axios").default;

export class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

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
                            <Form.Control as="textarea" rows="3"></Form.Control>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="submit" onClick={this.props.onHide}>POST</Button>
                </Modal.Footer>
            </Modal>

        )
    }
}
export default CreatePost;