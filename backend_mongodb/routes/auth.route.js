const express = require('express');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const randToken = require('rand-token');
// const jwt_decode = require('jwt-decode');
const createError = require('http-errors');


const authModel = require('../models/auth.model');
// const userModel = require('../models/user.model');
// const User = require('../models/user.model');
const UserFreshToken = require('../models/userRefreshToken.model');
const config = require('../config/default.json');

const router = express.Router();


async function updateRefreshToken(userId, token){
  await UserFreshToken.findOneAndDelete({user_id: userId});
  let ret = await UserFreshToken.create({
      user_id: userId,  
      refresh_token: token
    });
    return ret;
}
async function verifyRefreshToken(userId, token){
  const rows = await UserFreshToken.findOne({user_id: userId, refresh_token: token});
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
  const userId = ret.user_id;

  const accessToken = generateAccessToken(userId);
  const refreshToken = randToken.generate(config.auth.refreshTokenSz);

  await updateRefreshToken(userId, refreshToken);
 

  res.json({
    // authenticated: true,
    accessToken,
    refreshToken
  })
})

/**
 * refresh token
 */

router.post('/refresh', async (req, res) => {
  // req.body = {
  //   accessToken,
  //   refreshToken
  // }

  // const { userId } = jwt_decode(req.body.accessToken);
  jwt.verify(req.body.accessToken, config.auth.secret, { ignoreExpiration: true }, async function (err, payload) {
    const { userId } = payload;
    const ret = await verifyRefreshToken(userId, req.body.refreshToken);
    if (ret === false) {
      throw createError(400, 'Invalid refresh token.');
    }

    const accessToken = generateAccessToken(userId);
    res.json({ accessToken });
  })
});

const generateAccessToken = userId => {
  const payload = { userId };
  const accessToken = jwt.sign(payload, config.auth.secret, {
    expiresIn: config.auth.expiresIn
  });

  return accessToken;
}

module.exports = router;