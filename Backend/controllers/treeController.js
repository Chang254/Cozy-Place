const Tree = require('../models/treeModel');
const path = require('path');
const treeController = {};


//Get tree
treeController.getTree = async (req, res, next) => {
  //Userid sent from the frontend
  const userId = req.cookies.ssid;

  try{
    //Find tree data associated with the user and save it to res.locals for return to the user's garden page
    const tree = await Tree.findOne({userId: userId});
    res.locals.tree = tree;
    return next();
    //Catch error and return to the global error handler
  }catch(error){
    {return next({
      log: `getTree error handler caught an error: ${error}`,
      message: {err: 'treeController.getTree: ERROR: Check server logs for details'}
    });
    }
  }
};



//Add tree
treeController.addTree = async (req, res, next) => {
  //UserId and study time to be added from the frontend
  const userId = req.cookies.ssid;
  const { studyTime } = req.body;

  try{
    //Find the tree data for the user
    let tree = await Tree.findOne({userId: userId});
    //If the user doesn't have data yet, create a new entry in the collection with 1 tree and study time equal to the amount sent
    if (!tree){
      const newTree = await Tree.create({userId: userId, totalTrees: 1, studyTime: studyTime});
      res.locals.tree = newTree;
      return next();
    } 
    //If the user has existing data, increment the current data by 1 tree and the amount of study time specified in the body of the request
    tree = await Tree.findOneAndUpdate({userId: userId}, {$inc: { totalTrees: 1 , studyTime: studyTime}}, {new:true});
    res.locals.tree = tree;
    return next();
    //Catch error and return to the global error handler
  }catch(error){
    {return next({
      log: `addTree error handler caught an error: ${error}`,
      message: {err: 'treeController.addTree: ERROR: Check server logs for details'}
    });
    }
  }
};


module.exports = treeController;
