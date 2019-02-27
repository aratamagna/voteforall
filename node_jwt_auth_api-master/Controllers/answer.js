var mongoose = require('mongoose');
var User = require('./user');
var Answer = require('../models/answer');

exports.insertAnswer = function(req, res, next) {

// se puede guardar el objeto completo de question si se va a buscar a la bd de la misma forma que user
  var answerData = {
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
