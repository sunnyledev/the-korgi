import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Uploader from "../../components/Uploader";
import { postCard } from "../../actions/authActions";
import "./style.css";
import ImageUploader from "react-images-upload";
// import API from "../../utils/API";

class Memento extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      userImage: "",
      postImage: "",
      caption: "",
      location: "",
      errors: {},
      // picture: "https://img.freepik.com/free-vector/cute-animal-doing-dabbing_23-2147847948.jpg?size=338&ext=jpg",
      picture: "",
      file: null
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const postData = {
      userId: this.props.auth.user.id,
      userImage: this.props.auth.user.userImage,
      postImage: this.state.postImage,
      caption: this.state.caption,
      location: this.state.location
      // date: ""
    };

    console.log(postData);
    this.props.postCard(postData);
  };

  // onDrop(picture) {
  //   console.log(picture);
  //   this.setState({
  //     pictures: this.state.pictures.concat(picture)
  //   });
  // }

  photoUpload = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        picture: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  render() {
      const { errors } = this.state;

      return (
          <div className="post-outer">
              <h4 className="welcome-text">Share your story !</h4>
              <div className  ='post-div'>
                <label htmlFor="photo-upload" className="custom-file-upload fas">
                  <div className="img-wrap img-upload">
                    <img htmlFor="photo-upload" src={this.state.picture}/>
                  </div>
                  <input id="photo-upload" type="file" onChange={this.photoUpload}/>
                </label>
              {/*<img className="image" src="https://img.freepik.com/free-vector/cute-animal-doing-dabbing_23-2147847948.jpg?size=338&ext=jpg" alt=""/>*/}
              {/*<ImageUploader*/}
              {/*    withIcon={false}*/}
              {/*    buttonText='Choose images'*/}
              {/*    onChange={this.onDrop}*/}
              {/*    imgExtension={['.jpg', '.png']}*/}
              {/*    maxFileSize={1048576} // in bytes*/}
              {/*/>*/}
              <div className="text-div">
                  <input type="file" accept="image/x-png,image/jpeg" title=" "/>
                      <input
                          value={this.state.location}
                          className="input-style"
                          type="text"
                          placeholder="Location"
                          name="location"
                          id="location"
                          onChange={this.onChange}
                          error={errors.location}
                          style={{width: "100%"}}
                      />
                      <textarea
                          value={this.state.caption}
                          className="input-style"
                          placeholder="Caption"
                          id="caption"
                          onChange={this.onChange}
                          error={errors.caption}
                    />
                  <button className="post-card" onClick={this.onSubmit}>Post Card!</button>
              </div>
            </div>
          </div>
      );
  }
}

Memento.propTypes = {
  postCard: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
    mapStateToProps,
    { postCard }
)(Memento);
