var express = require('express');
var router = express.Router();
var middleware = require('../middleware/middleware');
var auth = require('../Controllers/auth');
var user = require('../Controllers/user');
var question = require('../Controllers/question');
var answer = require('../Controllers/answer')

router.get('/', function (req, res, next) {
  res.send("Hello World!");
});

router.post('/singin', function (req, res, next) {
  user.insertUser(req, res, next)
})

router.post('/login', auth.emailLogin);

router.get('/user',middleware.ensureAuthenticated, user.listUsers);

//POST route for updating data
router.post('/user',middleware.ensureAuthenticated, function (req, res, next) {
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Error de contraseña.');
    err.status = 400;
    res.send("contraseñas no coinciden");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

      user.insertUser(req, res, next);

    } else {
      var err = new Error('Todos los campos son requeridos.');
      err.status = 400;
      return next(err);
    }
});

router.put('/user', function (req, res, next) {
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Error de contraseña.');
    err.status = 400;
    res.send("contraseñas no coinciden");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

      user.updateUser(req, res, next);

    } else {
      var err = new Error('Todos los campos son requeridos.');
      err.status = 400;
      return next(err);
    }
});

router.delete('/user', function (req, res) {});

router.get('/user/self', middleware.ensureAuthenticated, function (req, res, next) {
  user.getUser(req, res, next);
});

router.get('/user/:id', function (req, res, next) {
  user.getUser(req, res, next);
});

router.get('/profile',middleware.ensureAuthenticated, function (req, res, next) {
});

router.post('/question', middleware.ensureAuthenticated, function (req, res, next) {
  question.insertQuestion(req, res, next)
})

router.get('/question',middleware.ensureAuthenticated, question.listQuestions);

router.get('/question/:id',middleware.ensureAuthenticated, function (req, res, next) {
  question.getQuestion(req, res, next);
});

router.post('/answer', middleware.ensureAuthenticated, function (req, res, next) {
  answer.insertAnswer(req, res, next);
});

router.get('/answer/ok/:id', middleware.ensureAuthenticated, function (req, res, next) {
  answer.insertAgreeAnswer(req, res, next);
});

router.get('/answer/no/:id', middleware.ensureAuthenticated, function (req, res, next) {
  answer.insertDisagreeAnswer(req, res, next);
});

router.get('/answer/group/:id', middleware.ensureAuthenticated, function (req, res, next) {
  answer.groupAnswersByQuestion(req, res, next);
})

// GET for logout logout
router.get('/logout', function (req, res, next) {
});

module.exports = router;
