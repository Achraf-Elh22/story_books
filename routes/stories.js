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

// @desc  Show all Page
// @route Get /stories

routes.get('/', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: 'public' })
      .populate('user')
      .sort({ createdAt: 'desc' })
      .lean();

    res.render('stories/index', {
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// @desc  Show story edit
// @route Get /stories/edit/:id

routes.get('/edit/:id', ensureAuth, async (req, res) => {
  const story = await Story.findOne({ _id: req.params.id }).lean();

  if (!story) {
    res.render('error/404');
  }
  if (story.user != req.user.id) {
    res.redirect('/stories');
  } else {
    res.render('stories/edit', {
      story,
    });
  }
});

module.exports = routes;
