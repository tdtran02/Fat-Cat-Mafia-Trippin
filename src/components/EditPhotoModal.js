import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "../styles/EditModal.css";
import { app } from '../utils/AxiosConfig';


export class EditPhotoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: '',
            profileImg: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);

        this.onFileChange = this.onFileChange.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    photoSelected = () => {
        this.props.photoID = document.getElementById('option1');
    }


    onChangeHandler(event) {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0
        })
    }

    handleChange(event) {

        if (event.target.value != null) {
            this.setState({
                option: event.target.value
            });
        }
    }

    handleSubmit(event) {
        //  if (event.target.value != null) {
        event.preventDefault();
        console.log(this.state.option);
        let x = JSON.parse(localStorage.getItem('user'));
        console.log(localStorage.getItem('user'));
        x.image = this.state.image;

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

        app.put('user/' + JSON.parse(localStorage.getItem('user'))._id, update)
            .then(res => console.log(res.data))
            .catch(err => { console.log(err) });


        app.get('user/' + JSON.parse(localStorage.getItem('user'))._id)
            .then(response => {
                console.log(JSON.stringify(response.data.user))
                localStorage.setItem("user", JSON.stringify(response.data.user));
                document.location.href = "/MyAccount";
            })
            .catch(function (error) {
                console.log(error);
            })
        //   }
        if (this.state.selectedFile !== "") {
            const data = new FormData();
            data.append('file', this.state.selectedFile);
        }
        else {
            console.log("FAIL");
        }


    }
    onFileChange(e) {
        this.setState({ profileImg: e.target.files[0] })
    }
    onClickHandler(e) {
        e.preventDefault()
        const file = document.getElementById('inputGroupFile01').files
        const formData = new FormData()

        formData.append('profileImg', this.state.profileImg)

        fetch('http://localhost:4000/user/' + JSON.parse(localStorage.getItem('user'))._id + '/profile', {
            method: 'POST',
            body: formData,
        }).then(r => {
            console.log(r)
        })
        console.log(this.state.profileImg)
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
                                <div className="horizontal">
                                    <div className="icons">
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
                                    </div>
                                    <div className="container-form">
                                        <div className="row">
                                            <div className="offset-md-3 col-md-6">
                                                <div className="form-group files">
                                                    <label>Upload Your File</label>
                                                    <input type="file" className="form-contr" name="file" onChange={this.onChangeHandler} />

                                                </div>
                                                <div className="input-group mb-3">
                                                    <div className="custom-file">
                                                        <input
                                                            type="file"
                                                            className="custom-file-input"
                                                            id="inputGroupFile01"
                                                            aria-describedby="inputGroupFileAddon01"
                                                        />
                                                        <label className="custom-file-label" htmlFor="inputGroupFile01" onChange={this.onFileChange}>
                                                            Choose file
                                                    </label>
                                                    </div>
                                                </div>
                                                <button type="button" className="btn btn-primary" onChange={this.onClickHandler}>
                                                    Upload
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button type="submit" onClick={this.props.onHide}>Select Photo</Button>
                            </form>

                        </div>
                    </div>
                </Modal.Body>
                {/*                 <Modal.Footer>
                    <Button type="submit" onClick={this.props.onHide}>Select Photo</Button>
                </Modal.Footer> */}
            </Modal>
        );
    }

}
export default EditPhotoModal;