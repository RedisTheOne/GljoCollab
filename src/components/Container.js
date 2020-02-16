import React, { Component } from 'react';
import ChatBox from './ChatBox';
import CryptoJS from 'crypto-js'
import Message from './Message';
import './style/Container.css';

export default class Container extends Component {
    componentDidMount() {
        //Encrypts
        const ciphertext = CryptoJS.AES.encrypt('my message', 'secret key reduskafsha').toString();
        console.log(ciphertext);
        // Decrypt
        const bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key reduskafsha');
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log(originalText); 
        window.addEventListener("resize", () => {
            if(window.innerWidth > 850) {
                this.setState({sidebarVisible: false}, () => {
                    this.bar_top_click();
                })
            }
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            sidebarVisible: false,
            chats: [
                {
                    id: 1,
                    name: "Hitler",
                    messages: [{name: "redis", message: "Lol"}]
                },
                {
                    id: 2,
                    name: "Stalin",
                    messages: [{name: "redis", message: "Lol"}, {name: "Stalin", message: "FU"}, {name: "redis", message: "Lol"}, {name: "Stalin", message: "FU"}, {name: "redis", message: "Lol"}, {name: "Stalin", message: "FU"}, {name: "redis", message: "Lol"}, {name: "Stalin", message: "FU"}]
                }
            ],
            currentChat: 1,
            user: "redis"
        }
    }

    onChatBoxClick = (id, name) => {
        window.scrollTo(0, 0);
        document.querySelector(".header_name").innerHTML = name;
        this.setState({currentChat: id, sidebarVisible: true}, () => {
            if(window.innerWidth < 850) {
                this.bar_top_click();
            }
        })
    }

    add_message = (msg, name) => {
        const chat = this.state.chats.filter(m => m.id = this.state.currentChat);
        chat[0].messages.push({name: name, message: msg});
        const chats = this.state.chats;
        chats.forEach(c => {
            if(c.id === this.state.currentChat) {
                c = chat[0];
            }
        })
        return chats;
    }

    send_message = (e) => {
        e.preventDefault();
        const msg = document.querySelector(".input_text").value;
        const chats = this.add_message(msg, this.state.user);
        this.setState({chats: chats}, () => {
            window.scrollTo(1000000, 1000000);
            this.send_message_to_hitler(document.querySelector(".input_text").value);
        });
    }

    send_message_to_hitler = (msg) => {
        document.querySelector(".input_text").value = "";
        document.querySelector(".header_name").innerHTML += "(typing)";
        const value = JSON.stringify({user: this.state.user, str: msg});
        fetch("http://hitlerchan.herokuapp.com/api/hitler", {
            method: "POST",
            body: value,
            headers: {
                'Content-Type': 'application/json'
              }
        })
        .then(res => res.json())
        .then(str => {
            const chats = this.add_message(str.response, "Hitler");
            this.setState({chats: chats}, () => {
                window.scrollTo(1000000, 1000000);
                const str =  document.querySelector(".header_name").innerHTML.replace("(typing)", "");
                document.querySelector(".header_name").innerHTML = str;
            });
        })
    }

    bar_top_click = () => {
        if(!this.state.sidebarVisible) {
            document.querySelector('.sidebar').style.marginLeft = "0vw";
            this.setState({sidebarVisible: true});
        } else {
            document.querySelector('.sidebar').style.marginLeft = "-100vw";
            this.setState({sidebarVisible: false});
        }
    }

    render() {
        const chatBoxes = this.state.chats.map((c, i) => (
            <ChatBox key={i} name={c.name} lastMessage={c.messages[c.messages.length - 1].message} onClick={() => this.onChatBoxClick(c.id, c.name)} />
        ));
        const currentChat = this.state.chats.filter(c => c.id === this.state.currentChat);
        const messages = currentChat[0].messages.map((c, i) => (
            <Message key={i} name={c.name} class={c.name === this.state.user ? "message_right" : "message_left"} message={c.message} />
        ))
        return(
            <div>
                <div className="bar_top" id="nope" onClick={() => this.bar_top_click()}>
                    <h1>=</h1>
                </div>
                <div className="sidebar">
                    <h1 className="header">Chats</h1>
                    {chatBoxes}
                </div>
                <div className="main">
                    <div className="header">
                        <h1 className="header_name">Hitler</h1>
                    </div>
                    <div className="messages">
                        {messages}
                    </div>
                </div>
                <div className="send_message">
                    <form onSubmit={this.send_message}>
                        <input type="text" className="input_text" />
                        <div className="input_btn"></div>
                    </form>
                </div>
            </div>
        )
    }
}