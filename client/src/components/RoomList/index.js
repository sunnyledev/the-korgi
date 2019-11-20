import React, {Component} from 'react';
import "./roomlist-style.css";

class RoomList extends Component {

    state = {
        roomName: ""
    };

    handleChange = (e) => {
        this.setState({
            roomName: e.target.value
        })
    };

    handleSearchSubmit = (e) => {
        e.preventDefault();
        if (this.state.roomName.length <= 0) return;
        // inverse data flow - goes to parent instead of child
        this.props.createRoom(this.state.roomName);
        // empty out the room after submission
        this.setState({
            roomName: ""
        })
    };

    render () {
        // sort in order by there id
        const orderedRooms=[...this.props.rooms].sort((a,b) => a.id - b.id)

        return (
            <div className="rooms-list">
                <h5 style={{ color: '#D9D9D9'}}>Your rooms</h5>
                <div className="search-div" style={{padding: 0}}>
                    <input
                        value={this.state.roomName}
                        onChange={this.handleChange}
                        className="search-input"
                        type="text"
                        placeholder="Create a room"/>
                    <button className="search-btn" style={{fontSize: "2em"}} onClick={this.handleSearchSubmit}>+</button>
                </div>
                <ul>
                    {
                        orderedRooms.map(room => {
                            const active = this.props.roomId === room.id ? "active" : "";
                            return (
                                <li key={room.id} className={"room " + active }>
                                    <a onClick={ () => this.props.subscribeToRoom(room.id) } href="#"># {room.name}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default RoomList;
