const express = require('express');
const router = express.Router();
const treeController = require('../controllers/treeController');


//Get user tree data to render on garden page
router.get('/:userId',
  treeController.getTree,
  (req, res) => res.status(200).json(res.locals.tree)
);

//Add tree data (total trees and study time) for a specific user
router.patch('/:userId', 
  treeController.addTree, 
  (req, res) => res.status(200).json(res.locals.tree)
);

module.exports = router;