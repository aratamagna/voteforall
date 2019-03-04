var mongoose = require('mongoose');
var User = require('./user');
var Answer = require('../models/answer');

exports.insertAnswer = function(req, res, next) {

  answerData = {
    question: req.body.question,
    answer: req.body.answer,
    owner: null,
  }

  User.findId(req.user, user => {

    answerData.owner = user;

    Answer.create(answerData, function (error, answer){
      if (error) {
        return next(error);
      } else {
        res.send(answer);
      }
    });
  });
}

exports.getAnswer = function(req, res, next) {
  Answer.findById(req.params.id, function(err, obj){
    res.send(obj);
  })
}

exports.groupAnswersByQuestion = function(req, res, next) {
  var group = Answer.find({question: ObjectId(req.body.question)}).select({"answer": 1, "question": 0, "owner": 0, "iniDate": 1});
  group.exec(function (e, c){
    res.send(c);
  })
}
