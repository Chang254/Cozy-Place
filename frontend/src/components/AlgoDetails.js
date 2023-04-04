import React from 'react';
import { useAlgosContext } from '../hooks/useAlgosContext';
import { EditAlgoModal } from './modals/EditAlgoModal.jsx';

const AlgoDetails = ({ algo }) => {
  
  const { dispatch } = useAlgosContext();

  //Handle a delete action on a specific algo
  const handleClickDel = async () => {
    //Make a delete request to the backend witht he algo id as a param
    const response = await fetch('/api/algos/' + algo._id, {
      method: 'DELETE'
    });

    //Response is the deleted algo, if the response is ok, go ahead and delete it
    const data = await response.json();

    if (response.ok){
      //dispatch an action of type: DELETE_ALGO to AlgosContext with payload of deleted array.
      //In the AlgosContext, the deleted algo is filtered out of the array of rendered algos
      dispatch({type: 'DELETE_ALGO', payload: data});
    }

  };

  //Handle an edit action on a specific algo
  const handleClickEdit = async () => {
    const response = await fetch('/api/algos/' + algo._id, {
      method: 'PATCH'
    });
    //Return the edited algo
    const data = await response.json();

    //Dispatch an edit algo action to update state, which will be reflected on the page.  Data is the edited algo.
    if (response.ok){
      dispatch({type: 'EDIT_ALGO', payload: data});
    }

  };

  return(
    <div className = "algo-details">
      <h4>
        <a target="_blank" rel="noreferrer noopener" href= {'https://leetcode.com/problems/' + algo.title.split(' ').join('-')} > {algo.title}</a>
      </h4>
      <p><strong>Description: </strong>{algo.description}</p>
      <span id = 'delete-btn' className = 'material-symbols-outlined' onClick = {handleClickDel}>Delete</span><br/>
      <EditAlgoModal algo = {algo}/>
    </div>
  );
};


export default AlgoDetails;