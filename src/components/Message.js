import React from 'react';
import './style/Message.css';

export default function ChatBox(props) {
    return (
        <div className={props.class}>
            <h1>{props.name}</h1>
            <h4>{props.message}</h4>
        </div>
    )
}