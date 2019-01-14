const { logger } = require('../../../helpers');
const income = require('../../income/models/Income');

module.exports = {
  ADD_INCOME: (response, user) => {
    logger.info('[ACTION_ADD_INCOME]');

    const { context, input } = response;
    const data = {
      provider_id: user.provider_id,
      description: input.text,
      amount: context.amount,
    };
    
    return income.create(data);
  },
  VIEW_INCOME: (response, user) => {
    logger.info('[ACTION_VIEW_INCOME]');
    const { context } = response;
    return income.getAllByUserAndByDate(user.provider_id, context.start_date, context.end_date);
  },
};
