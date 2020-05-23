const db = require('../utils/db');

module.exports = {
  add: entity => {
    return db.add(entity, 'transaction_history');
  },
  
  getAllTransaction: () => db.load(`select * from transaction_history`),
  singleById: id => db.load(`select * from transaction_history where transaction_id = '${id}'`),
  
};