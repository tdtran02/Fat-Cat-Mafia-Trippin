import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import "../styles/EditModal.css";

export class EditPhotoModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Photo
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="container">
                        <div class="innercontainer">
                            <button><img class="profile-option" src={require("./images/profile1.jpg")} alt="1" width="100px" height="100px" /></button>
                            <button><img class="profile-option" src={require("./images/profile2.jpg")} alt="2" width="100px" height="100px" /></button>
                            <button><img class="profile-option" src={require("./images/profile3.jpg")} alt="3" width="100px" height="100px" /></button>
                            <button><img class="profile-option" src={require("./images/profile4.jpg")} alt="4" width="100px" height="100px" /></button>
                            <button><img class="profile-option" src={require("./images/profile5.jpg")} alt="5" width="100px" height="100px" /></button>
                            <button><img class="profile-option" src={require("./images/profile6.jpg")} alt="6" width="100px" height="100px" /></button>
                            <button><img class="profile-option" src={require("./images/profile7.jpg")} alt="7" width="100px" height="100px" /></button>
                            <button><img class="profile-option" src={require("./images/profile8.jpg")} alt="8" width="100px" height="100px" /></button>
                            <button><img class="profile-option" src={require("./images/profile9.jpg")} alt="9" width="100px" height="100px" /></button>
                            <button><img class="profile-option" src={require("./images/profile10.jpg")} alt="10" width="100px" height="100px" /></button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}