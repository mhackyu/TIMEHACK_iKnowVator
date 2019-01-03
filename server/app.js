const express = require('express');
const helmet = require('helmet');
const util = require('util');
const { db, logger } = require('./helpers');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
// Request Info Middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  logger.info(`BODY ${util.inspect(req.body, false, null)}`);
  logger.info(`PARAMS ${util.inspect(req.params, false, null)}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});

app.get('/', (req, res) => {
  res.send({ msg: 'We are Team iKnowVator' });
});

const user = require('./modules/users');
const wa = require('./modules/watson-assistant');

app.use('/api/users', user);
app.use('/api/send', wa);
