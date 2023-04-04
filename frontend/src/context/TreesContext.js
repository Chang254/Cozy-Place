import React, { Component, createContext, useReducer } from 'react';

export const TreesContext = createContext();

export const treesReducer = (state, action) => {
  switch (action.type) {
  case 'SET_TREES':
    console.log(action.payload);
    return {
      trees: action.payload
    };

  case 'EDIT_TREE':
    return {
      trees: action.payload
    };

  default:
    return state;
  }
};

export const TreesContextProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(treesReducer, {
    trees: null
  });
  


  return(
    <TreesContext.Provider value = {{...state, dispatch}}>
      { children }
    </TreesContext.Provider>
  );
};