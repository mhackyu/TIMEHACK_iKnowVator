const { db, errors } = require('../../../helpers');

module.exports.getAll = () => {
  return new Promise((resolve, reject) => {
    db.execute('SELECT * FROM user')
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(errors.raise('INTERNAL_SERVER_ERROR', err));
      });
  });
};
