import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from "react-google-login";
import axios from 'axios';

import '../custom.css';

const CLIENT_ID =
  "194796801307-sho8o1p4mvfp445ej4eibo4utlphkbbb.apps.googleusercontent.com";

class GoogleSignInComponent extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userInfo: {
        name: "",
        emailId: "",
        googleId: "",
      },
    };
  }

  // Success Handler
  responseGoogleSuccess = (response) => {
    console.log();
    console.log(response.profileObj);
    console.log(response);
    let userInfo = {
      name: response.profileObj.name,
      emailId: response.profileObj.email,
      googleId: response.profileObj.googleId,
    };
    this.setState({ userInfo, isLoggedIn: true });
    
    //Skapa ett API anrop
    axios.get('')
  };

  // Error Handler
  responseGoogleError = (response) => {
    console.log(response);
  };

  // Logout Session and Update State
  logout = (response) => {
    console.log(response);
    let userInfo = {
      name: "",
      emailId: "",
      googleId:"",
    };
    this.setState({ userInfo, isLoggedIn: false });
  };

  render() {
    return (
      <div className="row mt-5">
        <div className="col-md-12">
          {this.state.isLoggedIn ? (
            <div >
              <h5>Welcome, {this.state.userInfo.name}</h5>
              <p>{}</p>
               <div class="google-button">
                   <GoogleLogout
                    clientId={CLIENT_ID}
                    buttonText={"Logout"}
                    onLogoutSuccess={this.logout}
                    ></GoogleLogout>
              </div> 
              
            </div>
          ) : (
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign Up with Google"
              onSuccess={this.responseGoogleSuccess}
              onFailure={this.responseGoogleError}
              isSignedIn={true}
              cookiePolicy={"single_host_origin"}
            />
          )}
        </div>
      </div>
    );
  }
}
export default GoogleSignInComponent;