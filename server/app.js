const express = require('express');
const helmet = require('helmet');
const util = require('util');
const { logger, auth } = require('./helpers');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(auth.initialize());

// Request Info Middleware
app.use((req, res, next) => {
  const i = {
    REQ: `${req.method} ${req.url}`,
    BODY: util.inspect(req.body, false, null),
    PARAMS: util.inspect(req.params, false, null)
  };
  logger.info(util.inspect(i, false));
  next();
});

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});

app.get('/', (req, res) => {
  res.send({ msg: 'We are Team iKnowVator' });
});

app.get('/login', (req, res) => {
  res.send('Welcome to login page');
});

const authenticate = require('./modules/auth');
const wa = require('./modules/watson-assistant');
const user = require('./modules/users');
const expense = require('./modules/expense');

app.use('/auth', authenticate);
app.use('/api/send', wa);
app.use('/api/users', user);
app.use('/api/expenses', expense);
