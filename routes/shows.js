const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Shows = require('../models/Shows');
const Sequelize = require('sequelize');
const { ensureAuthenticated } = require('../config/auth');

// Form Route
router.get('/add', ensureAuthenticated, (req, res) =>
  res.render('add', {
    layout: false
  })
);

// Add Show to db
router.post('/', (req, res) => {
  // Retrieve data from form
  let { title, image } = req.body;
  // Create array to store errors for form validation
  let errors = [];

  // Form Validation
  if (!title) {
    errors.push({ text: 'Add show title ' });
  }
  if (!image) {
    errors.push({ text: 'Add image location ' });
  }

  // If error in errors array, display error
  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      image,
      layout: false
    });
  } else {
    // Insert into table
    Shows.create({
      title,
      image
    })
      .then(shows => res.redirect('/'))
      .catch(err => console.log(err));
  }
});

module.exports = router;
