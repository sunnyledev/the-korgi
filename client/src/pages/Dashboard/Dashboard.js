import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, getUser, getCard } from "../../actions/authActions";
import "./dashboard-style.css";
import axios from "axios";
import EmptyStateSVG from "./EmptyStateSVG";

class Dashboard extends Component {

    months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

  constructor() {
    super();
    this.state = {
        isLoading: true,
      cards: [],
      errors: {}
    };
  }

  componentDidMount() {
    axios.get("api/cards/all-cards")
      .then(res => {
        let data = res.data;
        let arr = [];
        data.forEach(card => {
          if(card.userEmail === this.props.auth.email) {
            arr.push(card)
          }
        });
        this.setState({
            cards: arr,
            isLoading: false
        });
      }).catch(err => console.log(err));
  }

  convertDate = dateString => {
    const theDate = new Date(dateString);
    return `${this.months[theDate.getMonth()]} ${theDate.getDay()}, ${theDate.getFullYear()}`;
  };

render() {
    const { user } = this.props.auth;
    const userCards = this.state.cards;
    console.log(this.state.cards);

    return (
      <div className="dash-container">
        <div className="user-profile">
          <div className="profile-image-div">
            <img alt={user.firstName} src={user.userImage} />
            <h5 style={{textAlign: "center", marginTop: "20px"}}>{user.firstName} {user.lastName}</h5>
          </div>
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
        <div className="user-posts">
          {(userCards.length > 0 && !this.state.isLoading) && userCards.map(card => (
            <div className="posts-div">
              <div>
                <h5>{user.firstName} {user.lastName}</h5>
                <p>{this.convertDate(card.date)}</p>
              </div>
              <div>
                <img style={{width: "15px"}} alt="Location" src="https://image.flaticon.com/icons/svg/252/252106.svg"/>
                <p style={{marginLeft: "5px", fontSize: "0.8em"}}>{card.location}</p>
              </div>
          <p>{card.caption}</p>
              {card.postImage && (
                  <img alt="" src={card.postImage}/>
              )}
            </div>
          ))}
            {(userCards.length === 0 && !this.state.isLoading) && (
                <div className="posts-div" style={{display: "flex", flexFlow: "column wrap"}}>
                    <EmptyStateSVG style={{width: "80%"}}/>
                    <h5 style={{textAlign: "center", marginTop: "30px", color: "#999999"}}>It's so quiet here... let's go make a post!</h5>
                </div>
            )}
        </div>
       </div>
        );
  }
}
Dashboard.propTypes = {
  getUser: PropTypes.func.isRequired,
  getCard: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser, getUser, getCard }
)(Dashboard);
