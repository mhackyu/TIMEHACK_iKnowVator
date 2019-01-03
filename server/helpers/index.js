const db = require('./Database');
const errors = require('./Error');
const logger = require('./Logger');
const wa = require('./WatsonAssistant');

module.exports = {
  db,
  errors,
  logger,
  wa
};