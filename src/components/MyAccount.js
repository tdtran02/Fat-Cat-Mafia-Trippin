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
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.state = {
      editPhotoShow: false,
      option: '2',
      image: "placeholder.png",
      //image:"",
      id: "",
      email: "",
      first_name: "",
      last_name: "",
      __v: "",
      hometown: "",
      updateflag: false,
      selectedFile: null,
      multerImage: "./uploads/userProfileImage/placeholder.png",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.Click = this.onChange.bind(this);

    if (JSON.parse(localStorage.getItem('user')).image == null) {
      this.state = {
        image: "placeholder.png"
      };
    }
    // else{
    //   app.get('user/profile/'+ JSON.parse(localStorage.getItem('user'))._id)
    //     .then(response =>{
    //       //this.setState({image: response.data.image.imageData});
    //       this.state = {
    //         image: "../../backend/" + response.data.image.imageData
    //       }
    //   })
    // }
  };
  /* setDefaultImage(uploadType) {
    if (uploadType === "multer") {
      this.setState({
        multerImage: "./uploads/userProfileImage/placeholder.png"
      });
    }
  } */
  componentDidMount() {
    //  console.log(this.state.user.email);
    app.get('user/' + JSON.parse(localStorage.getItem('user'))._id)
      .then(response => {
        console.log(response.data.user.email);
        this.setState({ email: response.data.user.email });
        this.setState({ first_name: response.data.user.first_name });
        this.setState({ last_name: response.data.user.last_name });
        this.setState({ __v: response.data.user.__v });
        if (response.data.user.image != null) {
          // app.get('user/profile/'+ JSON.parse(localStorage.getItem('user'))._id )
          // .then(resImage =>{
          //   this.setState({image: './uploads/userProfileImage/'+resImage.data.image.imageName});
          // })
          this.setState({ image: response.data.user.image });
        }
        if (response.data.user.hometown != null) {
          this.setState({ hometown: response.data.user.hometown })
        }
        console.log(this.state.first_name);
      })
      .catch(function (error) {
        console.log(error);
      })

  };
  handleSelectedFile = e => {
    e.preventDefault();
    this.setState({ selectedFile: e.target.files[0], }, () => {
      console.log(this.state.selectedFile);
      // console.log(e.target.files[0]);
    });
  };
  /*  onChange = e => {
     this.setState({ [e.target.name]: e.target.value });
 
   }; */

  handleUpload(e) {

    e.preventDefault();
    //let imageObj = {};


    const imageFormObj = new FormData(e.target);
    console.log(imageFormObj);
    imageFormObj.set("name", e.target.name + Date.now());
    imageFormObj.append("file", this.state.selectedFile)
    //imageFormObj.append("imageName", "multer-image-" + Date.now());
    /* imageFormObj.append("imageCate", "profile");
    imageFormObj.append("imageData", e.target.files[0]); */

    // stores a readable instance of 
    // the image being uploaded using multer

    /* this.setState({
      multerImage: URL.createObjectURL(e.target.files[0])
      //image: URL.createObjectURL(e.target.files[0])
    }); */

    app.post("upload", imageFormObj)
      .then((response) => {
        console.log(response.data.data.key);
        this.updateDB(response);
      }).catch(err => {
        console.log(err);
      })
    // delete previous profile image
    /* if (JSON.parse(localStorage.getItem('user')).image != null) {
      app.delete('user/profile/' + JSON.parse(localStorage.getItem('user'))._id).then(res => console.log(res.data))
        .catch(err => { console.log(err) });
    } */
    // then upload new profle image
    /* console.log(imageFormObj);
    app.post('user/profileImage/' + JSON.parse(localStorage.getItem('user'))._id, imageFormObj).then((data) => {
      if (data.data.success) {
        alert("Image has been successfully upload using multer");
        this.setDefaultImage("multer");
      }
    }).catch((err) => {
      alert("Error while uploading image using multer");
      this.setDefaultImage("multer");
    }); */
    /* 
      the user != tripbuddy 
      need to update tripbuddy_picture
      user may in many trips as tripbuddies
    */

    //update buddy profile
    /*  app.put('buddy/profile/' + JSON.parse(localStorage.getItem('user'))._id).then(res => console.log(res.data))
       .catch(err => { console.log(err) 
     }); */

    // const update = {
    //   image: {
    //     owner_id: JSON.parse(localStorage.getItem('user'))._id,
    //     imageCate: imageFormObj.imageCate
    //   }
    // }
    // console.log(JSON.stringify(update));
    // // make Image connects User, user.image = image.id
    // app.put('userImageUpdate/' + JSON.parse(localStorage.getItem('user'))._id,  
    // {
    //   owner_id: JSON.parse(localStorage.getItem('user'))._id,
    //   imageCate: "profile"
    // })
    // .then(
    //   res => console.log(res.data),
    //   alert("Image has been successfully updated in user profile")
    // )
    // .catch(err => { console.log(err) });
    // }
  }

  updateDB(flag) {
    if (flag.status === 200) {
      let updateimg = {
        user: {
          first_name: JSON.parse(localStorage.getItem('user')).first_name,
          last_name: JSON.parse(localStorage.getItem('user')).last_name,
          hometown: JSON.parse(localStorage.getItem('user')).hometown,
          image: flag.data.data.Key
        }
      }
      app.put("user/" + JSON.parse(localStorage.getItem('user'))._id, {
        first_name: JSON.parse(localStorage.getItem('user')).first_name,
        last_name: JSON.parse(localStorage.getItem('user')).last_name,
        hometown: JSON.parse(localStorage.getItem('user')).hometown,
        image: flag.data.data.Key
      }).then(r => {
        console.log(r);
      }).catch(err => {
        console.log(err);
      });

      //update buddy profile
      app.put('buddy/profile/' + JSON.parse(localStorage.getItem('user'))._id).
        then(res => console.log(res.data))
        .catch(err => {
          console.log(err)
        });

      app.put("comment/images/" + JSON.parse(localStorage.getItem('user'))._id, {
        image: flag.data.data.Key
      }).then(resp => {
        console.log(resp);
      }).catch(err => {
        console.log(err);
      })
      window.location.href = "/MyAccount";
    }
    else {
      alert("Image Upload not available");
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
    app.put('user/' + JSON.parse(localStorage.getItem('user'))._id, {
      _id: JSON.parse(localStorage.getItem('user'))._id,
      first_name: x,
      last_name: y,
      image: this.state.image,
      __v: this.state.__v,
      hometown: z
    })
      .then(res => console.log(res.data))
      .catch(err => { console.log(err) });

    this.setState({ updateflag: true });
    e.preventDefault();
    window.location.href = "/MyAccount";
  }


  render() {
    const { selectedFile } = this.state;
    let editModalClose = () => this.setState({ editPhotoShow: false });

    return (
      <div style={{ height: "100%" }}>
        <div className="image-container" style={{
          height: "100%",
          //  backgroundImage: "url(https://wallpaperscute.com/wp-content/uploads/2019/05/Sunset-Wallpaper-For-Desktop.jpg)",
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
              <Card.Body >
                <div style={{ display: "flex", alignContent: "center" }}>
                  <img className="responsive"
                    src={`http://fatcatimages.s3.amazonaws.com/${this.state.image}`}
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
                  
                  <div style={{
                    margin: "5px "
                  }}>
                    <label id="same-line" style={{
                      marginRight: "5px"
                    }}><strong>NAME: </strong></label>
                    <label>{`  ${this.state.first_name}  ${this.state.last_name}`}</label>
                  </div>
                  <div style={{
                    margin: "5px "
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
              height: "70%",
              minWidth: "800px"
            }}>
              <Card.Header as="h3">UPDATE</Card.Header>
              <Card.Body style={{
                display: "flex",
                marginTop: "30px"
              }}>
                <Form >
                  <div style={{ borderRight: "2px solid black" }}>
                    <h4 style={{ marginLeft: "8%" }} className="process_heading">Profile Information: </h4>
                    <div style={{
                      display: "flex",
                      width: "400px",
                      margin: "35px auto 15px auto",
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
                    <div style={{ display: "flex", width: "400px", margin: "15px auto" }}>
                      <Form.Label style={{
                        margin: "0 15px 0 28px"
                      }}>HOMETOWN:</Form.Label>
                      <Form.Control id="hometown" type="text" placeholder="ENTER HOMETOWN" style={{
                        width: "230px"
                      }} />
                    </div>
                    <div style={{ display: "flex" }}>
                      <Button className="buttons" onClick={this.handleSubmit} variant="success" type="submit"
                        style={{ margin: "15px auto" }}>
                        UPDATE INFO</Button>
                    </div>
                  </div>

                </Form>

                <form style={{ marginLeft: "5%" }} onSubmit={this.handleUpload}>
                  <div className="form-group" style={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "space-around"
                  }}>

                    <h4 className="process_heading">Profile Image: </h4>
                    <p style={{ margin: "30px auto" }} className="process_details">Upload image from your local device</p>

                    <input style={{ margin: "10px 8%" }} type="file" name="" id="" onChange={this.handleSelectedFile} />
                    {/* <img src={this.state.multerImage} alt="upload-image" className="process_image" /> */}

                  </div>
                  <div style={{ margin: "65px 15%" }}>
                    <button className="btn btn-primary" type="submit">UPDATE PHOTO</button>
                  </div>

                </form>



              </Card.Body>

            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}




export default MyAccount;

