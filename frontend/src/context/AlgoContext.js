import React, { createContext, useReducer } from 'react';

export const AlgosContext = createContext();

//Algo reducer which defines various actions that can be made to mutate algo state
export const algosReducer = (state, action) => {
  switch (action.type) {
  case 'SET_ALGOS':
    return {
      algos: action.payload
    };
  case 'CREATE_ALGO':
    return {
      algos: [action.payload, ...state.algos]
    };

  case 'DELETE_ALGO':
    return {
      algos: state.algos.filter((a) => a._id !== action.payload._id)
    };

  case 'EDIT_ALGO':
    return {
      algos: state.algos.map((a) => a._id === action.payload._id ? action.payload : a)
    };

  default:
    return state;
  }
};
//Define context provider -> reducer is algosReducer and initial argument is algos (algos is null at the start and will be set when the algos page is rendered using the SET_ALGOS action)
export const AlgosContextProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(algosReducer, {
    algos: null
  });
  

  //Provider passes state and dispatch props to children
  return(
    <AlgosContext.Provider value = {{...state, dispatch}}>
      { children }
    </AlgosContext.Provider>
  );
};