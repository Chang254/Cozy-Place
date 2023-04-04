const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Amount of times encrypting algo is ran 2**saltfactor times
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

//User data to be added to the database anytime a new user is created (sign up event)
const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});


//Encrypt password using bcrypt before saving user in the database
userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR)
    .then(hash => {
      this.password = hash;
      return next();
    })
    .catch(err => {return next(err);
    }
    );
});

module.exports = mongoose.model('User', userSchema);