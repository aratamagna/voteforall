var mongoose = require('mongoose');
var Question = require('../model/question');

exports.insertQuestion = function(req, res, next) {

  var questionData = {
    question: req.body.question,
    description: req.body.description,
  }

  Question.create(questionData, function (error, question)) {
    if (error) {
      return next(error);
    } else {
      res.send(question);
    }
  });
}

exports.listQuestions = function(req, res, next) {
  Question.find(function (err, doc) {
    res.send(doc);
  });
}

exports.getQuestion = function(req, res, next) {
  Question.findById(req.question, function(err, obj){
    res.send(obj);
  });
}
