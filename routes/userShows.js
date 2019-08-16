const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Shows = require('../models/Shows');
const UserShows = require('../models/UserShows');
const Sequelize = require('sequelize');
const { ensureAuthenticated } = require('../config/auth');

// My Shows Route
router.get('/myshows', ensureAuthenticated, (req, res) =>
  res.render('myshows', {
    layout: false
  })
);

// Form Route
router.get('/addmyshows', ensureAuthenticated, (req, res) =>
  res.render('addmyshows', {
    layout: false
  })
);

// REVIEW THIS AS title, image ARE NOT PART OF THE MODEL

// Add Show to user_shows db

module.exports = router;
