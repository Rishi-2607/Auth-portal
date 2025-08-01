import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 🔐 Google Strategy (only for pre-registered users)
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'User not registered' });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// 🐙 GitHub Strategy (auto-register if not found)
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.displayName || profile.username,
            email,
            password: 'oauth',
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
});

export const googleCallbackHandler = (req, res) => {
  if (!req.user) {
    return res.redirect(`${process.env.FAILURE_REDIRECT}?error=notRegistered`);
  }

  const token = jwt.sign(
    {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.redirect(`${process.env.FRONTEND_REDIRECT}?token=${token}`);
};

export const githubCallbackHandler = (req, res) => {
  if (!req.user) {
    return res.redirect(`${process.env.FAILURE_REDIRECT}?error=notRegistered`);
  }

  const token = jwt.sign(
    {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.redirect(`${process.env.FRONTEND_REDIRECT}?token=${token}`);
};