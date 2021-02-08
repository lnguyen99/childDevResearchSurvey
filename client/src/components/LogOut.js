import React from 'react';
import { useGoogleLogout } from 'react-google-login';
import { useHistory } from "react-router-dom";

export default function LogOut(props) {
  const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
  const history = useHistory();

  const onLogoutSuccess = (res) => {
    props?.logout(); 
    history.push("/");
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId: REACT_APP_GOOGLE_CLIENT_ID,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <div type='button' onClick={signOut} className="nav-link">Log Out</div>
  );
}