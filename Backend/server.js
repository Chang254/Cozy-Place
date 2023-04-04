//Attach environment variables to the process object
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const spotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

mongoose.set('strictQuery', true);

const path = require('path');

//Routers
const algoRoutes = require('./routes/algos');
const userRouter = require('./routes/users');
const spotifyRouter = require('./routes/spotify');
const treeRouter = require('./routes/trees');

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

//Request Handler (Allows us to see which requests are being sent from the frontend, very useful for debugging and development)
//May be useful to comment out in production (backend might get spammed with requests which will be hard to track)
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Routes
app.use('/api/algos', algoRoutes);
app.use('/api/users', userRouter);
app.use('/api/spotify', spotifyRouter);
app.use('/api/trees', treeRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

//Connect to db
mongoose.connect(process.env.MONGO_URI,  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
  //listen for requests
  console.log('connected')
  })
  .catch((error) => {
    console.log(error);
  });

  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}...`);
  });

//Express Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

  
module.exports = app;