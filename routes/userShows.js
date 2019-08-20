const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Shows = require('../models/Shows');
const UserShows = require('../models/UserShows');
const Sequelize = require('sequelize');
const { ensureAuthenticated } = require('../config/auth');

// My Shows Route
router.get('/myshows', ensureAuthenticated, (req, res) =>
  // Displays shows for the logged in user
  Shows.findAll({
    include: [
      {
        model: UserShows,
        // req.user is the logged in user
        where: { user_id: req.user }
      }
    ]
  })
    .then(shows => {
      res.render('myshows', {
        shows,
        layout: false
      });
    })
    .catch(err => console.log(err))
);

// Form Route
router.get('/addmyshows', ensureAuthenticated, (req, res) =>
  res.render('addmyshows', {
    layout: false
  })
);

// Add Show to MyShows Route
router.post('/myshows', ensureAuthenticated, (req, res) => {
  // Retrieve data from form
  let { title, image } = req.body;
  // Retrieve current user
  const user_id = req.user;
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
    res.render('addmyshows', {
      errors,
      title,
      image,
      layout: false
    });
  } else {
    // Retrieve show data
    Shows.findOne({
      raw: true,
      // find show from db which matches the user's input
      where: { title: req.body.title }
    })
      .then(shows => {
        const show_id = shows.id;
        // Insert into table
        UserShows.create({
          user_id,
          show_id
        })
          .then(shows => res.redirect('/myshows'))
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log('Error finding shows : ', err);
      });
  }
});

module.exports = router;
