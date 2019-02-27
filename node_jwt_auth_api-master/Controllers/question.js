var mongoose = require('mongoose');
var User = require('./user');
var Question = require('../models/question');

exports.insertQuestion = function(req, res, next) {


  var questionData = {
    owner: null,
    question: req.body.question,
    description: req.body.description,
  }

  User.findId(req.user, user => {

    questionData.owner = user;
    
    Question.create(questionData, function (error, question) {
      if (error) {
        return next(error);
      } else {
        res.send(question);
      }
    });
  });
}

exports.listQuestions = function(req, res, next) {
  Question.find(function (err, doc) {
    res.send(doc);
  });
}

exports.getQuestion = function(req, res, next) {
  Question.findById(req.params.id, function(err, obj){
    res.send(obj);
  });
}
