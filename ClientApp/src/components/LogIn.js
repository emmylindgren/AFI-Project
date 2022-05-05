import React, { Component } from 'react';
import logo from "../img/logo-with-text.svg";
import GoogleLogInButton from "./GoogleLogInButton.js";
import GoogleSignInButton from "./GoogleSignInButton.js";
import { Link } from "react-router-dom";

import '../custom.css';
import SignUp from './SignUp';

export class LogIn extends Component {
    static displayName = LogIn.name;

    render () {
        return (
            <div id="login-page">
                <img src={logo} id="logo"></img>
                <h4 id="login-text">Explore your neighbourhood today!</h4>
                <div className="google-button"><GoogleLogInButton /></div>

                <div id="sign-up-text">
                    <p>Not a member yet? &nbsp;
                    <div className="google-button"><GoogleSignInButton /></div>
                    </p>
                </div>

                <Link className='login-text' to='./sign-up'> Signup Page </Link>
            </div>
    );
  }
}