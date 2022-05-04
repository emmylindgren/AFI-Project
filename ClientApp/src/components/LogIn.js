import React, { Component } from 'react';
import logo from "../img/logo-with-text.svg";
import GoogleButton from "./GoogleButton.js";
import { Link } from "react-router-dom";

import '../custom.css';

export class LogIn extends Component {
    static displayName = LogIn.name;

    render () {
        return (
            <div id="login-page">
                <img src={logo} id="logo"></img>
                <h4 id="login-text">Explore your neighbourhood today!</h4>
                <div class="google-button"><GoogleButton /></div>

                <div id="sign-up-text">
                    <p>Not a member yet? &nbsp;
                    <span><Link to="/sign-up">Sign Up</Link></span>
                    
                    </p>
                </div>
            </div>
    );
  }
}