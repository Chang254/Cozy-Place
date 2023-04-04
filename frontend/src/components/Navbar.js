import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import logo from '../images/CozyLogo.gif';

const Navbar = () => {
  const [goToLogin, setGoToLogin] = useState(false);

  const handleClick = async () => {
    const response = await fetch('/api/users/logout/', {
      method: 'DELETE'
    });
    const data = await response.json();

    if (response.ok){
      setGoToLogin(true);
    }
  };

  if (goToLogin){
    return <Navigate to = "/" />;
  }

  return(
    <header>
      <div className = "container">
        <Link to ="/home">
          <span className = 'nav-edge'><img src = {logo}></img><h1>CozyPlace</h1></span>
        </Link>
        <div className = 'navbar-pages'>
          <Link to = "/algorithms">
            <span><h3>Algorithms</h3></span>
          </Link>
          <Link to = "/Scratch">
            <span><h3>Scratch</h3></span>
          </Link>
          <Link to = "/garden">
            <span><h3>Garden</h3></span>
          </Link>
          <Link to = "/music">
            <span><h3>Music</h3></span>
          </Link>
        </div>
        <span span className = 'nav-edge' onClick = {handleClick}><h2>Logout</h2></span>
      </div>
    </header>
  );
};

export default Navbar;