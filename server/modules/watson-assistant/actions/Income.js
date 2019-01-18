const { logger } = require('../../../helpers');
const income = require('../../income/models/Income');

module.exports = {
  ADD_INCOME: (response, user) => {
    logger.info('[ACTION_ADD_INCOME]');

    const { context, input } = response;
    const data = {
      provider_id: user.provider_id,
      description: input.text,
      amount: context.amount
    };

    income
      .create(data)
      .then(result => {
        if (result.affectedRows > 0) resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  },
  VIEW_INCOME: (response, user) => {
    logger.info('[ACTION_VIEW_INCOME]');
    return new Promise((resolve, reject) => {
      const { context } = response;
      income
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
  REPORT_INCOME: (response, user) => {
    logger.info('[ACTION_REPORT_EXPENSE]');
    return new Promise((resolve, reject) => {
      const { context } = response;
      income
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
