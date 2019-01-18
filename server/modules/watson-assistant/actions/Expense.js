const { logger } = require('../../../helpers');
const expense = require('../../expense/models/Expense');

module.exports = {
  ADD_EXPENSE: (response, user) => {
    logger.info('[ACTION_ADD_EXPENSE]');
    return new Promise((resolve, reject) => {
      const { context } = response;
      const data = {
        provider_id: user.provider_id,
        description: context.description,
        category: context.category,
        amount: context.amount
      };
      expense
        .create(data)
        .then(result => {
          if (result.affectedRows > 0) resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  VIEW_EXPENSE: (response, user) => {
    logger.info('[ACTION_VIEW_EXPENSE]');
    return new Promise((resolve, reject) => {
      const { context } = response;
      expense
        .getAllByUserAndByDate(
          user.provider_id,
          context.start_date,
          context.end_date
        )
        .then(result => {
          response.context.actionResult = result;
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  REPORT_EXPENSE: (response, user) => {
    logger.info('[ACTION_REPORT_EXPENSE]');
    return new Promise((resolve, reject) => {
      const { context } = response;
      expense
        .getAllByUserAndByDate(
          user.provider_id,
          context.start_date,
          context.end_date
        )
        .then(result => {
          response.context.actionResult = result;
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
