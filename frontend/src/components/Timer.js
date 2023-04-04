import React from 'react';
import { useRef, useEffect, useState } from 'react';
import sapling from '../images/Sapling.png';
import tree from '../images/Tree.png';
import Cookies from 'js-cookie';
import { useTreesContext } from '../hooks/useTreesContext';

const Timer = () => {
  const { dispatch } = useTreesContext();
  //Default time is 1 hour
  const [countdown, setCountdown] = useState(3600);
  const [addstudyTime, setAddStudyTime] = useState(60);
  //Default image is a sapling
  const [bg, setBg] = useState(sapling);
  const timerId = useRef();

  //Format the time in minutes:seconds
  const format = (time) => {
    if (typeof time === 'string') return time;
    if (isNaN(time)) return 'Time Done';
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
  
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
  
    return minutes + ':' + seconds;
  };


  const setTime = e => {
    //Make a get request when the enter key is pressed after entering a city in search box.
    if (e.key === 'Enter'){
      //Convert seconds to minutes
      setBg(sapling);
      setCountdown(e.target.value * 60);
      setAddStudyTime(e.target.value);
    }
  };

  useEffect(() => {
    if (typeof countdown === 'number'){
    //Countdown by 1 second, starting at the passed in seconds (taken from countdown state)
      timerId.current = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timerId.current);
    }
  }, [countdown]);

  useEffect(() => {
    //If countdown hits 0, stop the timer and sprout a tree for the user!
    if (countdown <= 0){
      setCountdown('Time Done');
      addToTotal();
      setBg(tree);
    }
  });

  //Adds studytime and trees to user's counts
  const addToTotal = async () => {

    const cookieId = Cookies.get('ssid');
    const userid = cookieId.slice(3,cookieId.length - 1);

    const newTree = { studyTime: addstudyTime };

    //Update tree data for the user (increment tree count by 1 and study time by the amount specified in body)
    const response = await fetch('/trees/' + userid, {
      method: 'PATCH',
      body: JSON.stringify(newTree),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();

    //Dispatch an action to the reducer to edit the tree data
    if (response.ok){
      dispatch({type: 'EDIT_TREE', payload: data});
    }
  };

  return (
    <div className = 'timer-box'>
      <div className = 'timer-input'>
        <h3>Time:&nbsp;</h3>
        {/* Can add a minimum value to input so that users can't plant a ton of trees by setting short times */}
        <input
          type = "number"
          className = "location-search"
          onKeyDown = {setTime}
          placeholder = "Mins"
        />
      </div>
      <h2> Time Left: {format(countdown)}</h2>
      <img src = {bg}/>
    </div>
  );
};

export default Timer;