import React from 'react';

const TrackSearchResult = ({track, chooseTrack}) => {

  const handlePlay = () => {
    chooseTrack(track);
  };

  return(
    <div className = 'track' onClick = {handlePlay}>
      <img src = {track.albumUrl} style = {{height: '64px' ,width: '64px'}}/>
      <div className = "track-text">
        <div className = "trackTitle">
          {track.title}
        </div>
        <div className = "trackArtist">
          {track.artist}
        </div>
      </div>
    </div>
  );
};

export default TrackSearchResult;