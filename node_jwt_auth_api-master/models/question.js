var mongoose = require('mongoose');
var User = require("./user");

var QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
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

var Question = mongoose.model('Question', QuestionSchema, 'Question');
module.exports = Question;
