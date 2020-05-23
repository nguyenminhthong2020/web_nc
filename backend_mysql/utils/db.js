const mysql = require('mysql');
const { promisify } = require('util');
// const promisify = require('util').promisify;

const config = require('../config/default.json');

const pool = mysql.createPool(config.mysql);
const pool_query = promisify(pool.query).bind(pool);

module.exports = {
  load: sql => pool_query(sql),
  add: (entity, tableName) => pool_query(`insert into ${tableName} set ?`, entity),
  patch: (entity, condition, tableName) => pool_query(`update ${tableName} set ? where ?`, [entity, condition]),
  // patch = update
  update: (tableName, idField, id, entity) => pool_query(`update ${tableName} set ? where ${idField} = ${id}`, entity),
  del: (condition, tableName) => pool_query(`delete from ${tableName} where ?`, condition),
};

// module.exports = {
//   load: sql => new Promise((resolve, reject) => {
//     pool.query(sql, (error, results, fields) => {
//       if (error)
//         return reject(error);

//       resolve(results);
//     });
//   })
// };