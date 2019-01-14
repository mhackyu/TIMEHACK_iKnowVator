const { wa } = require('../../helpers');
const mw = require('../../middlewares/JWT');
const actions = require('./actions');
const router = require('express').Router();

router.post('/', mw.verifyToken, async (req, res) => {
  try {
    const botResponse = await wa.sendMessage(req.body.text, req.body.context);
    // Check if there's an action that needs to be executed.
    if (botResponse.context.hasOwnProperty('action')) {
      // Check if action value is valid function
      if (typeof actions[botResponse.context.action] === 'function') {
        actions[botResponse.context.action](botResponse, req.user)
          .then(result => {
            botResponse.context.actionResult = result;
            res.send(botResponse);
          })
          .catch(err => {
            res.status(err.status).send(err);
          });
      } else {
        res.send(botResponse);   
      }
    } 
    else {
      res.send(botResponse);
    }
  } catch (err) {
    res.status(err.status).send(err);
  }
});

module.exports = router;
