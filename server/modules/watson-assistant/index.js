const { wa } = require('../../helpers'); //#endregion
const router = require('express').Router();

router.post('/', async(req, res) => {
  try {
    const botResponse = await wa.sendMessage(req.body.text, req.body.context);
    res.send(botResponse);
  } catch (err) {
    res.status(err.status).send(err);
  }

  // wa.sendMessage(req.body.text, req.body.context)
  //   .then(result => {
  //     res.send(result);
  //   })
  //   .catch(err => {
  //     res.status(err.status).send(err);
  //   });
});

module.exports = router;
