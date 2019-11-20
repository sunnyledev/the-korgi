import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Message from '../Message'

class MessageList extends Component {

  componentWillUpdate() {
      // when scrolling, old messages scroll to top and new message on bottom
      const node = ReactDOM.findDOMNode(this);
      this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
  }

  componentDidUpdate() {
      // automatically scrolls down to bottom when new message arrives
      if (this.shouldScrollToBottom) {
        const node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight
      }
  }

  render() {
      return (
          <div className='message-list' style={{flexGrow: 2, paddingBottom: "70px"}}>
              {!this.props.roomId ? (
                  <div style={{color: "gray"}}>
                      It's so quiet... maybe joining a room?
                  </div>
              ) : (
                  this.props.messages.map((message, index) =>
                      <Message key={index} username={message.senderId} text={message.text} />
                  )
              )}
          </div>
      );
  }
}

export default MessageList; 
