// Require Packages
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

// Import database connection variable
const db = require('./config/database');

// Test connection to db
db.authenticate()
  .then(() => {
    console.log('Database connected... ');
  })
  .catch(err => {
    console.error('Unable to connect to the databse:', err);
  });

// Init app with express
const app = express();

// Set handlebars as view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Require Database Model
const Shows = require('./models/Shows');

// Require Home Route
app.use('/', require('./routes/index'));

// Add Show Route
app.use('/', require('./routes/shows'));

// Login Route
app.get('/login', (req, res) =>
  res.render('login', {
    layout: false
  })
);

// PORT variable
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, console.log(`Sever running on port ${PORT}`));
