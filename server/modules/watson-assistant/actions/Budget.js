const { logger } = require('../../../helpers');
const formatter = require('../../../utils/formatter');
const spendingGoal = require('../../spending-goal/models/SpendingGoal');

const add = (accumulator, currentValue) => accumulator + currentValue.current_amount;

module.exports = {
  NEW_BUDGET: (response, user) => {
    logger.info('[ACTION_NEW_BUDGET]');
    return new Promise(async (resolve, reject) => {
      try {
        const budget = await spendingGoal.getByStartDateAndEndDate(
          user.provider_id,
          response.context.start_date,
          response.context.end_date
        );
        if (budget.length > 0) {
          response.context.budget = budget[0];
          resolve(response);
        } else {
          const data = {
            provider_id: user.provider_id,
            goal_amount: response.context.amount,
            date_start: response.context.start_date,
            date_end: response.context.end_date
          };
          const savingRes = await spendingGoal.create(data);
          if (savingRes.affectedRows > 0) {
            resolve(response);
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  VIEW_BUDGET: (response, user) => {
    logger.info('[ACTION_VIEW_BUDGET]');
    return new Promise((resolve, reject) => {
      const { context } = response;
      spendingGoal
        .getByStartDate(
          user.provider_id,
          context.start_date,
          context.end_date
        )
        .then(result => {
          if (result.length > 0) {
            response.output.generic[0].list = result;
            response.output.generic[0].response_type = 'list';
            response.output.generic[0].action = 'VIEW_BUDGET';
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
  REPORT_BUDGET: (response, user) => {
    logger.info('[ACTION_REPORT_BUDGET]');
    return new Promise((resolve, reject) => {
      const { context } = response;
      spendingGoal
        .getByStartDateAndEndDate(
          user.provider_id,
          context.start_date,
          context.end_date
        )
        .then(result => {
          if (result.length > 0) {
            const totalBudget = result.reduce(add, 0);
            response.output.generic[0].text = `
              You have saved a total budget of ${formatter.toCurreny(totalBudget)} 
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
