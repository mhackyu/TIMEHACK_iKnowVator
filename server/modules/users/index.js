const TAG = '[USER_MODULE]';
const router = require('express').Router();
const { logger } = require('../../helpers');
const user = require('./models/User');

router.get('/', (req, res) => {
  const ACTION = '[GET_USER]';
  logger.info(`${TAG}${ACTION}`);

  user.getAll()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

module.exports = router;
