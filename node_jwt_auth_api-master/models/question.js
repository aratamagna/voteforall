var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  owner: {
    type: String,
    unique: true,
    required: true,
    trim: true
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
