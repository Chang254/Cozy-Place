import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Timer from '../components/Timer';
import { useTreesContext } from '../hooks/useTreesContext';
import AnimatedPage from '../components/AnimatedPage';

const Garden = () => {
  const {trees, dispatch} = useTreesContext();
  const [goToLogin, setGoToLogin] = useState(false);

  //Format the time in hours:minutes
  const format = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = Math.floor(time - hours * 60);
  
    return hours + ' hours & ' + minutes + ' minutes';
  };

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

  //Get tree and study time data to render on the screen
  // useEffect(() => {
    
  //   const cookieId = Cookies.get('ssid');
  //   const userid = cookieId.slice(3,cookieId.length - 1);

  //   const fetchTrees = async () => {
  //     const response = await fetch('/trees/' + userid);
  //     const data = await response.json();
      
  //     //Dispatch SET_TREES action to the reducer with a payload of data (data is the tree data for that specific user)
  //     if (response.ok) {
  //       dispatch({type: 'SET_TREES', payload: data});
  //     }
  //   };

  //   fetchTrees();
  // }, []);

  if (goToLogin){
    alert('Session Expired');
    return <Navigate to = "/" />;
  }

  return (
    <AnimatedPage>
      <div className = 'garden'>
        <div className = 'garden-header'>
          <h2>Welcome to your garden!</h2> <br/>
          <h4>Trees Planted</h4>{trees ? trees.totalTrees : '0'}
          <br />
          <h4>Total Time Studied</h4> {trees ? format(trees.studyTime) : '0 minutes'}
          <br/>
          <br/>
          <span><i>Note: Time and trees will only be added if you stay focussed for the entire duration</i></span>
        </div>
        <div className = 'garden-page'>
          <Timer />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Garden;