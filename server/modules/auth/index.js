const TAG = '[AUTH_MODULE]';
const router = require('express').Router();
const { logger, auth, jwt } = require('../../helpers');
const u = require('../users/models/User');

require('dotenv').config();

router.get(
  '/google',
  auth.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/google/callback', auth.authenticate('google', { failureRedirect: '/login' }), async function(req, res) {
    if (req.user) {
      try {
        const user = await u.get(req.user.id);
        // If user is not existing, create new.
        if (user.status === 404) {
          let userInfo = {};
          userInfo.provider_id = req.user.id;
          userInfo.display_name = req.user.displayName;
          userInfo.avatar = req.user.photos[0].value;

          const results = await u.create(userInfo);
          if (results.affectedRows > 0) {
            // If user is successfully created then sign jwt.
            const token = await jwt.sign({ user: userInfo });
            logger.info(`[JWT] ${token}`);
            res.redirect(`${process.env.GOOGLE_REDIRECT_URL}/${token}`);
          }
        } else {
          // Sign existing user
          const token = await jwt.sign({ user });
          logger.info(`[JWT] ${token}`);
          res.redirect(`${process.env.GOOGLE_REDIRECT_URL}/${token}`);
        }
      } catch (err) {
        // Redirect back to login page if any errors are encountered.
        res.status(err.status).send(err);
      }
    } else {
      res.redirect('/');
    }
  }
);

module.exports = router;
