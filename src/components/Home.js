import React, { Component } from "react";
import "../styles/Home.css";

export class Home extends Component {
    render() {
        return (
            <body>


                <div class='content-container'>
                    <div class='photo-grid'>
                        <div class='photo-grid-item first-item'>

                        </div>
                        <div class='photo-grid-item'>
                            <img src="https://cdn.dribbble.com/users/642843/screenshots/6428968/tokyo_trystram_2x.png" alt="city" styles="width: 100px; height: 300px;" />
                        </div>

                    </div>
                </div>
            </body>

        );
    }
}

export default Home;
