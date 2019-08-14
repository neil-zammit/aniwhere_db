const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Shows = require('../models/Shows');
const Sequelize = require('sequelize');
const { ensureAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/welcome', (req, res) => {
  res.render('welcome', { layout: false });
});

// Home Route
router.get('/', ensureAuthenticated, (req, res) =>
  // Retrieve data from db and render in template engine
  Shows.findAll()
    .then(shows => {
      res.render('index', {
        shows,
        layout: false
      });
    })
    .catch(err => console.log(err))
);

module.exports = router;
