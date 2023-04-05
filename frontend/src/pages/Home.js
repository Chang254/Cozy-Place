import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import desk from '../images/desk.png';
import WeatherApp from '../components/WeatherApp';
import AnimatedPage from '../components/AnimatedPage';


const Home = () => {
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

  return(
    <AnimatedPage>
      <div className = 'home-page'>
        <div className = 'home-container'>
          <h1>Welcome to Your Virtual Desk Space</h1>
          <img src= {desk}/>
          <h3>Check the Weather!</h3>
          <WeatherApp/>
        </div>
      </div>
    </AnimatedPage>
  );

};

export default Home;