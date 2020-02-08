import React, { Component } from "react";
import "../styles/Home.css";


export class Home extends Component {
    render() {
        return (
            <body>


                <div class='content-container'>
                    <div class='content-grid'>
                        <div class=' main'>
                            <div class="profile-container">
                                <div class="profile-pic-buffer">
                                    <div class="profilepic">
                                        <img src={require("./images/profilepic.png")} alt="city" width="100" height="80" />
                                    </div>
                                </div>
                                <div class="buffer"></div>
                                <div class="profile-text-buffer">
                                    <div class="edit-buffer">
                                        <a class="edit" href="./MyAccount">EDIT</a>
                                    </div>

                                    <div class="profile-text">
                                        <div class="name">Tommy Traveller</div>
                                        <div class="number-of-trips">Trips: 3</div>
                                        <div class="view-friends-list">View Frends Lists</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class='side-pic-container'>
                            <img class="side-pic" src={require("./images/city.png")} alt="city" width="100" height="80" />
                        </div>


                    </div>
                </div>
            </body>

        );
    }
}

export default Home;
