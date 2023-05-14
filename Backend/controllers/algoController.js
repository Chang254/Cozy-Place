const Algo = require('../models/algoModel');
const mongoose = require('mongoose');
const algoController = {};

//GET all algos
algoController.getAlgos = async (req, res, next) => {

  const userid = req.cookies.ssid;

  try{
    //GET algos data by finding all algos and sorting with newest algo created at the top
    const algos = await Algo.find({user_id: userid}).sort({createdAt: -1});
    //Save algos data in res.locals
    res.locals.algos = algos;
    return next();
  }catch (error) {
    {return next({
      log: `getAlgos error handler caught an error: ${error}`,
      message: {err: 'algosController.getAlgos: ERROR: Check server logs for details'}
    });
    }
  }
};

//Get a single algo
algoController.getAlgo = async (req, res, next) => {
//Get the algo ID requested
  const { id } = req.params;
  //If the ID is not a valid type -> return an error
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such algo'});
  }

  try{
    const algo = await Algo.findById(id);
    //If the requested algo does not exist -> return an error
    if (!algo){
      return res.status(404).json({error: 'No such algo'});
    } 
    res.locals.algo = algo;
    return next();
    //Catch error and return to the global error handler
  }catch(error){
    {return next({
      log: `getAlgo error handler caught an error: ${error}`,
      message: {err: 'algoController.getAlgo: ERROR: Check server logs for details'}
    });
    }
  }
};

//Delete an algo
algoController.deleteAlgo = async (req, res, next) => {
  //Get the algo ID requested
  const { id } = req.params;
  //If the ID is not a valid type -> return an error
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such algo'});
  }

  try{
    const algo  = await Algo.findOneAndDelete({_id: id});
    //If the requested algo does not exist -> return an error
    if (!algo){
      return res.status(404).json({error: 'No such algo'});
    }
    //Save the requested algo in res.locals for return (step is not needed, but helps us see the structure of the deleted algo object when we make a delete request)
    res.locals.deleted = algo;
    return next();
    //Catch error and return to the global error handler
  }catch(error){
    {return next({
      log: `deleteAlgos error handler caught an error: ${error}`,
      message: {err: 'algoController.deleteAlgo: ERROR: Check server logs for details'}
    });
    }
  }


};

//Update an algo
algoController.updateAlgo = async (req, res, next) => {
  //Get the algo ID requested
  const { id } = req.params;
  //If the ID is not a valid type -> return an error
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such algo'});
  }

  try{
    const algo = await Algo.findOneAndUpdate({_id: id}, {...req.body}, {new:true});
    //If the requested algo does not exist -> return an error
    if (!algo){
      return res.status(404).json({error: 'No such algo'});
    }
    //Save the requested algo in res.locals for return  (step is not needed, but helps us see the structure of the updated algo object when we make a patch request)
    res.locals.updated = algo;
    return next();
    //Catch error and return to the global error handler
  }catch(error){
    {return next({
      log: `updateAlgo error handler caught an error: ${error}`,
      message: {err: 'algoController.updateAlgo: ERROR: Check server logs for details'}
    });
    }
  }

};


//Create an algo
algoController.createAlgo = async (req, res, next) => {
//Get the title, weight, and reps from the request body
  const {title, description} = req.body;
  const user_id = req.cookies.ssid;
  
  //emptyFields array for error handling (should return a list of empty fields to the user)
  const emptyFields = [];

  if (!title){
    emptyFields.push('title');
  }

  if (!description){
    emptyFields.push('description');
  }

  if(emptyFields.length > 0){
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields});
  }

  try{
    //Create a new algo by calling the .create method on the Algo model
    const algo = await Algo.create({title, description, user_id});
    //Save the new algo in res.locals (step is not needed, but helps us see the structure of the new algo object when we make a post request)
    res.locals.newAlgo = algo;
    return next();
    //Catch error and return to the global error handler
  } catch (error) {
    {return next({
      log: `createAlgos error handler caught an error: ${error}`,
      message: {err: 'algoController.createAlgo: ERROR: Check server logs for details'}
    });
    
    }
  }
};

module.exports = algoController;
