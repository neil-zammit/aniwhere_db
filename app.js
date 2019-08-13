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

// Home Route
app.get('/', (req, res) =>
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

// Form Route
app.get('/add', (req, res) =>
  res.render('add', {
    layout: false
  })
);

// Add Show to db
app.post('/', (req, res) => {
  // Retrieve data from form
  let { title, image } = req.body;
  // Create array to store errors for form validation
  let errors = [];

  // Form Validation
  if (!title) {
    errors.push({ text: 'Add show title ' });
  }
  if (!image) {
    errors.push({ text: 'Add image location ' });
  }

  // If error in errors array, display error
  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      image,
      layout: false
    });
  } else {
    // Insert into table
    Shows.create({
      title,
      image
    })
      .then(shows => res.redirect('/'))
      .catch(err => console.log(err));
  }
});

// PORT variable
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, console.log(`Sever running on port ${PORT}`));
