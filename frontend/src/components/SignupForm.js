import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const SignupForm = () => {
  //State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);
  const [goToLogin, setGoToLogin] = useState(false);

  //On submission of login form
  const handleSubmit = async (e) => {
    //prevent default behavior of form submission
    e.preventDefault();
    //Grab username and password (from state) and assign them to user constant
    const user = {username, password};

    //Post request to backend with user constant as request body
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    //Backend returns user
    const data = await response.json();

    //If response is not okay, return the error to the user (a field was not filled in)
    if (!response.ok){
      setError(data.error);
    }
    //If the response is okay, reset state and navigate the user to login
    if (response.ok){
      setEmptyFields([]);
      setUsername('');
      setPassword('');
      setError(null);
      setGoToLogin(true);
    }
  };

  //Once user has signed up, redirect to login page
  if (goToLogin){
    return <Navigate to = "/" />;
  }

  //Note the divs are named the same as the login page for styling purposes (the styling is consistent between the two pages)
  //Also note that value isn't necessarily needed, as the state is set in onChange
  return (
    <>
      <form className = "login-form" onSubmit = {handleSubmit}>
        <div className = "form-inputs">
          <div className = "form-group">
            <label>Username: </label>
            <input
              type = "text"
              onChange = {(e) => setUsername(e.target.value)}
              value = {username}
              className = {emptyFields.includes('title') ? 'error' : ''}
            />
          </div>

          <div className = "form-group">
            <label>Password:  </label>
            <input
              type = "password"
              onChange = {(e) => setPassword(e.target.value)}
              value = {password}
              className = {emptyFields.includes('title') ? 'error' : ''}
            />
          </div>
        </div>

        <button>Sign Up</button>
      </form>
      {error && <div className = "error">{error}</div>}
    </>
  );

};

  
export default SignupForm;