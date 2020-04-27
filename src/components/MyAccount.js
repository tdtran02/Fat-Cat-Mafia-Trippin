import React, { Component, useState } from "react";
import "../styles/MyAccount.css";
import { Button, ButtonToolbar, Alert, Card, Form } from 'react-bootstrap';
import { EditPhotoModal } from './EditPhotoModal';
import { app } from '../utils/AxiosConfig';
import Footer from "./TrippinPage/footer";

//const AXIOS = require("axios").default;

export class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editPhotoShow: false,
      option: '2',
      image: "./images/profilepic.png",
      id: "",
      email: "",
      first_name: "",
      last_name: "",
      __v: "",
      hometown: "",
      updateflag: false,

      multerImage: "./image/placehoder.png",
    };


    this.handleSubmit = this.handleSubmit.bind(this);
    this.Click = this.onChange.bind(this);

    if (JSON.parse(localStorage.getItem('user')).image == null) {

      this.state = {
        image: "./images/profilepic.png"
      };
    }

  };
  setDefaultImage(uploadType) {
    if (uploadType === "multer") {
      this.setState({
        multerImage: "./image/placeholder.png"
      });
    }
  }
  componentDidMount() {
    //  console.log(this.state.user.email);
    app.get('user/' + JSON.parse(localStorage.getItem('user'))._id)
      .then(response => {
        console.log(response.data.user.email);
        this.setState({ email: response.data.user.email });
        this.setState({ first_name: response.data.user.first_name });
        this.setState({ last_name: response.data.user.last_name });
        this.setState({ __v: response.data.user.__v });
        // if (response.data.user.image != null) {
        //   this.setState({ image: response.data.user.image });
        // }

        if (response.data.user.hometown != null) {
          this.setState({ hometown: response.data.user.hometown })
        }
        console.log(this.state.first_name);
      })
      .catch(function (error) {
        console.log(error);
      })

  };
  uploadImage(e, method) {
    let imageObj = {};
    if (method === "multer") {
      let imageFormObj = new FormData();
      imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("imageData", e.target.files[0]);

      // stores a readable instance of 
      // the image being uploaded using multer

      this.setState({
        multerImage: URL.createObjectURL(e.target.files[0])
      });
      app.post('user/profileImage/' + JSON.parse(localStorage.getItem('user'))._id, imageFormObj).then((data) => {
        if (data.data.success) {
          alert("Image has been successfully upload using multer");
          this.setDefaultImage("multer");
          const update = {
            image: {
              owner_id: JSON.parse(localStorage.getItem('user'))._id,
              imageCate: "profile",
            }
          }
          console.log(JSON.stringify(update));
          app.put('userImageUpdate/' + JSON.parse(localStorage.getItem('user'))._id, update)
            .then(
              res => console.log(res.data),
              alert("Image has been successfully updated in user profile")
            )
            .catch(err => { console.log(err) });
        }
      })
        .catch((err) => {
          alert("Error while uploading image using multer");
          this.setDefaultImage("multer");
        });
    }
  }
  onChange(event) {
    console.log(this.state.first_name)
    console.log(event.target.value)
    this.setState({ first_name: event.target.value });
  };

  handleSubmit(e) {
    //alert("Your Profile Has Been Updated")
    console.log("teestinggg");
    var x = document.getElementById("first-name").value;
    var y = document.getElementById("last-name").value;
    var z = document.getElementById("hometown").value;
    console.log(z);
    if (x === "") {
      x = JSON.parse(localStorage.getItem('user')).first_name;
    }
    if (y === "") {
      y = JSON.parse(localStorage.getItem('user')).last_name;
    }
    if (z === "") {
      if (JSON.parse(localStorage.getItem('user')).hometown == null) {
        z = "";
      }
      else {
        z = JSON.parse(localStorage.getItem('user')).hometown;
      }
    }
    console.log(x);

    this.setState({ __v: this.state.__v });

    const update = {
      user: {
        _id: JSON.parse(localStorage.getItem('user'))._id,
        first_name: x,
        last_name: y,
        image: this.state.image,
        __v: this.state.__v,
        hometown: z
      }

    }
    console.log(JSON.stringify(update));
    app.put('user/' + JSON.parse(localStorage.getItem('user'))._id, update)
      .then(res => console.log(res.data))
      .catch(err => { console.log(err) });

    this.setState({ updateflag: true });
    e.preventDefault();
    window.location.href = "/MyAccount";
  }


  render() {
    let editModalClose = () => this.setState({ editPhotoShow: false });

    return (
      <div style={{ height: "100%" }}>
        <div className="image-container" style={{
          height: "100%",
          backgroundImage: "url(https://wallpaperscute.com/wp-content/uploads/2019/05/Sunset-Wallpaper-For-Desktop.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          overflow: "auto",
          display: "flex"
        }}>
          <div style={{ height: "100%", display: "flex", width: "100%" }}>
            <Card style={{
              height: "60%", margin: "3%", borderRadius: "5px",
              border: "2px solid gray",
              boxSizing: "border-box",
              borderRadius: "20px",
              boxShadow: "8px 8px 50px #000",
              color: "#6c757d",
              width: "30%",
              maxWidth: "350px",
              minWidth: "250px"
            }}>
              <Card.Body>
                <div style={{ display: "flex", alignContent: "center" }}>
                  <img className="responsive"
                    src={require(`${this.state.image}`)}
                    alt="profile" style={{
                      display: "block",
                      margin: "5px auto",
                      width: "200px",
                      border: "1px solid black"
                    }} />
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "column"
                }}>
                  <Button style={{
                    margin: "5px auto"
                  }} variant="outline-dark" onClick={() => { this.setState({ editPhotoShow: true }) }}>CHANGE PHOTO</Button>
                  <EditPhotoModal
                    show={this.state.editPhotoShow}
                    onHide={editModalClose}
                    handler={this.handler}
                    size="lg"
                    style={{ maxWidth: '1600px', width: '80%' }}
                  />
                  <div style={{
                    margin: "5px auto"
                  }}>
                    <label id="same-line" style={{
                      marginRight: "5px"
                    }}><strong>NAME: </strong></label>
                    <label>{`  ${this.state.first_name}  ${this.state.last_name}`}</label>
                  </div>
                  <div style={{
                    margin: "5px auto"
                  }}>
                    <label id="same-line" style={{
                      marginRight: "5px"
                    }}><strong>HOMETOWN: </strong></label>
                    <label>{`${this.state.hometown}`}</label>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card style={{
              margin: "3%",
              borderRadius: "5px",
              border: "2px solid gray",
              boxSizing: "border-box",
              borderRadius: "20px",
              boxShadow: "8px 8px 50px #000",
              color: "#6c757d",
              height: "80%",
              minWidth: "800px"
            }}>
              <Card.Header as="h3">UPDATE PROFILE</Card.Header>
              <Card.Body>
                <Form>
                  <div style={{
                    display: "flex",
                    width: "400px",
                    margin: "5px auto",
                    alignItems: "center"
                  }}>
                    <Form.Label style={{
                      margin: "0 15px 0 32px"
                    }}>FIRST NAME:</Form.Label>
                    <Form.Control id="first-name" type="text" placeholder="ENTER FIRST NAME" style={{
                      width: "230px"
                    }} />
                  </div>
                  <div style={{ display: "flex", width: "400px", margin: "5px auto" }}>
                    <Form.Label style={{
                      margin: "0 15px 0 35px"
                    }}>LAST NAME:</Form.Label>
                    <Form.Control id="last-name" type="text" placeholder="ENTER LAST NAME" style={{
                      width: "230px"
                    }} />
                  </div>
                  <div style={{ display: "flex", width: "400px", margin: "5px auto" }}>
                    <Form.Label style={{
                      margin: "0 15px 0 28px"
                    }}>HOMETOWN:</Form.Label>
                    <Form.Control id="hometown" type="text" placeholder="ENTER HOMETOWN" style={{
                      width: "230px"
                    }} />
                  </div>
                  <div style={{ display: "flex" }}>
                    <Button className="buttons" onClick={this.handleSubmit} variant="outline-success" type="submit"
                      style={{ margin: "15px auto" }}>
                      UPDATE</Button>
                  </div>

                  <div className="image-container">
                    <div className="process">
                      <h4 className="process_heading">Process: Using Multer</h4>
                      <p className="process_details">Upload image to a node server, connected to a MongoDB database, with the help of multer</p>

                      <input type="file" className="process_upload-btn" onChange={(e) => this.uploadImage(e, "multer")} />
                      <img src={this.state.multerImage} alt="upload-image" className="process_image" />
                    </div>
                  </div>
                </Form>

              </Card.Body>

            </Card>
          </div>

          {/* <div>


        <div className='content-container'>
          <div className='content-grid-myA'>
            <div className=' main-myA'>
              <div className="profile-container-myA">
                <div className="profile-pic-buffer-myA">
                  <div className="profilepic">
                    <img className="responsive" id="profile-pic-myA" src={require(`${this.state.image}`)} alt="city" width="100" height="80" />
                  </div>
                  <div className="edit-pic">
                    <ButtonToolbar >
                      <Button variant="outline-light" onClick={() => this.setState({ editPhotoShow: true, option: '3' })}>
                        Change Photo
                      </Button>
                      <EditPhotoModal
                        show={this.state.editPhotoShow}
                        onHide={editModalClose}
                        handler={this.handler}
                        size="lg"
                        style={{ maxWidth: '1600px', width: '80%' }}
                      />
                    </ButtonToolbar>
                  </div>
                </div>
                <div className="buffer"></div>
                <div className="profile-text-buffer">
                  <div className="profile-text">

                    <form id="update" onSubmit={this.handleSubmit}>
                      <h2>EDIT PROFILE</h2>
                      <label htmlFor="full-name">FIRST NAME</label>
                      <input type="text" className="myA" id="myA-firstname" style={{ height: "25px" }} />
                      <label htmlFor="full-name">LAST NAME</label>
                      <input type="text" className="myA" id="myA-lastname" style={{ height: "25px" }} />
                      <label htmlFor="full-name">HOMETOWN</label>
                      <input type="text" className="myA" id="myA-hometown" style={{ height: "25px" }} />
                     
                      <div id="update-div">

                        <ButtonToolbar id="btntb">
                          <Button className="buttons" variant="primary" type="submit">
                            UPDATE
                      </Button>
                          <Button className="buttons" href="/Home" type="submit" variant="secondary" >
                            BACK
                      </Button>
                        </ButtonToolbar>

                      </div>

                    </form>
                  
                  </div>
                  <ButtonToolbar className="done-btn">

                  </ButtonToolbar>
                </div>
              </div>
            </div>
            <div className="side-pic-container">
              <img
                className="responsive side-pic"
                src={require("./images/city.png")}
                alt="city"
                width="100"
                height="80"
              />
            </div>
          </div>
        </div>
     

        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk&libraries=places&callback=initAutocomplete" async defer></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossOrigin="anonymous"></script>
        <script src="auto-complete.js"></script>
      </div> */}
        </div>
        <Footer />
      </div>
    );
  }
}




export default MyAccount;

