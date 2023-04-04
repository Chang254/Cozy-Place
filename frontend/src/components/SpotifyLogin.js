import React from 'react';

const AUTH_URL =  'https://accounts.spotify.com/authorize?client_id=aea69ee463624ce79283b55a32e5617e&response_type=code&redirect_uri=http://localhost:3000/music&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

const SpotifyLogin = () => {
  return (
    <div className = 'spotify-login'>
      <a className = "Login-button" href = {AUTH_URL}>
        <span>Connect to Spotify</span>
      </a>
    </div>
  );
};

export default SpotifyLogin;