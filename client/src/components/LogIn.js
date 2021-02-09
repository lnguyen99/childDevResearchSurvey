import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from './utils/refreshToken';
import { useHistory } from "react-router-dom";

export default function LogIn(props) {
  const { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_ALLOWED_EMAILS } = process.env;
  const allowedEmails = REACT_APP_ALLOWED_EMAILS?.split(', '); 
  const history = useHistory();

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res);
    if (allowedEmails.includes(res.profileObj?.email)) {
      props?.login(); 

      // fix bug doc https://reactrouter.com/web/example/auth-workflow 
      //https://stackoverflow.com/questions/34119793/react-router-redirection-after-login
      history.push("/dashboard");
    } else {
      alert(`Unauthorized user`);
    }
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(`Failed to login`);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: REACT_APP_GOOGLE_CLIENT_ID,
    isSignedIn: true,
    accessType: 'offline',
  });

  return (
      <div onClick={signIn}>{props.children}</div>
  );
}