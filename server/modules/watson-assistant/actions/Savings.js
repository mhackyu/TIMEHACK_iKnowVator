const { logger } = require('../../../helpers');
const savingGoal = require('../../savings-goal/models/SavingsGoal');

module.exports = {
  NEW_SAVINGS: (response, user) => {
    logger.info('[ACTION_NEW_SAVINGS]');

    const { context } = response;
    const data = {
      provider_id: user.provider_id,
      goal_amount: context.amount,
      date_start: context.start_date,
      date_end: context.end_date
    };

    return savingGoal.create(data);
  }
};
