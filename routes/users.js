const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User model
const User = require('../models/User');

// Login Route
router.get('/login', (req, res) =>
  res.render('login', {
    layout: false
  })
);

// Register Route
router.get('/register', (req, res) =>
  res.render('register', {
    layout: false
  })
);

// Register Handle
router.post('/register', (req, res) => {
  const { email, password, password2 } = req.body;
  let errors = [];

  // Check that all fields populated
  if (!email || !password || !password2) {
    errors.push({ text: 'Please fill in all fields' });
  }

  // Check that passwords match
  if (password !== password2) {
    errors.push({ text: 'Passwords do not match' });
  }

  // Check pass length
  if (password.length < 8) {
    errors.push({ text: 'Password should be at least 8 characters' });
  }

  // If error/s present, redirect and display error/s
  if (errors.length > 0) {
    res.render('register', {
      errors,
      email,
      password,
      password2,
      layout: false
    });
  } else {
    // Validation passed
    // Check if email exists
    User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        // If email exists, rerender page with error
        errors.push({ text: 'Email already registered' });
        res.render('register', {
          errors,
          email,
          password,
          password2,
          layout: false
        });
      } else {
        const newUser = new User({
          email,
          password
        });

        // Hash Password using bcrypt
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            // Save user to db
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'Registration Successful. You may log in.'
                );
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// Logout Handle
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});

module.exports = router;
