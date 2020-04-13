import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const AXIOS = require("axios").default;

/* const ProfilePicture = ({ image }) => (
  <div>
    <LazyLoadImage
      alt={image.alt}
      height={image.height}
      src={image.src} // use normal <img> attributes as props
      width={image.width} />
    <span>{image.caption}</span>
  </div>
); */

export class ProfilePicture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        }
    }

    componentDidMount() {
        AXIOS.get('http://localhost:4000/user/' + JSON.parse(localStorage.getItem('user'))._id)
            .then(response => {
                console.log(response.data.user.image);
                this.setState({
                    image: response.data.user.image
                })
            })
    }

    render() {
        return (
            <LazyLoadImage
                alt="profile"
                height="150px"
                src={`require(${this.state.image})`}
                effect="blur"
            />
        )

    }
}

export default ProfilePicture;