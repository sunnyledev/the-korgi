import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, getUser } from "../../actions/authActions";
import adultTasks from "../../utils/taskAdults.json";
import teenTasks from "../../utils/tasksTeen.json";
import kidTasks from "../../utils/tasksKids.json";

class Tasks extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  determineAgeGroup = birthday => {
    let birthdayArr = birthday.split("/");
    let currentDateArr = new Date();

    let userYear = birthdayArr[2];
    let currentYear = currentDateArr.getUTCFullYear()

    if((currentYear - userYear) > 18) {
        return this.displayTask(adultTasks, 64);
    } else if((currentYear - userYear) > 13) {
        return this.displayTask(teenTasks, 64);
    } else {
        return this.displayTask(kidTasks, 64);
    }
  };

  displayTask = (obj, length) => {
    let randomTask = Math.floor(Math.random() * (length - 0)) + 0;
    console.log(obj[randomTask].task);
  }



render() {
    const { user } = this.props.auth;
    let taskItem = this.determineAgeGroup(user.birthday);

return (
      <div style={{ height: "75vh", marginTop:"60px" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.firstName}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Tasks.propTypes = {
  getUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser, getUser }
)(Tasks);