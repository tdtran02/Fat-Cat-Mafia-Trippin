import React, { Component } from "react";
import "../styles/Home.css";
import MyAccount from "./MyAccount.js";
const AXIOS = require("axios").default;
const mongoose = require("mongoose");


let profilePicPath = localStorage.getItem("user");

export class Home extends Component {
    state = {
        image: ""
    }
    displayProfilePic() {
        AXIOS.get("http://localhost:4000/user").then(res => {
            const image = res.image;
            console.log(image);
            this.setState({ image });
        })
    }
    render() {
        console.log(this.state.image);
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
                                            src={require("./images/profilepic.png")}
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

                                    <div className="profile-text">
                                        <div className="name">Tommy Traveller</div>
                                        <div className="number-of-trips">Trips: 3</div>
                                        <div className="view-friends-list">View Frends Lists</div>
                                    </div>
                                </div>
                            </div>
                            <div id="trips-container">
                                <button id="create-trip-btn">CREATE A TRIP</button>
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
