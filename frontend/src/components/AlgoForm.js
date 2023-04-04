import React, { useState } from 'react';
import { useAlgosContext } from '../hooks/useAlgosContext';
import Cookies from 'js-cookie';
import corgi from '../images/corgiga.png';

//form for creating new algos
const AlgoForm = () => {
  const { dispatch } = useAlgosContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [emptyFields, setEmptyFields] = useState([]);

  //Handle the submit of the create algo form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //Get algo information from state set in the form and user id to tie algo to user
    const cookieId = Cookies.get('ssid');
    const user_id = cookieId.slice(3,cookieId.length - 1);
    const algo = {title, description, user_id};

    //Make a post request to backend to make new algo
    const response = await fetch('/api/algos', {
      method: 'POST',
      body: JSON.stringify(algo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    if (!response.ok){
      setError(data.error);
      setEmptyFields(data.emptyFields);
    }
    //Data is the created algo. Dispatch a new CREATE_ALGO action to the algoReducer with payload of the new algo
    if (response.ok){
      setEmptyFields([]);
      setTitle('');
      setDescription('');
      setError(null);
      dispatch({type: 'CREATE_ALGO', payload: data});
    }
  };

  return (
    <>
      <form className = "create" onSubmit = {handleSubmit}>
        <div id = 'algo-header'>
          <img id = 'corgi-img' src = {corgi}></img><h3>Add a New Algorithm</h3><img id = 'corgi-img' src = {corgi}></img>
        </div>

        <label>Problem </label>
        <input
          type = "text"
          onChange = {(e) => setTitle(e.target.value)}
          value = {title}
          className = {emptyFields.includes('title') ? 'error' : ''}
        />

        <label>Description </label>
        <textarea
          type = "text"
          onChange = {(e) => setDescription(e.target.value)}
          value = {description}
          className = {emptyFields.includes('description') ? 'error' : ''}
        />

        <button>Add Algo</button>
        {error && <div className = "error">{error}</div>}
      </form>
      <hr></hr>
    </>
  );

};

export default AlgoForm;