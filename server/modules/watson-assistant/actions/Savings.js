const { logger } = require('../../../helpers');
const formatter = require('../../../utils/formatter');
const savingGoal = require('../../savings-goal/models/SavingsGoal');

const add = (accumulator, currentValue) => accumulator + currentValue.current_amount;

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
  },
  ADD_TO_SAVINGS: (response, user) => {
    logger.info('[ACTION_ADD_TO_SAVINGS]');
    return new Promise(async (resolve, reject) => {
      try {
        const savings = await savingGoal.getByStartDate(
          user.provider_id,
          response.context.date_created,
          response.context.date_created
        );
        if (!savings.length > 0) {
          logger.info(JSON.stringify(savings));
          response.context.savings = null;
          resolve(response);
        } else {
          logger.info(JSON.stringify(savings));
          const savingRes = await savingGoal.update(
            user.provider_id,
            savings[0].id,
            { current_amount: savings[0].current_amount + response.context.amount }
          );
          if (savingRes.affectedRows > 0) {
            resolve(response);
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  VIEW_SAVINGS: (response, user) => {
    logger.info('[ACTION_VIEW_SAVINGS]');
    return new Promise((resolve, reject) => {
      const { context } = response;
      savingGoal
        .getByStartDate(
          user.provider_id,
          context.start_date,
          context.end_date
        )
        .then(result => {
          if (result.length > 0) {
            response.output.generic[0].list = result;
            response.output.generic[0].response_type = 'list';
            response.output.generic[0].action = 'VIEW_SAVINGS';
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
  REPORT_SAVINGS: (response, user) => {
    logger.info('[ACTION_REPORT_SAVINGS]');
    return new Promise((resolve, reject) => {
      const { context } = response;
      savingGoal
        .getByStartDateAndEndDate(
          user.provider_id,
          context.start_date,
          context.end_date
        )
        .then(result => {
          if (result.length > 0) {
            const totalSavings = result.reduce(add, 0);
            response.output.generic[0].text = `
              You have saved a total savings of ${formatter.toCurreny(totalSavings)} 
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
