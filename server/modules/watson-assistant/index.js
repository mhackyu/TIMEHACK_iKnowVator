const { wa } = require('../../helpers'); //#endregion
const actions = require('./actions');
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const botResponse = await wa.sendMessage(req.body.text, req.body.context);
    // Check if there's an action that needs to be executed.
    if (botResponse.context.hasOwnProperty('action')) {
      // Check if action value is valid function
      if (typeof actions[botResponse.context.action] === 'function') {
        actions[botResponse.context.action](botResponse);
      }
    }
    res.send(botResponse);
  } catch (err) {
    res.status(err.status).send(err);
  }
});

module.exports = router;
