import React, { Component, useState } from 'react';
import { GoogleLogin } from "react-google-login";
import { useNavigate } from 'react-router-dom';
import '../custom.css';
import axios from 'axios';
import { API_ADRESS } from '../config';

const CLIENT_ID =
  "194796801307-sho8o1p4mvfp445ej4eibo4utlphkbbb.apps.googleusercontent.com";

function GoogleSignInComponent (){
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Success Handler
  let responseGoogleSuccess = (response) => {
    let id = response.profileObj.googleId;
    let userInfo = {
      firstname: response.profileObj.givenName,
      lastname: response.profileObj.familyName,
      emailId: response.profileObj.email,
      googleId: response.profileObj.googleId,
      imgUrl: response.profileObj.imageUrl,
    };
    //setUserInfo(userInfo);
    //kollar om användaren som försöker logga in är medlem
    axios.get(API_ADRESS + '/api/profile/googleID/' + id)
    .then(res => {
     
            //skriva ut att man inte har en användare.
            console.log("hej");
            setError("You already have an account, please Log In.");
      
      
      })

      .catch(function (error){
          //console.log(error);
          if(error.response.status === 404){
            //console.log("vi är här");
            
            console.log("sucess! Redirect now!")
            navigate('/sign-up', { state: { ...userInfo } });
          }
      });
   
  };

  // Error Handler
  let responseGoogleError = (response) => {
    console.log(response);
  };



    return (
      <div className="row mt-5">
        <div className="col-md-12">
            <p className='err-text'>{error}</p>
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign Up with Google"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleError}
              isSignedIn={false}
              cookiePolicy={"single_host_origin"}
            />
          
        </div>
      </div>
    );
  }

export default GoogleSignInComponent;