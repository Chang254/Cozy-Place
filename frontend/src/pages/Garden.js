import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
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
  //Get tree and study time data to render on the screen
  useEffect(() => {

    const fetchTrees = async () => {
      const response = await fetch('/api/trees/');
      const data = await response.json();
      
      //Dispatch SET_TREES action to the reducer with a payload of data (data is the tree data for that specific user)
      if (response.ok) {
        dispatch({type: 'SET_TREES', payload: data});
      }
    };

    fetchTrees();
  }, []);

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