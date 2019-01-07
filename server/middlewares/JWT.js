const jwt = require('jsonwebtoken');
const { errors } = require('../helpers');

require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports.verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, SECRET_KEY, (err, decoded) => {
      if (err) {
        res.send(errors.raise('UNAUTHORIZED'));
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.send(errors.raise('UNAUTHORIZED'));
  }
};