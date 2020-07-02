const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

module.exports = {
  login: async entity => {

  const row = await User.findOne({username: entity.username});
  if (!row)
    return null;
  
  const hashPwd = row.password;
  if (bcrypt.compareSync(entity.password, hashPwd)) {
    return row;
  }

  return null;
  }
};