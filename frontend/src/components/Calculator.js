import React from 'react';
import { useState } from 'react';

//NOTE: Probably refactor this calculator to not use eval since it is a security risk
const Calculator = () => {
  const [calc, setCalc] = useState('');

  //Define possible operations in the calculator
  const ops = ['/', '*', '+', '-', '.'];

  //Function to update calc
  const updateCalc = (value) => {
    // If calc is empty and you try to pass in an operation, do nothing. 
    // If the last value in the calc is already an operation and you try to pass in another, do nothing
    if (
      ops.includes(value) && calc === '' ||
      ops.includes(value) && ops.includes(calc.slice(-1))
    ){
      return;
    }
    //Else append the value passed in to the end of calc
    setCalc(calc + value);
  };
  
  const calculate = () => {
    //evaluate the string in javascript and return it as a string
    setCalc(eval(calc).toString());
  };

  const del = () => {
    //Delete the last element in the calc string
    if (calc === '') return;
    else {setCalc(calc.slice(0, -1));
    }
  };

  //Clear the entire calc string
  const ac = () => setCalc('');


  return (
    <div className = "calculator-grid">
      <div className = "result-box">
        <span>{ calc || '0'}</span>
      </div>
      <button className = "two-col" id='ac' onClick = {ac}>AC</button>
      <button id = "calc-del" onClick = {del}>DEL</button>
      <button className = 'operand' onClick = {() => updateCalc('/')}>%</button>
      <button onClick = {() => updateCalc('1')}>1</button>
      <button onClick = {() => updateCalc('2')}>2</button>
      <button onClick = {() => updateCalc('3')}>3</button>
      <button className = 'operand' onClick = {() => updateCalc('*')}>x</button>
      <button onClick = {() => updateCalc('4')}>4</button>
      <button onClick = {() => updateCalc('5')}>5</button>
      <button onClick = {() => updateCalc('6')}>6</button>
      <button className = 'operand' onClick = {() => updateCalc('-')}>-</button>
      <button onClick = {() => updateCalc('7')}>7</button>
      <button onClick = {() => updateCalc('8')}>8</button>
      <button onClick = {() => updateCalc('9')}>9</button>
      <button className = 'operand' onClick = {() => updateCalc('+')}>+</button>
      <button className = "two-col" onClick = {() => updateCalc('0')}>0</button>
      <button onClick = {() => updateCalc('.')}>.</button>
      <button className = 'operand' onClick = {calculate}> = </button>
    </div>
  );
};

export default Calculator;