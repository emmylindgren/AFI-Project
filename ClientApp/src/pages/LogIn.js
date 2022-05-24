import React, { Component } from 'react';
import logo from "../img/logo-with-text.svg";
import GoogleLogInButton from "../components/GoogleLogInButton.js";
import GoogleSignInButton from "../components/GoogleSignInButton.js";

import '../custom.css';

export class LogIn extends Component {
    static displayName = LogIn.name;

    render() {
        return (
            <div id="login-page">
                <img src={logo} id="logo"></img>
                <h5 id="login-text">Explore your neighbourhood today!</h5>
                <div className="google-button"><GoogleLogInButton /></div>

                <div id="sign-up-text">
                    <p style={{margin: 0}}>Not a member yet?</p>
                    <div className="google-button"><GoogleSignInButton /></div>
                </div>
            </div>

        );
    }
}