const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');


//User signs up
router.post('/signup', 
  userController.createUser, 
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

//Check for session
router.get('/sessions',
  sessionController.verifySession,
  (req, res) => {
    res.status(200).json(res.locals.session);
  }
);

//User logs in
router.post('/login', 
  userController.verifyUser, 
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    res.status(200).json(res.locals.session);
  }
);

//User logs out
router.delete('/logout',
  sessionController.deleteSession,
  (req, res) => res.status(200).json(res.locals.session)
);

module.exports = router;