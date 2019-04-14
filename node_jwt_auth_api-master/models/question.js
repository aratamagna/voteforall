var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User');

var QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  owner: {
    type: Schema.ObjectId,
    ref: "User"
  },
  description: {
    type: String,
    required: false,
  },
  diffusion: {
    type: Boolean
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
