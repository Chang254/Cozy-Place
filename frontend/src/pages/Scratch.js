import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Calculator from '../components/Calculator';
import pens from '../images/pens.png';
import AnimatedPage from '../components/AnimatedPage';
import deskSurface from '../images/desksurface.png';
import clipboard from '../images/clipboard.png';

const Scratch = () => {
  //State
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

  //Send user to login page
  if (goToLogin){
    alert('Session Expired');
    return <Navigate to = "/" />;
  }

  return (
    <AnimatedPage>
      <div className = "scratch-page">
        <div className = 'table' style = {{background: `url(${deskSurface})`}}>
          <img src = {pens}/>
          <div className = 'paper-container' style = {{background:`url(${clipboard})`}}>
            <textArea id = 'paper' type = "text"/>
          </div>
          <div className = 'calc-container'>
            <Calculator />
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Scratch;