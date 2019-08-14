const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Shows = require('../models/Shows');
const Sequelize = require('sequelize');

// Home Route
router.get('/', (req, res) =>
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
