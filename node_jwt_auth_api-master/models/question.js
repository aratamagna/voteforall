var mongoose = require('mongoose');
User = require("./user.js");

var QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  owner: {
    type: User
  },
  description: {
    type: String,
    required: false,
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

var Question = mongoose.model('Question', Questionchema, 'Question');
module.exports = Vote;
