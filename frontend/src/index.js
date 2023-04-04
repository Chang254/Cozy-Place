import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

//Hang app off of the root DOM element (everything else hangs off of App)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

