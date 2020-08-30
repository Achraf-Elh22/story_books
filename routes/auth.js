const express = require('express');
const passport = require('passport');

const routes = express.Router();

// @desc Auth with google
// @Route GET /auth/google

routes.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc google auth callback
// @Route GET /auth/google/callback

routes.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// @desc Logout
// @Route GET /auth/logout

routes.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = routes;
