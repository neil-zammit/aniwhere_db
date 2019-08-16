const User = require('../models/User');
const Shows = require('../models/Shows');
const UserShows = require('../models/UserShows');
const Sequelize = require('sequelize');

// User Relation
User.hasMany(UserShows, { foreignKey: 'user_id' });
UserShows.belongsTo(User, { foreignKey: 'id' });

// Show Relation
Shows.hasMany(UserShows, { foreignKey: 'show_id' });
UserShows.belongsTo(Shows, { foreignKey: 'id' });

// Selects all users that watch a particular show
// User.findAll({ include: [{ model: UserShows, where: { show_id: '2' } }] })
//   .then(users => {
//     console.log(users);
//   })
//   .catch(err => {
//     console.log('Error finding users : ', err);
//   });

// Selects all shows that a particular user watches
Shows.findAll({ include: [{ model: UserShows, where: { user_id: '2' } }] })
  .then(shows => {
    console.log(shows);
  })
  .catch(err => {
    console.log('Error finding shows : ', err);
  });
