import React from 'react';
import './style/ChatBox.css';

export default function ChatBox(props) {
    return (
        <div className="chat_box" onClick={() => props.onClick()}>
            <h1>{props.name}</h1>
            <h4>{props.lastMessage}</h4>
        </div>
    )
}