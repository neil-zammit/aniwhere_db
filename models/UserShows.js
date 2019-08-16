const Sequelize = require('sequelize');
const db = require('../config/database');

// User Shows Model
const userShows = db.define('user_shows', {
  user_id: {
    type: Sequelize.INTEGER
  },
  show_id: {
    type: Sequelize.INTEGER
  }
});

// Export User Shows Model
module.exports = userShows;
