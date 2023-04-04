const express = require('express');
const router = express.Router();

const algoController = require('../controllers/algoController');


//GET all algos
router.get('/all/:userid',
  algoController.getAlgos,
  (req, res) => res.status(200).json(res.locals.algos)
);

//GET a single algo
router.get('/:id',
  algoController.getAlgo,
  (req, res) => res.status(200).json(res.locals.algo)
);

//POST a new algo
router.post('/', 
  algoController.createAlgo,
  (req, res) => res.status(200).json(res.locals.newAlgo)
);

//DELETE a new algo
router.delete('/:id',
  algoController.deleteAlgo,
  (req, res) => res.status(200).json(res.locals.deleted)
);

//PATCH a new algo
router.patch('/:id',
  algoController.updateAlgo,
  (req, res) => res.status(200).json(res.locals.updated)
);

module.exports = router;