const Sequelize = require("sequelize");
const db = require("../config/database");

// Database model
const Shows = db.define("shows", {
  title: {
    // VARCHAR(255)
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  }
});

// Export model
module.exports = Shows;
