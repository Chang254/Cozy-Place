import React, { useContext } from 'react';
import { TreesContext } from '../context/TreesContext';


export const useTreesContext = () => {
  const context = useContext(TreesContext);

  if (!context) {
    throw Error('useTreesContext must be used inside a TreesContextProvider');
  }

  return context;
};