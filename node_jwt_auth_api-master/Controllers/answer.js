var mongoose = require('mongoose');
var User = require('./user');
var Question = require('../models/question');
var Answer = require('../models/answer');
var ObjectId = require('mongoose').Types.ObjectId;

exports.insertAgreeAnswer = function(req, res, next) {

  answerData = {
    question: null,
    answer: true,
    owner: null,
  }

  User.findId(req.user, user => {
    answerData.owner = user;
    Question.findById(new ObjectId(req.params.id), function(e, question) {
      answerData.question = question;
      Answer.create(answerData, function (error, answer){
        if (error) {
          return next(error);
        } else {
          res.send(answer);
        }
      });
    })
  });
}

exports.insertDisagreeAnswer = function(req, res, next) {

  answerData = {
    question: null,
    answer: false,
    owner: null,
  }

  User.findId(req.user, user => {
    answerData.owner = user;
    Question.findById(new ObjectId(req.params.id), function(e, question) {
      answerData.question = question;
      Answer.create(answerData, function (error, answer){
        if (error) {
          return next(error);
        } else {
          res.send(answer);
        }
      });
    })
  });
}

exports.getAnswer = function(req, res, next) {
  Answer.findById(req.params.id, function(err, obj){
    res.send(obj);
  })
}

exports.groupAnswersByQuestion = function(req, res, next) {
  var group = Answer.find({question: new ObjectId(req.params.id)}).select({"answer": 1});
  group.exec(function (e, c){
    res.send(c);
  })
}

exports.getOwnAnswers = function(req, res, next) {
  var answers = [];
  User.findId(req.user, user => {
    Answer.find({"owner": user}, function (e, r) {
      for (var i = 0; i < r.length; i++) {
        Question.findById(new ObjectId(), function (e, o){
          var answer = {
            answer: r[i],
            question: null
          };
          answer.question = o;
          answers.push(answer);
        })
      }
      res.send(answers);
    })
  });
}
