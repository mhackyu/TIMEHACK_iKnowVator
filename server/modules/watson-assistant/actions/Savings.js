const { logger } = require('../../../helpers');
const savingGoal = require('../../savings-goal/models/SavingsGoal');

module.exports = {
  NEW_SAVINGS: (response, user) => {
    logger.info('[ACTION_NEW_SAVINGS]');

    const { context, input } = response;
    const data = {
      provider_id: user.provider_id,
      goal_amount: '100',
      date_start: '2019-01-11',
      date_end: '2019-01-12'
    };

    return savingGoal.create(data);
  }
};
