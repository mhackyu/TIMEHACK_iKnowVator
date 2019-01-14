const { logger } = require('../../../helpers');
const expense = require('../../expense/models/Expense');

module.exports = {
  ADD_EXPENSE: (response, user) => {
    logger.info('[ACTION_ADD_EXPENSE]');
    const { context } = response;
    const data = {
      provider_id: user.provider_id,
      description: context.description,
      category: context.category,
      amount: context.amount,
    };
    return expense.create(data);
  },
  VIEW_EXPENSE: (response, user) => {
    logger.info('[ACTION_VIEW_EXPENSE]');
    const { context } = response;
    return expense.getAllByUserAndByDate(user.provider_id, context.start_date, context.end_date);
  },

};
