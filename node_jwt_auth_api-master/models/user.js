var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  },
  iniDate: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: Boolean,
    default: true
  }
});

var User = mongoose.model('User', UserSchema, 'User');
module.exports = User;
