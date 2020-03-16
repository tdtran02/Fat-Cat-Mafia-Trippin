import React, { Component, Item } from "react";
import { Card, FormControl, InputGroup, Form, ListGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../styles/Friends.css";
import "../styles/Trip.css";
import AXIOS from "axios";
import { CreatePost } from './CreatePost';



class CurrentTrip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trip_id: this.props.match.params.id,
      start: JSON.parse(localStorage.getItem('trip')).start_date.substring(0, 10),
      end: JSON.parse(localStorage.getItem('trip')).end_date.substring(0, 10),
      createPost: false,
      posts: [],
      comment_id: "",
      user_id: "",
      comment: "",
      comment_date: "",
      user: {}
    };
  }

  componentDidMount() {

    AXIOS.get('http://localhost:4000/comment/' + JSON.parse(localStorage.getItem('trip'))._id)
      .then(response => {
        if (response !== 'undefined') {
          this.setState({ comment_id: response.data.comment[0]._id });
          this.setState({ comment: response.data.comment[0].text });
          this.setState({ comment_date: response.data.comment[0].date });
          this.setState({ posts: this.createPostCards(response.data.comment) });
        }

      })
      .catch(err => {
        console.log(err);
      })



  }

  createPostCards(list) {
    let elements = [];


    //let posts = JSON.parse(localStorage.getItem('trip')).posts;
    //let user = JSON.parse(localStorage.getItem('user'))
    for (let i = list.length - 1; i >= 0; i--) {
      this.setState({ secondaryComments: [] });
      let secondaryComments = []
      console.log(i + ": " + list[i].commentsOnThisPost);
      if (list[i].commentsOnThisPost != "") {
        //secondaryComments = this.showCommentsOnPost(list[i].commentsOnThisPost);
        // console.log("*** " + secondaryComments.length);

        let commentlist = list[i].commentsOnThisPost;
        console.log(commentlist.length);
        for (let j = 0; j < commentlist.length; j++) {
          console.log("?/?/");
          let text = commentlist[j].text;
          this.setState({ text: text });
          this.setState({ userfirstname: list[i].first_name })
          secondaryComments.push(
            <div key={j} ><ListGroup.Item ><strong>{this.state.userfirstname}: </strong> {this.state.text}</ListGroup.Item></div>
          )
        }
        this.setState({ secondaryComments: secondaryComments });
      }


      elements.push(
        <div key={i} >
          <div className="post-card" style={{
            margin: "0 10px 10px 10px",
            backgroundColor: "white",
            borderRadius: "20px",
            margin: "15px 0",
            boxShadow: "8px 8px 50px #000",
            width: "90%"
          }}>
            {/*<div
              className="img-responsive cover"
              style={{
                height: "100px",
                width: "400px",
                backgroundColor: "#6495ED"
              }}
            ></div>*/}
            <Card
              style={{
                borderRadius: "20px",
                backgroundColor: "transparent"
              }}
            >
              <Card.Header as="h5" style={{
                textTransform: "uppercase",
              }} > <img src={require(`${list[i].user_pic}`)} style={{
                width: "40px", height: "40px", marginRight: "20px"
              }} />{list[i].first_name}</Card.Header>

              <Card.Body>

                <p>{list[i].text}</p>
                <ListGroup>
                  <div>{this.state.secondaryComments}</div>
                </ListGroup>


              </Card.Body>
              <Card.Footer>


                <Form>

                  <Form.Control id={this.key} as="textarea" rows="1" placeholder="Comment on post..."></Form.Control>
                  <Button variant="outline-warning" onClick={e => this.commentOnPost(e, list[i])} style={{
                    float: "right",
                    marginTop: "10px"
                  }}>POST</Button>


                </Form>

              </Card.Footer>
            </Card>
          </div>
        </div>
      )
    }


    return elements;
  }



  commentOnPost(e, i) {
    console.log(i);
  }

  showRecommendations = () => {
    console.log(this.state.trip_id);
    window.location = "/trip/" + this.state.trip_id + "/recommendations";
  };

  getUserId() {
    let buddyid = "";
    AXIOS.get("http://localhost:4000/useremail/" + document.getElementById('buddyemail').value)
      .then(response => {
        buddyid = response.data.user._id;
        console.log(buddyid);
        //  this.addBuddy(buddyid);
      }).catch(err => {
        console.log(err);
      })

  }

  addBuddy(buddyid) {

    const buddy = {
      owner_id: JSON.parse(localStorage.getItem("user"))._id,
      trip_id: JSON.parse(localStorage.getItem("trip"))._id,
      buddy_id: buddyid
    }
    AXIOS.post('http://localhost:4000/buddy', buddy)
      .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    //TODO: see if user and buddy are already friends
    // if they are, add friend to trip
    //send an invite to friend
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

    const comment = {
      owner_id: JSON.parse(localStorage.getItem("user"))._id,
      first_name: JSON.parse(localStorage.getItem("user")).first_name,
      last_name: JSON.parse(localStorage.getItem("user")).last_name,
      user_pic: JSON.parse(localStorage.getItem("user")).image,
      trip_id: JSON.parse(localStorage.getItem("trip"))._id,
      text: document.getElementById("comment").value,
      date: Date.now()
    };
    AXIOS.post("http://localhost:4000/comment", comment)
      .then(res => {


        this.setState({ addSurveyShow: true });
      })
      .catch(err => {
        console.log(err);
      });
    window.location =
      "/trip/" + JSON.parse(localStorage.getItem("trip"))._id;
  }



  render() {
    let postModalClose = () => this.setState({ createPost: false });
    return (

      <div style={{ height: "100%" }}>

        <div className="image-container" style={{
          height: "100%",
          backgroundImage: "url(https://www.diabetes.co.uk/wp-content/uploads/2019/01/iStock-1001927840-1.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          overflow: "auto",
          display: "flex"


        }}>
          <div style={{
            display: "flex", flexDirection: "column",
            width: "35%"
          }}>
            <div className="trip-info" style={{


              borderRadius: "5px",

              margin: "100px auto",
              border: "2px solid gray",
              boxSizing: "border-box",
              borderRadius: "20px",
              boxShadow: "8px 8px 50px #000",
              color: "#6c757d"
            }}>

              <Card
                style={{
                  borderRadius: "20px",

                }}
              >
                <Card.Header as="h3" style={{ textTransform: "uppercase" }}>{JSON.parse(localStorage.getItem('trip')).trip_name}</Card.Header>

                <Card.Body>
                  <Card.Title style={{
                    textTransform: "uppercase",
                    marginTop: "5px"
                  }}><i className="fas fa-map-marker-alt"></i>  {JSON.parse(localStorage.getItem('trip')).destination}</Card.Title>
                  <Card.Title><i className="fas fa-plane-departure"></i>  {this.state.start}</Card.Title>
                  <Card.Title><i className="fas fa-plane-arrival"></i>  {this.state.end}</Card.Title>
                  <Card.Title style={{ marginTop: "50px" }}>TRAVEL BUDDIES:</Card.Title>
                  <InputGroup >
                    <FormControl id="buddyemail"
                      placeholder="username"
                      aria-label="username" />
                    <InputGroup.Append>
                      <Button variant="outline-success" onClick={this.getUserId}>INVITE</Button>
                    </InputGroup.Append>
                  </InputGroup>
                  {/*  <Button variant="warning" style={{
                    marginTop: "30px"

                  }} onClick={() => this.setState({ createPost: true })}>MAKE A POST</Button>
                  <CreatePost
                    show={this.state.createPost}
                    onHide={postModalClose}
                    handler={this.handler}

                    style={{ maxWidth: '1600px', width: '80%' }} /> */}
                </Card.Body>
              </Card>



            </div>
          </div>
          <div style={{
            width: "35%",

            borderRadius: "5px",
            height: "395px",
            margin: "100px auto",


            borderRadius: "20px",

            color: "#6c757d"
          }}>
            <Card style={{
              boxShadow: "8px 8px 50px #000",
              borderRadius: "20px",
              width: "90%"
            }}>
              <Card.Header>MAKE A POST</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Control id="comment" as="textarea" rows="2" placeholder="Write post..."></Form.Control>
                  </Form.Group>
                  <Button variant="outline-warning" onClick={this.handleClick} style={{
                    float: "right"
                  }}>POST</Button>
                </Form>
              </Card.Body>
            </Card>
            <div >{this.state.posts}</div>
          </div>
          <div style={{
            width: "30%",
            borderRadius: "5px",
            margin: "100px auto",
            borderRadius: "20px",
            color: "#6c757d",

          }}>
            <Button variant="info" style={{
              float: "center",
              boxShadow: "8px 8px 20px #000"
            }} onClick={this.showRecommendations}>Show Recommendations</Button>
          </div>


        </div>

      </div>

    );
  }
}

export default CurrentTrip;
