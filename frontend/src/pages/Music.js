import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SpotifyLogin from '../components/SpotifyLogin';
import SpotifyDashboard from '../components/SpotifyDashboard';
import AnimatedPage from '../components/AnimatedPage';

const Music = () => {
  const [goToLogin, setGoToLogin] = useState(false);

  //Check for active session, if no active session is found redirect the user to the login page
  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch('/api/users/sessions/', {
        method: 'GET'
      });
      const data = await response.json();
      //If a session is found, do nothing (user is fine to access page)
      if (response.ok){
        return;
      }
      //If a session is not found, send the user back to login page
      else{
        return setGoToLogin(true);
      }
    };
    checkSession();
  });
  
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