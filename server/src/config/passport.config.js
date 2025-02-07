import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true,
};

passport.use(
  new GoogleStrategy(
    googleConfig,
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email, isValid: true });

        if (!user) {
          user = new User({
            fullname: profile.displayName,
            email: email,
            googleId: profile.id,
            isValid: true,
          });

          await user.save();
          return done(null, user, { message: "User created successfully" });
        }

        return done(null, user, { message: "User logged in successfully" });
      } catch (error) {
        console.error("Google Auth Error:", error);
        return done(error, false);
      }
    }
  )
);

export default passport;
