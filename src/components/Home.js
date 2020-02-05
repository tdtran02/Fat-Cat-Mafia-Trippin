import React, { Component } from "react";
import "../styles/Home.css";

export class Home extends Component {
    render() {
        return (
            <html>
                <head>
                    <meta charset='UTF-8' />
                    <title>Trippin</title>
                </head>
                <body>
                    <div>

                        <ul class="navbar">
                            <li>Home</li>
                            <li>Sign Out</li>
                        </ul>

                    </div>
                </body>
            </html>
        );
    }
}

export default Home;
