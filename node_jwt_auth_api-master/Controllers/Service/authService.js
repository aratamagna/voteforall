var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../../config');

exports.createToken = function(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(config.AUTH_TOKEN_EXP, "days").unix(),
  };
  return jwt.encode(payload, "ajdnakjhrawoisjdasljqk4u238975289ru30487293jd42938s294yh2783yjsdpaifvuhbjnfm294yrqQ390TU8YWEHQOIEU");
};
