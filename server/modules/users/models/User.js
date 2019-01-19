const TAG = '[USER_MODULE]';
const { logger, db, errors } = require('../../../helpers');

module.exports.create = user => {
  const ACTION = '[create]';
  logger.info(`${TAG}${ACTION} args - ${JSON.stringify(user)}`);
  return new Promise((resolve, reject) => {
    db.execute('INSERT INTO users SET ?', user)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(errors.raise('INTERNAL_SERVER_ERROR'));
      });
  });
};

module.exports.getAll = () => {
  const ACTION = '[getAll]';
  logger.info(`${TAG}${ACTION}`);
  return new Promise((resolve, reject) => {
    db.execute('SELECT * FROM users')
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(errors.raise('INTERNAL_SERVER_ERROR'));
      });
  });
};

module.exports.get = id => {
  const ACTION = '[get]';
  logger.info(`${TAG}${ACTION} args - ${id}`);
  return new Promise((resolve, reject) => {
    db.execute('SELECT * FROM users WHERE provider_id = ?', id)
      .then(data => {
        if (data.length > 0) {
          resolve(data[0]);
        } else {
          resolve(errors.raise('NOT_FOUND'));
        } 
      })
      .catch(err => {
        reject(errors.raise('INTERNAL_SERVER_ERROR'));
      });
  });
};
