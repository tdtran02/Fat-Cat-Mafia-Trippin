import React, { Component } from "react";
import "../styles/Home.css";


export class Home extends Component {
    render() {
        return (
            <body>


                <div class='content-container'>
                    <div class='content-grid'>
                        <div class=' main'>
                            <a class="edit" href="./MyAccount.js">Edit</a>
                        </div>
                        <div class='photo-grid-item'>
                            <img src={require("./images/city.png")} alt="city" width="100" height="80" />
                        </div>


                    </div>
                </div>
            </body>

        );
    }
}

export default Home;
