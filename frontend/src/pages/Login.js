import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import catimg from '../images/cats.png';
import AnimatedPage from '../components/AnimatedPage';

const Login = () => {
  //UseState hook to indicate if user is logged in already or not (should they be allowed to access login?)
  const [goToHome, setGoToHome] = useState(false);

  useEffect(() => {
    //Check for login
    const checkSession = async () => {
      //Get the session associated with the cookie
      const response = await fetch('/api/users/sessions', {
        method: 'GET'
      });
      const data = await response.json();
      //If the response is ok (there is a session) send the user to the home page (they already are logged in)
      //They should not be on the login page
      if (response.ok){
        return setGoToHome(true);
      }

    };
    //Run the function above to check for session
    checkSession();
  });

  //If user is logged in (goToHome is true), alert the user and redirect them to home page
  if (goToHome){
    alert('Already Logged In');
    return <Navigate to = "/home" />;
  }

  return (
    <AnimatedPage>
      <div className = "login-page">
        <div className = "login-box">
          <h1>Cozy Place</h1>
          <img src = {catimg}></img>
          <LoginForm />
          <Link to ="/signup">
            <span><h3>Sign Up</h3></span>
          </Link>
        </div>
      </div>
    </AnimatedPage>
  );

};

export default Login;


