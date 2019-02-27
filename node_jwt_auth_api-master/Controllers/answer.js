var mongoose = require('mongoose');
var User = require('./user');
var Answer = require('../models/answer');

exports.insertAnswer = function(req, res, next) {

  var user = User.findId(req.user);

  console.log(req.body);
  var answerData = {
    answer: JSON.stringify(req.body),
    owner: user,
  }

  Answer.create(answerData, function (error, answer){
    if (error) {
      return next(error);
    } else {
      res.send(answer);
    }
  });
}

exports.getAnswer = function(req, res, next) {
  Answer.findById(req.params.id, function(err, obj){
    res.send(obj);
  })
}
