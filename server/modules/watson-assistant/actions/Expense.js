const { logger } = require('../../../helpers');

module.exports = {
  ADD_EXPENSE: data => {
    logger.info('[ACTION_ADD_EXPENSE]');
  }
};
