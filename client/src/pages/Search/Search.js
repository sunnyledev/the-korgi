import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllUsers } from "../../actions/authActions";
import axios from "axios";
import "./style.css";
import Typing from "react-typing-animation";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      users: [],
      matchedUser: {},
      results: [],
      isSeachPressed: false,
      errors: {}
    };
  }

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  componentDidMount() {
    axios.get("api/users/all-users")
      .then(res => {this.setState({ users: res.data })
      }).catch(err => console.log(err));
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const searchData = this.state.search;
    console.log(searchData);
    this.setState({ isSeachPressed: true });
    let usersArray = this.state.users;
    usersArray.forEach(user => {
      if(user.email === this.state.search) {
        this.setState({ matchedUser: user });
      }
    });
  };

  onAddFriend = e => {
    e.preventDefault();
    console.log("You pressed the button");
  };

  render() {
    const { errors } = this.state;
    let usersArray = this.state.users;
    

    return (
      <div className="parent-div">
        <div className="top-div top-search-div">
            <p className="header">A SWEET FRIENDSHIP REFRESHES THE SOUL</p>
        </div>
        <div className="search-div">
          <input 
              className="search-input"
              type="text"
              placeholder="Give me an email !"
              name="search" 
              id="search" 
              value={this.state.search}
              onChange={this.onChange}
              error={errors.search}/>
          <button className="search-btn" onClick={this.onSubmit}>
            <img alt="Search" src="https://image.flaticon.com/icons/svg/149/149852.svg"/>
          </button>
        </div>
        <div className="results-div">
          {/* Return users by email here */}
          <div className="friends-container">
            {this.state.isSeachPressed ? (
              <div className="filtered-friends-div">
                <h1>Showing all friends with matching email</h1>
                <div className="user-div" key={this.state.matchedUser.email}>
                  <div className="img-container">
                    <img alt={this.state.matchedUser.firstName} src={this.state.matchedUser.userImage}/>
                  </div>
                  <div className="user-info">
                    <p>{this.state.matchedUser.firstName} {this.state.matchedUser.lastName}</p>
                    <p>{this.state.matchedUser.email} {this.state.matchedUser.zipcode} {this.state.matchedUser.birthday}</p>
                  </div>
                  <div className="add-friend-div">
                    <button className="add-friend" onClick={this.onAddFriend}>Add Friend</button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h6 style={{color: "gray", textAlign: "center"}}>Here is some friend suggestions for you...</h6>
                {usersArray.map(user => (
                  <div className="user-div" key={user.email}>
                    <img className="profile-image" alt={user.firstName} src={user.userImage}/>
                    <div className="user-info">
                      <h4>{user.firstName} {user.lastName}</h4>
                      <div className="info-div">
                        <div>
                          <img className="icon" alt="Email" src="https://image.flaticon.com/icons/svg/1033/1033956.svg"/>
                          <p>{user.email}</p>
                        </div>
                        <div>
                          <img className="icon" alt="Birthday" src="https://image.flaticon.com/icons/svg/864/864800.svg"/>
                          <p>{user.birthday}</p>
                        </div>
                        <div>
                          <img className="icon" alt="Location" src="https://image.flaticon.com/icons/svg/252/252106.svg"/>
                          <p>{user.zipcode}</p>
                        </div>
                      </div>
                    </div>
                    <button className="add-friend-btn button" onClick={this.onAddFriend}>
                      <img alt="Add friend" src="https://image.flaticon.com/icons/svg/1946/1946478.svg"/>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  getUsers: state.getUsers,
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getAllUsers }
)(Search);
