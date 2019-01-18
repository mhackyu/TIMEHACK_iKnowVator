const { logger } = require('../../../helpers');
const formatter = require('../../../utils/formatter');
const income = require('../../income/models/Income');

const add = (accumulator, currentValue) => accumulator + currentValue.amount;

module.exports = {
  ADD_INCOME: (response, user) => {
    logger.info('[ACTION_ADD_INCOME]');
    return new Promise((resolve, reject) => {
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
          if (result.length > 0) {
            response.output.generic[0].list = result;
            response.output.generic[0].response_type = 'list';
            response.output.generic[0].action = 'VIEW_INCOME';
          } else {
            response.output.generic[0].text = 'No transactions found on the date provided.';
          }
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
          if (result.length > 0) {
            const total = result.reduce(add, 0);
            response.output.generic[0].text = `
              You have earned a total of ${formatter.toCurreny(total)} 
              from ${formatter.toDate(response.context.start_date)} 
              to ${formatter.toDate(response.context.end_date)}`;
          } else {
            response.output.generic[0].text = 'No transactions found on the date provided.';
          }
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
