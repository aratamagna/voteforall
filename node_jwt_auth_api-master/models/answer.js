var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User');
var Question = mongoose.model('Question');

var AnswerSchema = new mongoose.Schema({
  question: {
    type: Schema.ObjectId,
    ref: "Question"
  },
  answer: {
    type: Boolean
  },
  owner: {
    type: Schema.ObjectId,
    ref: "User"
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
