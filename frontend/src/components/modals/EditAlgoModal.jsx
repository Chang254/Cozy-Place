import React, { useState } from 'react';
import { useAlgosContext } from '../../hooks/useAlgosContext';

//Form for editing algos
export const EditAlgoModal = ({ algo }) => {
  const { dispatch } = useAlgosContext();
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newAlgo = { description };
    //Make a patch request to backend sending description as the body
    const response = await fetch('/api/algos/' + algo._id, {
      method: 'PATCH',
      body: JSON.stringify(newAlgo),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    //If response comes back with an error, return that error to the user (what fields are they missing?)
    if (!response.ok){
      setError(data.err);
    }
    //Dispatch an edit algo action to the reducer ()
    if (response.ok){
      setDescription('');
      setError(null);
      console.log('Algo Updated');
      setModal(!modal);
      dispatch({type: 'EDIT_ALGO', payload: data});
    }
  };
  //Only render modal if modal state is true (when the edit button is clicked)
  return (
    <>
      <span id = 'modal-btn'
        className = 'material-symbols-outlined'
        onClick = {toggleModal}>
            Edit
      </span>
      {modal && 
        <div className = "modal">
          <form className = "edit" onSubmit = {handleSubmit}>

            <label>Description: </label>
            <textArea
              type = "text"
              onChange = {(e) => setDescription(e.target.value)}
              value = {description}
          
            >
              {algo.description}
            </textArea>
            <button>Change Algo</button>
            {error && <div className = "error">{error}</div>}
          </form>
        </div>
      }
    </>
      
  );

};