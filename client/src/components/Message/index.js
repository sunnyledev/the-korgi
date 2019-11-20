import React from 'react';
import "./message-style.css";

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createAlphabetColors() {
    let colors = {};
    for (let i = 0; i < 26; i++) {
        colors[(i+10).toString(36)] = getRandomColor();
    }

    return colors;
}

const Message = (props) => {

    const colors = createAlphabetColors();

    return (
        <div className="message-div">
            <div className="message-username" style={{backgroundColor: `${colors[props.username[0]]}`}}>{props.username[0].toUpperCase()}</div>
            <p className="message-text input-style">{props.text}</p>
        </div>
    )
};

export default Message; 
