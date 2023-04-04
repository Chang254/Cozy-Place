import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SpotifyLogin from '../components/SpotifyLogin';
import SpotifyDashboard from '../components/SpotifyDashboard';
import AnimatedPage from '../components/AnimatedPage';

const Music = () => {
  const [goToLogin, setGoToLogin] = useState(false);

  //Check for active session, if no active session is found redirect the user to the login page
  // useEffect(() => {
  //   const checkSession = async () => {
  //     //Grab cookie ssid value
  //     const cookieId = Cookies.get('ssid');
  //     //if no cookie, the user is not logged in
  //     if (!cookieId){
  //       return setGoToLogin(true);
  //     }
  //     //Format the cookie value to send in the body of the response
  //     const cookieIdAdj = cookieId.slice(3,cookieId.length - 1);
  //     //Note GET doesn't need to be specified, but added for readability (fetch default method is a GET request)
  //     const response = await fetch('/users/sessions/' + cookieIdAdj, {
  //       method: 'GET'
  //     });
  //     const data = await response.json();
  //     //If a session is found, do nothing (user is fine to access page)
  //     if (response.ok){
  //       return;
  //     }
  //     //If a session is not found, send the user back to login page
  //     else{
  //       return setGoToLogin(true);
  //     }
  //   };
  //   checkSession();
  // });
  
  if (goToLogin){
    alert('Session Expired');
    return <Navigate to = "/" />;
  }

  const code = new URLSearchParams(window.location.search).get('code');
  //If the code doesn't exist yet, only show the login button (SpotifyLogin component), if it is generated from login -> render the spotify dashboard
  return (
    <AnimatedPage>
      {code ? <SpotifyDashboard code = {code} /> : <SpotifyLogin />}
    </AnimatedPage>
  );
};

export default Music;