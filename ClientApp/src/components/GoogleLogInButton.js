import React, {useState } from 'react';
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ADRESS } from '../config';

import '../custom.css';

const CLIENT_ID =
  "194796801307-sho8o1p4mvfp445ej4eibo4utlphkbbb.apps.googleusercontent.com";

function GoogleLoginComponent() {
  /*constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userInfo: {
        name: "",
        emailId: "",
      },
      isUser: false,
      profileId: "",
    };
  }*/

  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [isUser, setIsUser] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();



  let redirect = () => {
    console.log("redirect");  
    if(isUser){
        navigate('/sign-up');
      }
  }
  // Success Handler
  let responseGoogleSuccess = (response) => {
    console.log();
    console.log(response.profileObj);
    console.log(response);
    let id = response.profileObj.googleId;

    setIsLoggedIn(true);

    //Skapa ett API anrop
    
    
    
    //axios.get('https://jec.fyi.com/unknown-url/')
    axios.get(API_ADRESS + '/api/profile/googleID/' + 11)
    .then(res => {
      console.log(res);
      setIsUser(true);

      // --------------- Borde redirecta till explore, sätt id till global varabel?----------------
      const profileId = res.data;
      redirect();
       
     

      })
      .catch(function (error){
          //console.log(error);
          if(error.response.status === 404){
            //console.log("vi är här");
           setIsUser(false);
            //skriva ut att man inte har en användare.
            console.log("hej");
            setError("You are not a registered user.");
          }
      });
  };

  // Error Handler
  let responseGoogleError = (response) => {
    //console.log(response);
  };

  // Logout Session and Update State
  //inte säkert att vi ska använda denna!
  let logout = (response) => {
    console.log(response);
    setIsLoggedIn(false);
  };


    return (
      <div className="row mt-5">
        <div className="col-md-12">
        <p>{error}</p>
          
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText="Sign In with Google"
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