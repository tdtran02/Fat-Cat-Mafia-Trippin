import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import "../styles/EditModal.css";
import { Radio } from 'react-bootstrap';
import MyAccount from './MyAccount.js';

export class EditPhotoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    photoSelected = () => {
        this.props.photoID = document.getElementById('option1');
    }

    handleChange(event) {
        this.setState({
            option: event.target.value
        });

    }

    handleSubmit(event) {
        event.preventDefault();

        console.log(`You chose the ${this.state.option} pizza.`);
    }



    render() {
        //let getSelectedbtn = () => { console.log(document.getSelection.id) }
        let getOption = () => {
            return this.state.option;
        }
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
                    <div class="container-modal">
                        <div class="innercontainer">
                            <form>
                                <label class="pic-options">
                                    <input type="radio" name="profilepics" value="1" onChange={this.handleChange} defaultChecked={this.state.option === '1'} />
                                    <img class="profile-option" id="option1" src={require("./images/profile1.jpg")} onClick={this.props.photoSelected} alt="1" width="100px" height="100px" />
                                </label>
                                <label class="pic-options">
                                    <input type="radio" name="profilepics" value="2" onChange={this.handleChange} defaultChecked={this.state.option === '2'} />
                                    <img class="profile-option" src={require("./images/profile2.jpg")} onClick={this.props.photoSelected} alt="2" width="100px" height="100px" />
                                </label>
                                <label class="pic-options">
                                    <input type="radio" name="profilepics" value="3" onChange={this.handleChange} defaultChecked={this.state.option === '3'} />
                                    <img class="profile-option" src={require("./images/profile3.jpg")} alt="3" width="100px" height="100px" />
                                </label>
                                <label class="pic-options">
                                    <input type="radio" name="profilepics" value="4" onChange={this.handleChange} defaultChecked={this.state.option === '4'} />
                                    <img class="profile-option" src={require("./images/profile4.jpg")} alt="4" width="100px" height="100px" />
                                </label>
                                <label class="pic-options">
                                    <input type="radio" name="profilepics" value="5" onChange={this.handleChange} defaultChecked={this.state.option === '5'} />
                                    <img class="profile-option" src={require("./images/profile5.jpg")} alt="5" width="100px" height="100px" />
                                </label>
                                <label class="pic-options">
                                    <input type="radio" name="profilepics" value="6" onChange={this.handleChange} defaultChecked={this.state.option === '6'} />
                                    <img class="profile-option" src={require("./images/profile6.jpg")} alt="6" width="100px" height="100px" />
                                </label>
                                <label class="pic-options">
                                    <input type="radio" name="profilepics" value="7" onChange={this.handleChange} defaultChecked={this.state.option === '7'} />
                                    <img class="profile-option" src={require("./images/profile7.jpg")} alt="7" width="100px" height="100px" />
                                </label>
                                <label class="pic-options">
                                    <input type="radio" name="profilepics" value="8" onChange={this.handleChange} defaultChecked={this.state.option === '8'} />
                                    <img class="profile-option" src={require("./images/profile8.jpg")} alt="8" width="100px" height="100px" />
                                </label>
                                <label class="pic-options">
                                    <input type="radio" name="profilepics" value="9" onChange={this.handleChange} defaultChecked={this.state.option === '9'} />
                                    <img class="profile-option" src={require("./images/profile9.jpg")} alt="9" width="100px" height="100px" />
                                </label>
                                <label class="pic-options">
                                    <input type="radio" name="profilepics" value="10" onChange={this.handleChange} defaultChecked={this.state.option === '10'} />
                                    <img class="profile-option" src={require("./images/profile10.jpg")} alt="10" width="100px" height="100px" />
                                </label>
                            </form>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/*   <Button variant="danger" onClick={this.props.onHide}>Close</Button> */}
                    <Button type="submit" onClick={this.props.onHide}>Select Photo</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}
export default EditPhotoModal;