const bcrypt = require('bcryptjs');
const moment = require('moment');
const db = require('../utils/db');

module.exports = {
  add: entity => {
    const hash = bcrypt.hashSync(entity.password_hash, 8);
    entity.password_hash = hash;
    return db.add(entity, 'users');
  },
  
  getAllUser: () => db.load(`select * from users`),
  singleByUserName: userName => db.load(`select * from users where username = '${userName}'`),
  singleById: id => db.load(`select username, fullname, cmnd, birthday, phone, address, email
                             from users where user_id = '${id}'`),
  updateRefreshToken: async (userId, token) => {

    await db.del({ user_id: userId }, 'user_refresh_token');
    
    const entity = {
      user_id: userId,  
      refresh_token: token,
      rdt: moment().format('YYYY-MM-DD HH:mm:ss')
    }
  
    return db.add(entity, 'user_refresh_token');
  },

  verifyRefreshToken: async (userId, token) => {
    const sql = `select * from user_refresh_token where user_id  = ${userId} and refresh_token = '${token}'`;
    const rows = await db.load(sql);
    if (rows.length > 0)
      return true;

    return false;
  }
};