const { logger } = require('../../../helpers');
const savingGoal = require('../../savings-goal/models/SavingsGoal');

module.exports = {
  NEW_SAVINGS: (response, user) => {
    logger.info('[ACTION_NEW_SAVINGS]');
    return new Promise(async (resolve, reject) => {
      try {
        const savings = await savingGoal.getByStartDateAndEndDate(
          user.provider_id,
          response.context.start_date,
          response.context.end_date
        );
        if (savings.length > 0) {
          response.context.savings = savings[0];
          resolve(response);
        } else {
          const data = {
            provider_id: user.provider_id,
            goal_amount: response.context.amount,
            date_start: response.context.start_date,
            date_end: response.context.end_date
          };
          const savingRes = await savingGoal.create(data);
          if (savingRes.affectedRows > 0) {
            resolve(response);
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }
};
