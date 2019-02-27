var mongoose = require('mongoose');
var User = require("./user");

var AnswerSchema = new mongoose.Schema({
  answer: {
    type: String,
    unique: false,
    required: true
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  iniDate: {
    type: Date,
    default: Date.now
  }//,
  // estado: {
  //   type: Boolean,
  //   default: true
  // }
});

var Answer = mongoose.model('Answer', AnswerSchema, 'Answer');
module.exports = Answer;
