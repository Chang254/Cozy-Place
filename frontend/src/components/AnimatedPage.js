import React from 'react';
import { motion } from 'framer-motion';

//Transition animation for each page
const animations = {
  initial: {opacity: 0, x:100},
  animate: {opacity: 1, x: 0},
  exit: {opacity: 0, x: -100}
};

//Wrap all page components in animated page component 
const AnimatedPage = ({children}) => {
  return (
    <motion.div variants = {animations} initial = 'initial' animate='animate' exit = 'exit' transition = {{duration: 1}}>
      {children}
    </motion.div>
  );
};

export default AnimatedPage;