const { wa } = require('../../helpers'); //#endregion
const router = require('express').Router();

router.post('/', (req, res) => {
  wa.sendMessage(req.body.text)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

module.exports = router;
