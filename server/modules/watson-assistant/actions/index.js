const Expense = require('./Expense');
const Income = require('./Income');
const Savings = require('./Savings');
const Budget = require('./Budget');

module.exports = {
  ...Expense,
  ...Income,
  ...Savings,
  ...Budget
};