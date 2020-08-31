const express = require('express');

const { ensureAuth, ensureGuest } = require('../config/middleware/auth');
const Story = require('../models/story');

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

routes.get('/dashboard', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render('dashboard', {
      name: req.user.firstName,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = routes;
