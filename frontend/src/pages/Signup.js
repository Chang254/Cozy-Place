import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SignupForm from '../components/SignupForm';
import catimg from '../images/catsignup.png';
import AnimatedPage from '../components/AnimatedPage';

const Signup = () => {
  //State for checking if user is logged in
  const [goToHome, setGoToHome] = useState(false);

  useEffect(() => {
    //Check for login session
    const checkSession = async () => {
      const cookieId = Cookies.get('ssid');
      //If no cookie exists, then the user does not have a session yet, so allow them to access the page
      if (!cookieId){
        return;
      }
      //Format cookie value to send to backend
      const cookieIdAdj = cookieId.slice(3,cookieId.length - 1);
      //Get the session associated with the cookie
      const response = await fetch('/users/sessions/' + cookieIdAdj, {
        method: 'GET'
      });
      const data = await response.json();
      console.log(data);
      //If the response is ok (there is a session) send the user to the home page (they already are logged in)
      //They should not be on the signup page
      if (response.ok){
        return setGoToHome(true);
      }

    };
    //Run the function above to check for session
    checkSession();
  });

  //If the user is logged in (goToHome true) alert the user and redirect to home page
  if (goToHome){
    alert('Already Logged In');
    return <Navigate to = "/home" />;
  }

  return (
    <AnimatedPage>
      <div className = "login-page">
        <div className = "login-box">
          <h1>Sign Up Form</h1>
          <img src = {catimg}></img>
          <SignupForm />
          <Link to ="/">
            <span><h3>Back to Log In</h3></span>
          </Link>
        </div>
      </div>
    </AnimatedPage>
  );  
};

export default Signup;