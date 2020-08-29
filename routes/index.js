const express = require('express');

const routes = express.Router();

// @desc Login/Landing Page
// @Route GET /

routes.get('/', (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

// @desc Dashboard
// @Route GET /dashboard

routes.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

module.exports = routes;
