const bcrypt = require('bcryptjs');
const userModel = require('./user.model');
const db = require('../utils/db');

module.exports = {
  login: async entity => {
    // entity = {
    //   "user": "admin",
    //   "pwd": "admin"
    // }

    const rows = await userModel.singleByUserName(entity.username);
    if (rows.length === 0)
      return null;

    const hashPwd = rows[0].password_hash;
    if (bcrypt.compareSync(entity.password_hash, hashPwd)) {
      return rows[0];
    }

    return null;
  }
};