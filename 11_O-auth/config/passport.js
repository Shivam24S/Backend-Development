import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import passport from "passport";
import passportGoogle from "passport-google-oauth20";

import User from "../model/User.js";

const googleAuthStrategy = passportGoogle.Strategy;

passport.use(
  new googleAuthStrategy(
    {
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      callbackURL: "/auth/google/redirect",
    },

    async (accessToken, refreshToken, profile, cb) => {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0].value,
        });
      }

      return cb(null, user);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
