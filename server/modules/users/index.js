const router = require('express').Router();
const user = require('./models/User');
const bt = require('../auth/models/BlacklistedToken');
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
  res.send(req.user);
});

router.post('/logout', mw.verifyToken, function(req, res) {
  const data = {
    token: req.token,
    expires_at: req.tokExp
  };
  bt.create(data)
    .then(result => {
      if (result.affectedRows > 0) {
        req.logout();
        res.send({
          status: 200,
          msg: 'Successfully logged out.'
        });
      }
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

module.exports = router;
