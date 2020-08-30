const express = require('express');

const { ensureAuth, ensureGuest } = require('../config/middleware/auth');

const routes = express.Router();

// @desc Login/Landing Page
// @Route GET /

routes.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

// @desc Dashboard
// @Route GET /dashboard

routes.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard', {
    name: req.user.firstName,
  });
});

module.exports = routes;
