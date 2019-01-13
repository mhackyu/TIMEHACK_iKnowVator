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
  }
};
