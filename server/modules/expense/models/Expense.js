const TAG = '[EXPENSE_MODULE]';
const { logger, db, errors } = require('../../../helpers');

module.exports.create = data => {
  const ACTION = '[create]';
  logger.info(`${TAG}${ACTION} args - ${JSON.stringify(data)}`);
  return new Promise((resolve, reject) => {
    data.type = 'EXPENSE';
    db.execute('INSERT INTO transactions SET ?', data)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(errors.raise('INTERNAL_SERVER_ERROR'));
      });
  });
};

module.exports.getAllByUser = uid => {
  const ACTION = '[getAll]';
  logger.info(`${TAG}${ACTION} args - ${uid}`);
  return new Promise((resolve, reject) => {
    db.execute('SELECT * FROM expense WHERE provider_id = ?', uid)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(errors.raise('INTERNAL_SERVER_ERROR'));
      });
  });
};

module.exports.getAllByUserAndByDate = (uid, startTime, endTime) => {
  const ACTION = '[getAllByUserAndByDate]';
  logger.info(`${TAG}${ACTION} args - ${JSON.stringify({ uid, startTime, endTime })}`);
  return new Promise((resolve, reject) => {
    db.execute(`
        SELECT id, description, amount, category, date_created
        FROM transactions 
        WHERE provider_id = ? 
        AND date_created BETWEEN ? AND ? 
        AND type = 'EXPENSE'
      `,
      [uid, startTime, endTime]
    )
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(errors.raise('INTERNAL_SERVER_ERROR'));
      });
  });
};

module.exports.getByUserAndId = (uid, id) => {
  const ACTION = '[getByUserAndId]';
  logger.info(`${TAG}${ACTION} args - ${JSON.stringify({ uid, id })}`);
  return new Promise((resolve, reject) => {
    db.execute('SELECT * FROM expense WHERE provider_id = ? AND id = ?', [
      uid,
      id
    ])
      .then(data => {
        if (data.length > 0) resolve(data[0]);
        else reject(errors.raise('NOT_FOUND'));
      })
      .catch(err => {
        reject(errors.raise('INTERNAL_SERVER_ERROR'));
      });
  });
};

module.exports.updateByUserAndId = (uid, id, data) => {
  const ACTION = '[updateByUserAndId]';
  logger.info(`${TAG}${ACTION} args - ${JSON.stringify({ uid, id, data })}`);
  return new Promise((resolve, reject) => {
    db.execute('UPDATE expense SET ? WHERE provider_id = ? AND id = ?', [
      data,
      uid,
      id
    ])
      .then(data => {
        if (data.affectedRows > 0) {
          resolve({
            status: 200,
            msg: 'Successfully updated.'
          });
        }
      })
      .catch(err => {
        reject(errors.raise('INTERNAL_SERVER_ERROR'));
      });
  });
};

module.exports.deleteByUserAndId = (uid, id) => {
  const ACTION = '[deleteByUserAndId]';
  logger.info(`${TAG}${ACTION} args - ${JSON.stringify({ uid, id })}`);
  return new Promise((resolve, reject) => {
    db.execute('DELETE FROM expense WHERE provider_id = ? AND id = ?', [
      uid,
      id
    ])
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(errors.raise('INTERNAL_SERVER_ERROR'));
      });
  });
};
