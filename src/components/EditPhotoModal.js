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
        console.log(this.state.option);
        let x = JSON.parse(localStorage.getItem('user'));
        console.log(localStorage.getItem('user'));
        x.image = this.state.image;


        //localStorage.setItem("user", JSON.stringify(x));

        //console.log(`You chose the ${this.state.option} pizza.`); 
        let update = {
            user: {
                _id: JSON.parse(localStorage.getItem('user'))._id,
                email: JSON.parse(localStorage.getItem('user')).email,
                first_name: JSON.parse(localStorage.getItem('user')).first_name,
                last_name: JSON.parse(localStorage.getItem('user')).last_name,
                password: JSON.parse(localStorage.getItem('user')).password,
                image: this.state.option,
                __v: JSON.parse(localStorage.getItem('user')).__v
            }

        }
        console.log(update.user.toString);

        AXIOS.put('http://localhost:4000/user/' + JSON.parse(localStorage.getItem('user'))._id, update)
            .then(res => console.log(res.data))
            .catch(err => { console.log(err) });


        AXIOS.get('http://localhost:4000/user/' + JSON.parse(localStorage.getItem('user'))._id)
            .then(response => {
                console.log(JSON.stringify(response.data.user))
                localStorage.setItem("user", JSON.stringify(response.data.user));
                document.location.href = "/MyAccount";
            })
            .catch(function (error) {
                console.log(error);
            })

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
                                    <input type="radio" name="profilepics" value="./images/profile1.jpg" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile1.jpg'} />
                                    <img className="profile-option" id="option1" src={require("./images/profile1.jpg")} onClick={this.props.photoSelected} alt="1" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="./images/profile2.jpg" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile2.jpg'} />
                                    <img className="profile-option" src={require("./images/profile2.jpg")} onClick={this.props.photoSelected} alt="2" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="./images/profile3.jpg" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile3.jpg'} />
                                    <img className="profile-option" src={require("./images/profile3.jpg")} alt="3" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="./images/profile4.jpg" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile4.jpg'} />
                                    <img className="profile-option" src={require("./images/profile4.jpg")} alt="4" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="./images/profile5.jpg" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile5.jpg'} />
                                    <img className="profile-option" src={require("./images/profile5.jpg")} alt="5" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="./images/profile6.jpg" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile6.jpg'} />
                                    <img className="profile-option" src={require("./images/profile6.jpg")} alt="6" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="./images/profile7.jpg" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile7.jpg'} />
                                    <img className="profile-option" src={require("./images/profile7.jpg")} alt="7" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="./images/profile8.jpg" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile8.jpg'} />
                                    <img className="profile-option" src={require("./images/profile8.jpg")} alt="8" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="./images/profile9.jpg" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile9.jpg'} />
                                    <img className="profile-option" src={require("./images/profile9.jpg")} alt="9" width="100px" height="100px" />
                                </label>
                                <label className="pic-options">
                                    <input type="radio" name="profilepics" value="./images/profile10.jpg" onChange={this.handleChange} defaultChecked={this.state.option === './images/profile10.jpg'} />
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