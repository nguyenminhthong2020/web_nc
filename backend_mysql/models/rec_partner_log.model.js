const db = require('../utils/db');

module.exports = {
  add: entity => {
    return db.add(entity, 'recharge_money_log');
  }
};