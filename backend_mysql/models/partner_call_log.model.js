const db = require('../utils/db');

module.exports = {
  add: entity => {
    return db.add(entity, 'partner_call_log');
  }
};