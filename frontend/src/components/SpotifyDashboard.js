import React from 'react';
import { useState, useEffect } from 'react';
import useSpotAuth from '../hooks/useSpotAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import SongPlayer from './SongPlayer';
import album from '../images/disk.png';
import phone from '../images/phone.png';

const spotifyApi = new SpotifyWebApi({
  clientId: 'aea69ee463624ce79283b55a32e5617e'
});

const SpotifyDashboard = ({code}) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const accessToken = useSpotAuth(code);
  
  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch('');
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    
    let cancel = false;
    spotifyApi.searchTracks(search)
      .then(response => {
        if (cancel) return;
        setSearchResults(response.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
            return image.height < smallest.height ? image : smallest;
          }, track.album.images[0]);

          return{
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url
          };
        }));
      });

    return () => cancel = true;
  }, [search, accessToken]);

  return (
    <div className = 'spotify-page'>
      <img src = {album}/>
      <div className = "spotify-dash">
        <div className = "spotify-search">
          <form>
            <input
              type = "text"
              onChange = {(e) => setSearch(e.target.value)}
              value = {search}
              placeholder = 'Search Songs'
            />
          </form>
        </div>
        <div className = "songs">
          {searchResults.map(track => (
            <TrackSearchResult track ={track} key = {track.uri} chooseTrack = {chooseTrack} />
          ))}
        </div>
        <div className = 'song-player'>
          <p><SongPlayer accessToken = {accessToken} trackUri = {playingTrack?.uri}/></p>
        </div>
      </div>
      <img src = {phone}/>
    </div>
  );
};

export default SpotifyDashboard;