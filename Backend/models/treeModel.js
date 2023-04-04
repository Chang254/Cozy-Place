const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Garden data for each user
const treeSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  totalTrees: { type: Number },
  studyTime: {type: Number}
});

module.exports = mongoose.model('Tree', treeSchema);
