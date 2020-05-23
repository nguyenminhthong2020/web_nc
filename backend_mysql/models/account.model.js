const bcrypt = require('bcryptjs');
const moment = require('moment');
const db = require('../utils/db');

module.exports = {
  add: entity => {
    return db.add(entity, 'account');
  },
  
  singleByNumber: account_number => db.load(`select * from account where account_number = '${account_number}'`),
};