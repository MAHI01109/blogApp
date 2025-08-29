import passport from "passport";
import User from "../models/User.model.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";

export const configurePassport = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "login" },
      async (login, password, done) => {
        try {
          const user = await User.findOne({
            $or: [{ username: login }, { email: login }]
          });
          if (!user) {
            return done(null, false, { message: "Incorrect username or email." })
          }
          user.authenticate(password, (err, user, options) => {
            if (err) return done(err);
            if (!user) return done(null, false, { message: options.message });
            return done(null, user);
          })
        } catch (error) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id); // Store user ID in session
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user); // Attach full user object to req.user
    } catch (err) {
      done(err, null);
    }
  });


  // Google OAuth strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL, // or full URL like http://localhost:3000/api/auth/google/callback
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({ googleId: profile.id });
          if (existingUser) {
            return done(null, existingUser);
          }
          // If not found, create a new user
          const newUser = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            firstname: profile.name?.givenName || "",
            lastname: profile.name?.familyName || "",
            email: profile.emails[0].value,
            profileImage: profile.photos[0].value,
            password: '',
            provider: 'google',
            role: 'User',
            bio:'',
            coverImage:'',
          });

          done(null, newUser);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

};
