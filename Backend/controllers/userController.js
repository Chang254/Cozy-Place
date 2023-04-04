const User = require('../models/userModel');
const path = require('path');
const bcrypt = require('bcryptjs');
const userController = {};



//Create a new user
userController.createUser = (req, res, next) => {
  //Get username and password in request body (sent from user sign up event)
  const { username, password } = req.body;
  //If either one is not present, return a fill all fields error to theuser
  if (!username || !password){
    return res.status(400).json({ error: 'Please fill all fields'});
  }

  //Create a new user with the username and password entered (user should not be case sensitive)
  User.create({username: username.toLowerCase(), password: password})
    .then(response => {
      //Save user in res.locals
      res.locals.user = response;
      return next();
      //Catch error and return to the global error handler
    }) .catch(error => {return next({
      log: `createUser error handler caught an error: ${error}`,
      message: {err: 'userController.createUser: ERROR: Check server logs for details'}
    });
    });
};

//Verify user
userController.verifyUser = async (req, res, next) => {
//Get username and password in request body (sent from user login event)
  const { username, password } = req.body;
  //If either one isn't filled in, return a fill in all fields error to the user
  if (!username || !password){
    return res.status(400).json({ error: 'Please fill all fields'});
  }
  try {
    //Find the user in the database
    const user = await User.find({username: username.toLowerCase()});
    //If no user is found, send the user an error letting them know
    if (user.length === 0) {
      return res.status(400).json({ error: 'Wrong username'});
    }
    //Use bcrypt to compare encrypted password to passed in string password
    bcrypt.compare(password, user[0].password)
      .then(response => {
        if (response === true) {
          //If the password is a match, assign the user to res.locals and verify login
          res.locals.user = user[0];
          return next();
        }
        else{
          //If password is not a match, let the user know by returning an error
          return res.status(400).json({ error: 'Wrong password'});
        }
      });
    //Catch error and return to the global error handler
  }
  catch(error) {
    return next({
      log: `verifyUser error handler caught an error: ${error}`,
      message: {err: 'userController.verifyUser: ERROR: Check server logs for details'}
    });
  }
};

module.exports = userController;
