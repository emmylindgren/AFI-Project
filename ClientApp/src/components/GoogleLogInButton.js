import React, {useState } from 'react';
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ADRESS } from '../config';

import '../custom.css';

const CLIENT_ID =
  "194796801307-sho8o1p4mvfp445ej4eibo4utlphkbbb.apps.googleusercontent.com";

function GoogleLoginComponent() {

  const [error, setError] = useState("");
  const navigate = useNavigate();



  
  // Success Handler
  let responseGoogleSuccess = (response) => {
    console.log();
    console.log(response.profileObj);
    console.log(response);
    let id = response.profileObj.googleId;
  
    //kollar om användaren som försöker logga in är medlem
    axios.get(API_ADRESS + '/api/profile/googleID/' + id)
    .then(res => {
      console.log(res);
      
      // --------------- Borde redirecta till explore, sätt id till global varabel?----------------
      const profileId = res.data;
      localStorage.setItem("profileId", profileId);
      navigate('/sign-up');
      
      })

      .catch(function (error){
          //console.log(error);
          if(error.response.status === 404){
            //console.log("vi är här");
          
            //skriva ut att man inte har en användare.
            console.log("hej");
            setError("You are not a registered user.");
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
              buttonText="Log In with Google"
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleError}
              isSignedIn={true}
              cookiePolicy={"single_host_origin"}
            />
          
        </div>
      </div>
    );
  }
export default GoogleLoginComponent;