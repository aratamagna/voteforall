var mongoose = require('mongoose');
var User = require('../models/user');
var service = require('./Service/authService');

exports.emailLogin = function(req, res) {
	User.findOne({username: req.body.username.toLowerCase()}, function(err, user) {
		if (err || !user) {
			var e = new Error('Nombre de usuario o contraseña incorrecto.');
			e.status = 401;
			return res.send(e);
		} else {
				if (user.estado==true){
					if (user.password==req.body.password){
					return res.status(200).send({token: service.createToken(user)});
				}
			}
		}
	});
};
