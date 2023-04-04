import React, {  useState } from 'react';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
//State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);
  const [goToHome, setGoToHome] = useState(false);

  //On submission of login form
  const handleSubmit = async (e) => {
    //prevent default form submission event
    e.preventDefault();
    //Get user information from login form
    const user = {username, password};

    //Make a request to the backend with user as body
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    //user is sent back if login successful
    const data = await response.json();

    //If response is not ok, return an error to the user to know what went wrong
    if (!response.ok){
      setError(data.error);
    }
    //If response is ok, send the user to home page and reset state
    if (response.ok){
      setEmptyFields([]);
      setUsername('');
      setPassword('');
      setError(null);
      console.log('login success');
      setGoToHome(true);
    }
  };

  //Navigate home
  if (goToHome){
    return <Navigate to = "/home" />;
  }

  //Note values probably not needed, state is set onChange
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

        <button>Login</button>
      </form>
      {error && <div className = "error">{error}</div>}
    </>
  );
};

export default LoginForm;