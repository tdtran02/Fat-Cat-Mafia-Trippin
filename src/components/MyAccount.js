import React, { Component } from "react";
import "../styles/MyAccount.css";
import { Button, ButtonToolbar } from 'react-bootstrap';
import { EditPhotoModal } from './EditPhotoModal';

// Profile
// Trip
// Recommendation
// Setting
// Sign out




export class MyAccount extends Component {

  constructor(props) {
    super(props);
    this.state = { editPhotoShow: false }
  }



  render() {
    let editModalClose = () => this.setState({ editPhotoShow: false })

    return (
      <body>


        <div class='content-container'>
          <div class='content-grid'>
            <div class=' main'>
              <div class="profile-container">
                <div class="profile-pic-buffer">
                  <div class="profilepic">
                    <img class="responsive" src={require("./images/profilepic.png")} alt="city" width="100" height="80" />
                  </div>
                  <div class="edit-pic">
                    <ButtonToolbar>
                      <Button variant="primary" onClick={() => this.setState({ editPhotoShow: true })}>
                        Change Photo
      </Button>

                      <EditPhotoModal
                        show={this.state.editPhotoShow}
                        onHide={editModalClose}
                      />
                    </ButtonToolbar>


                  </div>
                </div>
                <div class="buffer"></div>
                <div class="profile-text-buffer">


                  <div class="profile-text">
                    <label for="full-name">NAME</label>
                    <input type="text" />
                    <Button>UPDATE</Button>
                  </div>
                </div>
              </div>

            </div>
            <div class='side-pic-container'>
              <img class="responsive side-pic" src={require("./images/city.png")} alt="city" width="100" height="80" />
            </div>


          </div>
        </div>
      </body>
    );
  }
}

/* var modal = document.getElementById("myModal");
var btn = document.getElementById("trigger");
var span = document.getElementByClassName("close")[0];
 
btn.onclick = function () {
      modal.style.display = "block";
  }
  
span.onclick = function () {
      modal.style.display = "none";
  }
  
window.onclick = function (event) {
if (event.target == modal) {
      modal.style.display = "none";
  }
} */


export default MyAccount;
