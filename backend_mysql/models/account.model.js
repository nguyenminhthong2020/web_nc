const bcrypt = require('bcryptjs');
const moment = require('moment');
const db = require('../utils/db');

module.exports = {
  add: entity => {
    return db.add(entity, 'account');
  },
  
  singleByNumber: account_number => db.load(`select * from account where account_number = '${account_number}'`),
  singleById: id => db.load(`SELECT * FROM account_number WHERE user_id = ${id}`),
  updateMoney: (id, entity) => db.update('account_number', 'user_id', id, entity)
  //Cách khác :
  //update: (soDu, soTaiKhoan) => pool_query(`update taikhoanthanhtoan set SoDu = '${soDu}' where SoTaiKhoan = '${soTaiKhoan}'`)
};