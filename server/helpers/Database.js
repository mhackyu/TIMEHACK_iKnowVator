const TAG = '[MYSQL]';
const mysql = require('mysql');
const logger = require('./Logger');

require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: process.env.DB_CONN_LIMIT || 100,
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  port: process.env.DB_PORT || '3306'
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      logger.error(`${TAG} Database connection was closed.`);
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      logger.error(`${TAG} Database has too many connections.`);
    }
    if (err.code === 'ECONNREFUSED') {
      logger.error(`${TAG} Database connection was refused.`);
    }
  }

  if (connection) connection.release();

  return new Promise((resolve, reject) => {
    execute('Select version()')
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
});

const execute = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
      if (error) {
        logger.error(`${TAG} Error ${JSON.stringify(error, null, 2)}`);
        reject(error);
      }
      logger.info(`${TAG} ${JSON.stringify(results, null, 2)}`);
      resolve(results);
    });
  });
};

exports.execute = execute;
