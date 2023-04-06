import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import sunny from '../images/Sunny.png';
import clouds from '../images/Clouds.gif';
import rainy from '../images/Rainy.png';
import snowy from '../images/Snowy.gif';

const WeatherApp = () => {
  const [weather, setWeather] = useState('');
  const [query, setQuery] = useState('');
  const [bg, setBg] = useState(clouds);
  const api = '267dabcbf7b2456243e0249f1af8f814';
  

  const search = e => {
    //Make a get request when the enter key is pressed after entering a city in search box.
    if (e.key === 'Enter'){
      axios('https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=imperial&APPID=' + api)
        .then(data => {
          //Set weather state to returned data for assignment on the home page
          setWeather(data.data);
          setQuery('');
          //Render background image depending on the weather
          if (data.data.weather[0].main === 'Clear'){
            setBg(sunny);
          }
          else if (data.data.weather[0].main === 'Clouds'){
            setBg(clouds);
          }
          else if (data.data.weather[0].main === 'Rain'){
            setBg(rainy);
          }
          else if (data.data.weather[0].main === 'Drizzle'){
            setBg(rainy);
          }
          else if (data.data.weather[0].main === 'Snow' || data.data.weather[0].main === 'Extreme'){
            setBg(snowy);
          }
          
        }).catch(error => {
          console.log(error);
        });
    }
  };

 
  return(
    <div className = "weather-app">
      <input
        type = "text"
        className = "location-search"
        placeholder = "Search by City"
        onChange = {e => setQuery(e.target.value)}
        value = {query}
        onKeyDown = {search}
      />
      {(typeof weather.main !== 'undefined') ? (
        <div className = 'weather-info' style = {{backgroundImage: `url(${bg})`}}>
          <span className = 'location'>{weather.name}, {weather.sys.country}</span>
          <span className = 'temp'>{Math.round(weather.main.temp)} °F</span>
          <span className = 'weather'>{weather.weather[0].main}</span>
        </div>
      ) : ('') }
    </div>
  );
};

export default WeatherApp;