const Sequelize = require("sequelize");

// Set up connection with db via Sequelize
const db = new Sequelize("aniwhere", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false
  }
});

// Allow for connection variable to be exported
module.exports = db;
