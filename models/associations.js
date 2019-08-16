const User = require('../models/User');
const Shows = require('../models/Shows');
const UserShows = require('../models/UserShows');
const Sequelize = require('sequelize');

module.exports = function(associations) {
  // User Relation
  User.hasMany(UserShows, { foreignKey: 'user_id' });
  UserShows.belongsTo(User, { foreignKey: 'id' });

  // Show Relation
  Shows.hasMany(UserShows, { foreignKey: 'show_id' });
  UserShows.belongsTo(Shows, { foreignKey: 'id' });
};
