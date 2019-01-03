const TAG = '[WA]';
const util = require('util');
const watson = require('watson-developer-cloud');
const errors = require('./Error');
const logger = require('./Logger');

require('dotenv').config();

const assistant = new watson.AssistantV1({
  iam_apikey: process.env.WA_API_KEY,
  version: process.env.WA_VERSION,
  url: process.env.WA_URL
});

const sendMessage = text => {
  return new Promise((resolve, reject) => {
    assistant.message(
      {
        workspace_id: process.env.WA_ID,
        input: { text }
      },
      (err, result, response) => {
        if (err) {
          logger.error(`${TAG} Error ${util.inspect(err, false, null)}`);
          reject(errors.raise('WA_SEND_MSG_ERROR', err));
        }
        logger.info(`${TAG} ${JSON.stringify(result, null, 2)}`);
        resolve(result);
      }
    );
  });
};

exports.sendMessage = sendMessage;
