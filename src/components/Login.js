import React, { Component } from 'react';
import './style/Login.css';

export default class LogIn extends Component {

    change_password_type = () => {
        document.getElementById('touchable').addEventListener('click', () => {
            if(document.getElementById('touchable').className !== "fa fa-eye icon") {
                document.getElementById('touchable').className = "fa fa-eye icon";
                document.getElementById('password').type = "text";
            } else {
                document.getElementById('touchable').className = "fa fa-eye-slash icon";
                document.getElementById('password').type = "password";
            }
        })
    }

    componentDidMount() {
        this.change_password_type();
    }

    render() {
        return (
            <div className="login_container">
                <form className="login_form">
                    <h1>Log In</h1>
                    <div style={{padding: 30}}>
                        <div class="input-container">
                            <i class="fa fa-user icon"></i>
                            <input class="input-field" type="text" placeholder="Username" name="usrnm" />
                        </div>
                        <div class="input-container">
                            <i class="fa fa-eye-slash icon" id="touchable"></i>
                            <input class="input-field" type="password" placeholder="Password" id="password" name="psw" />
                        </div>
                        <button type="submit" class="btn">Register</button>
                    </div>
                </form>
            </div>
        )
    }
}