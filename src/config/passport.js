const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { userService } = require('../services');

const opts = {
  secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new JwtStrategy(opts, async (payload, done) => {
  try {
    const user = await userService.findById(payload.id);
    if (user) {
      return done(null, user);
    }
  } catch (err) {
    return done(err, null);
  }
});

module.exports = jwtStrategy;
