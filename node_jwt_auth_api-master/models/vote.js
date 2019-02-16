var mongoose = require('mongoose');
User = require("./user.js");
Question = require("./question.js")

var VoteSchema = new mongoose.Schema({
  question: {
    type: Question
  }
  user: {
    type: User
  },
  answer: Boolean
});

var Vote = mongoose.model('Vote', VoteSchema, 'Vote');
module.exports = Vote;
