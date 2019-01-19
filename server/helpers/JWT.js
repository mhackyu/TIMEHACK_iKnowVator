const jwt = require('jsonwebtoken');

require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN;

module.exports.sign = data => {
  return jwt.sign(data, SECRET_KEY, { expiresIn: EXPIRES_IN });
};
