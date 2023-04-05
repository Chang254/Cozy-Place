import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAlgosContext } from '../hooks/useAlgosContext';
import AlgoDetails from '../components/AlgoDetails';
import AlgoForm from '../components/AlgoForm';
import AnimatedPage from '../components/AnimatedPage';

const Algorithms = () => {
  const {algos, dispatch} = useAlgosContext();
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

  //Grab algos for specific user stored in the database
  useEffect(() => {
    
    const fetchAlgos = async () => {
      const response = await fetch('/api/algos/all');
      const data = await response.json();
      //Once algos are found, dispatch an action to set the algos state (data is the array of algos)
      if (response.ok) {
        dispatch({type: 'SET_ALGOS', payload: data});
      }
    };

    fetchAlgos();
  }, []);

  //Send user back to login if no session is found
  if (goToLogin){
    alert('Session Expired!');
    return <Navigate to = "/" />;
  }

  return (
    <AnimatedPage>
      <div className = "algopage">
        <AlgoForm />
        <div className = "algos">
          {algos && algos.map( (algo) => (
            <AlgoDetails key = {algo.id} algo = {algo}/>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Algorithms;