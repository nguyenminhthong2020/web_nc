const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const config = require('../config/default.json');

// https://github.com/auth0/node-jsonwebtoken
// https://github.com/auth0/node-jsonwebtoken/issues/590
module.exports = function (req, res, next) {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.auth.secret, function (err, payload) {
      if (err)
        // if(error.name === 'TokenExpiredError')
        // {
        //   throw createError(403, err);
        // }

        throw createError(403, err);

      // console.log(payload);
      req.tokenPayload = payload;
      next();
    })
  } else {
    throw createError(401, 'No accessToken found.');
  }
}