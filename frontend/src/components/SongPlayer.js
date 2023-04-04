import React from 'react';
import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const SongPlayer = ({accessToken, trackUri}) => {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  },[trackUri]);

  if (!accessToken) return null;
  return <SpotifyPlayer 
    token = {accessToken}
    showSaveIcon
    callback = {state => {
      if (!state.isPlaying) setPlay(false);
    }
    }
    play = {play}
    uris = {trackUri ? [trackUri] : []}
    initialVolume = {0.1}
    styles = {{
      bgColor: 'rgb(255, 255, 255, 0.25)',
      trackArtistColor: 'rgb(200, 3, 250)',
      trackNameColor: 'rgb(200, 3, 250)',
      activeColor: 'purple'
    }}
  />;
};

export default SongPlayer;