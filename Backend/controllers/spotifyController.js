const sessionController = {};
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();
const spotifyController = {};

spotifyController.getToken = (req, res, next) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });

  spotifyApi.authorizationCodeGrant(code)
    .then(response => {
      res.locals.access = {
        accessToken: response.body.access_token,
        refreshToken: response.body.refresh_token,
        expiresIn: response.body.expires_in
      };
      return next();
    }).catch(err => {
      return next({
        log: `authCodeGrant error handler caught an error: ${err}`,
        message: {err: 'spotifyController.authCodeGrant: ERROR: Check server logs for details'}
      });
    }
    );
};

spotifyController.refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken
  });

  spotifyApi.refreshAccessToken()
    .then(response => {
      res.locals.refresh = {
        accessToken: response.body.access_token,
        expiresIn: response.body.expires_in
      };
      return next();
    }).catch(err => {
      return next({
        log: `refreshToken error handler caught an error: ${err}`,
        message: {err: 'spotifyController.refreshToken: ERROR: Check server logs for details'}
      });
    }
    );
};


module.exports = spotifyController;