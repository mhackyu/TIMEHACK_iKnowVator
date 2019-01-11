const router = require('express').Router();
const spendingGoal = require('./models/spendingGoal');
const mw = require('../../middlewares/JWT');

router.post('/', mw.verifyToken, (req, res) => {
  const trans = { ...req.body };
  trans.provider_id = req.user.provider_id;

  spendingGoal
    .create(trans)
    .then(result => {
      if (result.affectedRows > 0) {
        res.send({
          status: 200,
          msg: 'Successfully created.'
        });
      }
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

router.get('/', mw.verifyToken, (req, res) => {
  const trans = { ...req.body };
  trans.provider_id = req.user.provider_id;

  spendingGoal
    .getAllByUser(req.user.provider_id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

router.get('/:id', mw.verifyToken, (req, res) => {
  const trans = { ...req.body };
  trans.provider_id = req.user.provider_id;

  spendingGoal
    .getByUserAndId(req.user.provider_id, req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

router.put('/:id', mw.verifyToken, async (req, res) => {
  const trans = { ...req.body };
  trans.provider_id = req.user.provider_id;

  try {
    const e = await spendingGoal.getByUserAndId(req.user.provider_id, req.params.id);
    if (e) {
      spendingGoal
        .updateByUserAndId(req.user.provider_id, req.params.id, req.body)
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          res.status(err.status).send(err);
        });
    }
  } catch (err) {
    res.status(err.status).send(err);
  }
});

router.delete('/:id', mw.verifyToken, async (req, res) => {
  const trans = { ...req.body };
  trans.provider_id = req.user.provider_id;

  try {
    const e = await spendingGoal.getByUserAndId(req.user.provider_id, req.params.id);
    if (e) {
      spendingGoal
        .deleteByUserAndId(req.user.provider_id, req.params.id)
        .then(result => {
          if (result.affectedRows > 0) {
            res.send({
              status: 200,
              msg: 'Successfully deleted.'
            });
          }
        })
        .catch(err => {
          res.status(err.status).send(err);
        });
    }
  } catch (err) {
    res.status(err.status).send(err);
  }
});

module.exports = router;
