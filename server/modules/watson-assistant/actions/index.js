const Expense = require('./Expense');
const Income = require('./Income');
const Savings = require('./Savings');

module.exports = {
  ...Expense,
  ...Income,
  ...Savings
};