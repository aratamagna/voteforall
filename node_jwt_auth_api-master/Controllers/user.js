var mongoose = require('mongoose');
var User = require('../models/user');

exports.insertUser = function(req, res, next) {

  var userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    passwordConf: req.body.passwordConf,
  }

  User.create(userData, function (error, user) {
    if (error) {
      return next(error);
    } else {
      res.send(user);
    }
  });
}

exports.updateUser = function(req, res, next) {
  User.findById(req.body._id, function(err, obj){
    if (err) return handleError(err);

    obj.set(req.body);

    obj.save(function(err, updatedObj){
      if (err) return handleError(err);

      res.send(updatedObj);
    });
  });
}

exports.listUsers = function(req, res, next) {
  User.find(function (err, doc) {
    res.send(doc);
  });
}

exports.getUser = function(req, res, next) {
  User.findById(req.user, function(err, obj){
    res.send(obj);
  });
}

exports.findId = function(id, cb) {
  User.findById(id, function(err, obj){
    return cb(obj);
  });
}
