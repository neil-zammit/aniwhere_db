const Sequelize = require('sequelize');
const db = require('../config/database');

// Database model
const User = db.define('user', {
  email: {
    // VARCHAR(255)
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  password2: {
    type: Sequelize.STRING
  }
});

// Export model
module.exports = User;
