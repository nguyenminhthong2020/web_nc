const bcrypt = require('bcryptjs');
const moment = require('moment');
const db = require('../utils/db');

// Lỗi: trong hàm singleById, sửa id => user_id
module.exports = {
  add: entity => {
    const hash = bcrypt.hashSync(entity.password, 8);
    entity.password = hash;
    return db.add(entity, 'users');
  },

  singleByUserName: userName => db.load(`select * from users where username = '${userName}'`),
  singleById: id => db.load(`select username, fullname, cmnd, birthday, phone, address, email
                             from users where id = '${id}'`),
  updateRefreshToken: async (userId, token) => {

    await db.del({ ID: userId }, 'userRefreshTokenExt');

    const entity = {
      ID: userId,
      refreshToken: token,
      rdt: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    return db.add(entity, 'userRefreshTokenExt');
  },

  verifyRefreshToken: async (userId, token) => {
    const sql = `select * from userRefreshTokenExt where ID = ${userId} and refreshToken = '${token}'`;
    const rows = await db.load(sql);
    if (rows.length > 0)
      return true;

    return false;
  }
};