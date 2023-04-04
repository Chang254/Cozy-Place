import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const useSpotAuth = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  //Make a post request to server with the code and converts it to an access token
  useEffect(() => {
    axios.post('http://localhost:4000/api/spotify/login', {
      code,
    })
      .then(response => {
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setExpiresIn(response.data.expiresIn);
        window.history.pushState({}, null, '/music');
      }).catch(() => {
        window.location = '/music';
      });
  }, [code]);

  //Refresh the token automatically
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const timeOut = setInterval(() => {
      axios.post('http://localhost:4000/api/spotify/refresh', {
        refreshToken,
      })
        .then(response => {
          setAccessToken(response.data.accessToken);
          setExpiresIn(response.data.expiresIn);
        }).catch(() => {
          window.location = '/music';
        });

    }, (expiresIn - 60) * 1000);

    return () => clearTimeout(timeOut);
    
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default useSpotAuth;