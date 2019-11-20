import React, {Component} from 'react';
import "./sendmessage-style.css";

class SendMessageForm extends Component {
  state = {
      message: ""
  };

  handleChange = (e) => {
      this.setState ({
        message: e.target.value
      })
  };

  handleSubmit = (e) => {
      e.preventDefault();
      this.props.sendMessage(this.state.message);
      this.setState({
        message: ""
      })
  };
 
  render() {
      return (
          <form className='send-message-form'
              onSubmit={this.handleSubmit}>
                  <input
                      className="search-input"
                      disabled={this.props.disabled}
                      onChange={this.handleChange}
                      value={this.state.message}
                      placeholder="Say anything..."
                      type='text'
                      style={{marginTop: 0}}
                  />
                  <button type='submit' className='search-btn' disabled={this.props.disabled}>
                    <img alt="Send" src="https://image.flaticon.com/icons/svg/942/942196.svg"/>
                  </button>
          </form>
      )
  }
}

export default SendMessageForm;

