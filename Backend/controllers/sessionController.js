const Session = require('../models/sessionModel');
const mongoose = require('mongoose');
const sessionController = {};

//startSession - create and save a new Session into the database.
sessionController.startSession = (req, res, next) => {

  //Create a new session using the user's id
  Session.create({cookieId: res.locals.user._id})
    .then(response => {
      //save session in res.locals
      res.locals.session = response;
      return next();
      //Catch error and return to the global error handler
    }) .catch(err => {
      return next({
        log: `createSession error handler caught an error: ${err}`,
        message: {err: 'sessionController.create: ERROR: Check server logs for details'}
      });
    }
    );
};

sessionController.verifySession = async (req, res, next) => {

  const cookieId = req.cookies.ssid;

  try{
    //Find session associated with cookieId returned from frontend
    const session = await Session.findOne({cookieId: cookieId});
    //If the requested session does not exist -> return an error (used to deny access to pages based on session status)
    if (!session){
      return res.status(404).json({error: 'Session expired!'});
    } 
    //save session in res.locals
    res.locals.session = session;
    return next();
    //Catch error and return to the global error handler
  }catch(error){
    {return next({
      log: `verifySession error handler caught an error: ${error}`,
      message: {err: 'sessionController.verifySession: ERROR: Check server logs for details'}
    });
    }
  }
};

//Delete a session on logout
sessionController.deleteSession = async (req, res, next) => {
  //CookieId sent from frontend on logout
    const cookieId = req.cookies.ssid;
  
    try{
      //Find and delete the session associated with the cookieId
      const session = await Session.deleteOne({cookieId: cookieId});
      //If the requested session does not exist -> return an error
      if (!session){
        return res.status(404).json({error: 'Session already expired!'});
      } 
      //Save session to res.locals
      res.locals.session = session;
      res.clearCookie('ssid');
      return next();
      //Catch error and return to the global error handler
    }catch(error){
      {return next({
        log: `deleteSession error handler caught an error: ${error}`,
        message: {err: 'sessionController.deleteSession: ERROR: Check server logs for details'}
      });
      }
    }
  };

module.exports = sessionController;
