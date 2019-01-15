const jwt = require('jsonwebtoken');
const { errors } = require('../helpers');
const bt = require('../modules/auth/models/BlacklistedToken');

require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports.verifyToken = async (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    try {
      const bearerToken = bearerHeader.split(' ')[1];
      // Check if token is blacklisted
      const isTokenBlacklisted = await bt.isBlackListed(bearerToken);
      if (isTokenBlacklisted) {
        return res.status(401).send(errors.raise('UNAUTHORIZED'));
      } 
      // If not blacklisted, return decoded token
      jwt.verify(bearerToken, SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(401).send(errors.raise('UNAUTHORIZED'));
        } else {
          req.user = decoded.user;
          req.tokExp = decoded.exp;
          req.token = bearerToken;
          next();
        }
      });
    } catch (error) {
      res.status(401).send(errors.raise('UNAUTHORIZED'));
    }
  } else {
    res.status(401).send(errors.raise('UNAUTHORIZED'));
  }
};
