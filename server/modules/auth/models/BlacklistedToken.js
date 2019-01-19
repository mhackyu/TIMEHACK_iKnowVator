const TAG = '[BLACKLISTED_TOKEN_MODULE]';
const { logger, db, errors } = require('../../../helpers');

module.exports.create = data => {
  const ACTION = '[create]';
  logger.info(`${TAG}${ACTION} args - ${JSON.stringify(data)}`);
  return new Promise((resolve, reject) => {
    db.execute('INSERT INTO blacklisted_tokens SET ?', data)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(errors.raise('INTERNAL_SERVER_ERROR'));
      });
  });
};

module.exports.getByToken = token => {
  const ACTION = '[getByToken]';
  logger.info(`${TAG}${ACTION} args - ${token}`);
  return new Promise((resolve, reject) => {
    db.execute('SELECT * FROM blacklisted_tokens WHERE token = ?', token)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(errors.raise('INTERNAL_SERVER_ERROR'));
      });
  });
};

module.exports.isBlackListed = token => {
  const ACTION = '[isBlackListed]';
  logger.info(`${TAG}${ACTION} args - ${token}`);
  return new Promise((resolve, reject) => {
    db.execute('SELECT * FROM blacklisted_tokens WHERE token = ?', token)
      .then(data => {
        if (data.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => {
        reject(errors.raise('INTERNAL_SERVER_ERROR'));
      });
  });
};