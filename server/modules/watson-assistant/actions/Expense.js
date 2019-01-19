const { logger } = require('../../../helpers');
const formatter = require('../../../utils/formatter');
const expense = require('../../expense/models/Expense');

const add = (accumulator, currentValue) => accumulator + currentValue.amount;

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
          if (result.length > 0) {
            response.output.generic[0].list = result;
            response.output.generic[0].response_type = 'list';
            response.output.generic[0].action = 'VIEW_EXPENSE';
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
          if (result.length > 0) {
            const total = result.reduce(add, 0);
            response.output.generic[0].text = `
              You have spent a total of ${formatter.toCurreny(total)} 
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
