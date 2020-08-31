const express = require('express');

const { ensureAuth } = require('../config/middleware/auth');
const Story = require('../models/story');

const routes = express.Router();

// @desc  Show add Page
// @route Get /stories/add

routes.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add');
});

// @desc  Process add form
// @route POST /stories

routes.post('/', async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

module.exports = routes;
