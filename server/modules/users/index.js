const router = require('express').Router();
const user = require('./models/User');
const mw = require('../../middlewares/JWT');

router.get('/', mw.verifyToken, (req, res) => {
  user
    .getAll()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

router.get('/me', mw.verifyToken, (req, res) => {
  res.send(req.user.user);
});

module.exports = router;
