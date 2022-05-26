import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

const CLIENT_ID =
  "194796801307-sho8o1p4mvfp445ej4eibo4utlphkbbb.apps.googleusercontent.com";

  function GoogleLogOut(){
      const navigate = useNavigate();

      const onSuccess = () => {
        localStorage.setItem("profileId", ""); 
        localStorage.setItem("ApiKey", "");
        navigate('/');
      }
       // Error Handler
    let responseGoogleError = (response) => {
        console.log(response);
    };

      return (
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px', paddingBottom: '50px'}}>
              <GoogleLogout 
              clientId={CLIENT_ID}
              buttonText="Log out"
              onLogoutSuccess={onSuccess}
              onFailure={responseGoogleError}
              ></GoogleLogout>
          </div>
      )
  }

export default GoogleLogOut