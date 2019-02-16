var mongoose = require('mongoose');
User = require("./user.js")

var VoteSchema = new mongoose.Schema({
  user: {
    type: User,
  },
  answer: Boolean
});

var Vote = mongoose.model('User', VoteSchema, 'Vote');
module.exports = Vote;
