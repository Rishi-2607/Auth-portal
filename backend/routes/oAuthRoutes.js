import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: process.env.FAILURE_REDIRECT || 'http://localhost:5173/login',
    session: false,
  }),
  (req, res) => {
    try {
      if (!req.user) {
        throw new Error('User not found');
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

      const frontendRedirect = process.env.FRONTEND_REDIRECT || 'http://localhost:5173/dashboard';
      const finalRedirectUrl = `${frontendRedirect}?token=${token}`;
      res.redirect(finalRedirectUrl);
    } catch (error) {
      res.redirect(process.env.FAILURE_REDIRECT || 'http://localhost:5173/login');
    }
  }
);

router.get('/github', passport.authenticate('github', {
  scope: ['user:email'],
}));

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: process.env.FAILURE_REDIRECT || 'http://localhost:5173/login',
    session: false,
  }),
  (req, res) => {
    try {
      if (!req.user) {
        throw new Error('User not found');
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

      const frontendRedirect = process.env.FRONTEND_REDIRECT || 'http://localhost:5173/dashboard';
      const finalRedirectUrl = `${frontendRedirect}?token=${token}`;
      res.redirect(finalRedirectUrl);
    } catch (error) {
      res.redirect(process.env.FAILURE_REDIRECT || 'http://localhost:5173/login');
    }
  }
);

export default router;