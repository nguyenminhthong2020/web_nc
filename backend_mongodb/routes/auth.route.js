const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const randToken = require('rand-token');
// const jwt_decode = require('jwt-decode');
const createError = require('http-errors');


const authModel = require('../models/auth.model');
// const userModel = require('../models/user.model');
// const User = require('../models/user.model');
const UserFreshToken = require('../models/userRefreshToken.model');
const config = require('../config/default.json');

const router = express.Router();


async function updateRefreshToken(user_id, token){
  await UserFreshToken.findOneAndDelete({user_id: user_id});
  let ret = await UserFreshToken.create({
      user_id: user_id,  
      refresh_token: token
    });
    return ret;
}
async function verifyRefreshToken(user_id, token){
  const rows = await UserFreshToken.findOne({user_id: user_id, refresh_token: token});
  if (!rows)
    return false;

  return true;
}
/**
 * login
 */
router.post('/login', async (req, res) => {
  // req.body = {
  //   "username": "admin",
  //   "password": "admin"
  // }
  const ret = await authModel.login(req.body);
  if (ret === null) {
    return res.json({
      authenticated: false
    })
  }
  const user_id = ret.user_id;

  const accessToken = generateAccessToken(user_id);
  const refreshToken = generateRefreshToken(user_id);

  await updateRefreshToken(user_id, refreshToken);
 

  res.json({
    // authenticated: true,
    accessToken,
    refreshToken
  })
})


/**
 * refresh token
 */

// if (error.name === 'TokenExpiredError')
router.post('/refresh', async (req, res) => {
  // req.body = {
  //   accessToken,
  //   refreshToken
  // }

  // const { user_id } = jwt_decode(req.body.accessToken);
  jwt.verify(req.body.accessToken, config.auth.secret, { ignoreExpiration: true }, async function (err, payload) {
    const { user_id } = payload;
    //console.log(payload);
    const ret = await verifyRefreshToken(user_id, req.body.refreshToken);
    if (ret === false) {
      throw createError(400, 'Invalid refresh token.');
    }

    const accessToken = generateAccessToken(user_id);
    res.json({ accessToken });
  })
});

const generateAccessToken = user_id => {
  const payload = { user_id };
  const accessToken = jwt.sign(payload, config.auth.secret, {
    expiresIn: config.auth.expiresIn
  });

  return accessToken;
}

const generateRefreshToken = user_id => {
  const payload = { user_id };
  const accessToken = jwt.sign(payload, config.auth.secret, {
    expiresIn: config.auth.expiresIn2
  });

  return accessToken;
}

module.exports = router;