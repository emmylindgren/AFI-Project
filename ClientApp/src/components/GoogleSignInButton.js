import React, { Component, useState } from 'react';
import { GoogleLogin, GoogleLogout } from "react-google-login";

import { withRouter } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import '../custom.css';

const CLIENT_ID =
  "194796801307-sho8o1p4mvfp445ej4eibo4utlphkbbb.apps.googleusercontent.com";

function GoogleSignInComponent (){

  const history = useHistory();

  /*
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
  }*/

  const [isLoggedIn,setIsLoggedIn]= useState(false);
  const [userInfo,setUserInfo] = useState();

  // Success Handler
  let responseGoogleSuccess = (response) => {
    console.log();
    console.log(response.profileObj);
    console.log(response);
    let userInfo = {
      name: response.profileObj.name,
      emailId: response.profileObj.email,
      googleId: response.profileObj.googleId,
    };
    setUserInfo(userInfo);
    setIsLoggedIn(true);

    history.push('/sign-up',userInfo);

    //MUST Check if user already is member before

   
  };

  // Error Handler
  let responseGoogleError = (response) => {
    console.log(response);
  };

  // Logout Session and Update State
  let logout = (response) => {
    console.log(response);
    let userInfo = {
      name: "",
      emailId: "",
      googleId:"",
    };
    setUserInfo(userInfo);
    setIsLoggedIn(false)
  };


    return (
      <div className="row mt-5">
        <div className="col-md-12">
          {isLoggedIn ? (
            <div >
              <h5>Welcome, {userInfo.name}</h5>
              <p>{}</p>
               <div class="google-button">
                   <GoogleLogout
                    clientId={CLIENT_ID}
                    buttonText={"Logout"}
                    onLogoutSuccess={logout}
                    ></GoogleLogout>
              </div> 
              
            </div>
          ) : (
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign Up with Google"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleError}
              isSignedIn={true}
              cookiePolicy={"single_host_origin"}
            />
          )}
        </div>
      </div>
    );
  }

export default GoogleSignInComponent;