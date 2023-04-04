import React, { useContext } from 'react';
import { AlgosContext } from '../context/AlgoContext';


export const useAlgosContext = () => {
  const context = useContext(AlgosContext);

  if (!context) {
    throw Error('useAlgosContext must be used inside a AlgosContextProvider');
  }

  return context;
};