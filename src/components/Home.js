import React, { Component } from "react";
import "../styles/Home.css";
import MyAccount from "./MyAccount.js";
import { ButtonToolbar, Button } from "react-bootstrap";
const AXIOS = require("axios").default;



let profilePicPath = localStorage.getItem("user");

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            email: "",
            first_name: "",
            last_name: "",
            image: JSON.parse(localStorage.getItem('user')).image,
            _v: "",
        }

        if (JSON.parse(localStorage.getItem('user')).image == null) {

            this.state = {
                image: "./images/profilepic.png"
            }
        }


    }
    componentDidMount() {
        //  console.log(this.state.user.email);
        AXIOS.get('http://localhost:4000/user/' + JSON.parse(localStorage.getItem('user'))._id)
            .then(response => {
                console.log(response.data.user.email)
                this.setState({ email: response.data.user.email })
                this.setState({ first_name: response.data.user.first_name })
                this.setState({ last_name: response.data.user.last_name })
                this.setState({ image: response.data.user.image });
                console.log(JSON.stringify(this.state.user));
                console.log(this.state.email);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        return (
            <div>
                <div className="content-container">
                    <div className="content-grid">
                        <div className=" main">
                            <div className="profile-container">
                                <div className="profile-pic-buffer">
                                    <div className="profilepic">
                                        <img
                                            className="responsive"
                                            src={require(`${this.state.image}`)}
                                            alt="city"
                                            width="100"
                                            height="80"
                                        />
                                    </div>
                                </div>
                                <div className="buffer"></div>
                                <div className="profile-text-buffer">
                                    <div className="edit-buffer">
                                        <a className="edit" href="./MyAccount">
                                            EDIT
                    </a>
                                    </div>

                                    <form className="profile-text">
                                        <div className="fullName" >
                                            <label>{`${this.state.first_name}`}

                                            </label>
                                            <label>{`${this.state.last_name}`}

                                            </label>
                                        </div>


                                        <div className="number-of-trips">Trips: 3</div>
                                        <div className="view-friends-list">View Frends Lists</div>
                                    </form>
                                </div>
                            </div>
                            <div id="trips-container">
                                <ButtonToolbar>
                                    <Button variant="outline-primary" href="/Trip" id="create-trip-btn">CREATE A TRIP</Button>
                                </ButtonToolbar>

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
            </div>
        );
    }
}

export default Home;
