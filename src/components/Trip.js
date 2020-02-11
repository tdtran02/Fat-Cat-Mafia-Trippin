import React, { Component } from "react";
import "../styles/Trip.css";
import { Button, ButtonToolbar } from 'react-bootstrap';

export class Trip extends Component {


    constructor(props) {
        super(props);
        this.state = { editPhotoShow: false, option: '2' };
        let photoID = null;
        this.handler = this.handler.bind(this)
    }



    render() {


        return (
            <body>

            </body>
        );
    }
}



export default Trip;

