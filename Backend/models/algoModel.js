const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Describes an algo
const algoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user_id: {
    type: String
  }
}, {timestamps: true});

module.exports = mongoose.model('Algo', algoSchema);



