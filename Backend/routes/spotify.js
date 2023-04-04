const spotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

//Login event
router.post('/login',
  spotifyController.getToken,
  (req, res) => res.status(200).json(res.locals.access)
);

//Refresh spotify token
router.post('/refresh',
  spotifyController.refreshToken,
  (req, res) => res.status(200).json(res.locals.refresh)

);

module.exports = router;