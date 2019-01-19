const TAG = '[AUTH]';
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const logger = require('./Logger');

require('dotenv').config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = `${process.env.URL}:${process.env.PORT}${process.env.GOOGLE_CALLBACK_URL}`;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      if (profile) {
        logger.info(`${TAG} ${JSON.stringify(profile, null, 2)}`);
        user = profile;
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
