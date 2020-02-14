import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "../styles/EditModal.css";


const AXIOS = require("axios").default;

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

        /*   let x = JSON.parse(localStorage.getItem('user'));
          console.log(JSON.stringify(x));
          x.image = this.state.image;
          console.log(JSON.stringify(x));
          localStorage.setItem("user", JSON.stringify(x));
          //  localStorage.setItem("user", JSON.stringify(response.data.user));
          //console.log(`You chose the ${this.state.option} pizza.`); */
        const update = {
            _id: JSON.parse(localStorage.getItem('user'))._id,
            //    email: JSON.parse(localStorage.getItem('user')).email,
            first_name: JSON.parse(localStorage.getItem('user')).first_name,
            last_name: JSON.parse(localStorage.getItem('user')).last_name,
            //    password: JSON.parse(localStorage.getItem('user')).password,
            image: this.state.option,
            __v: this.state.__v
        }
        AXIOS.put('http://localhost:4000/user' + JSON.parse(localStorage.getItem('user'))._id, update)
            .then(res => console.log(res.data));

    }




    render() {
        //let getSelectedbtn = () => { console.log(document.getSelection.id) }

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
                    <div className="container-modal">
                        <div className="innercontainer">
                            <form onSubmit={this.handleSubmit}>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="1" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile1.jpg'} />
                                    <img className="profile-option" id="option1" src={require("./images/profile1.jpg")} onClick={this.props.photoSelected} alt="1" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="2" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile2.jpg'} />
                                    <img className="profile-option" src={require("./images/profile2.jpg")} onClick={this.props.photoSelected} alt="2" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="3" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile3.jpg'} />
                                    <img className="profile-option" src={require("./images/profile3.jpg")} alt="3" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="4" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile4.jpg'} />
                                    <img className="profile-option" src={require("./images/profile4.jpg")} alt="4" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="5" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile5.jpg'} />
                                    <img className="profile-option" src={require("./images/profile5.jpg")} alt="5" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="6" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile6.jpg'} />
                                    <img className="profile-option" src={require("./images/profile6.jpg")} alt="6" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="7" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile7.jpg'} />
                                    <img className="profile-option" src={require("./images/profile7.jpg")} alt="7" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="8" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile8.jpg'} />
                                    <img className="profile-option" src={require("./images/profile8.jpg")} alt="8" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="9" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile9.jpg'} />
                                    <img className="profile-option" src={require("./images/profile9.jpg")} alt="9" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="10" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile10.jpg'} />
                                    <img className="profile-option" src={require("./images/profile10.jpg")} alt="10" width="100px" height="100px" />
                                </label>
                                <Button type="submit" onClick={this.props.onHide}>Select Photo</Button>
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