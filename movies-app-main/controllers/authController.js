const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.registerForm = (req, res) => {
  res.render('auth/register');
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.render('auth/register', { errors: errors.array() });

  try {
    const user = new User(req.body);
    await user.save();
    req.session.userId = user._id;
    req.session.success = 'Registered successfully!';
    res.redirect('/movies');
  } catch (err) {
    res.render('auth/register', { error: 'Username taken or other error' });
  }
};

exports.loginForm = (req, res) => {
  res.render('auth/login');
};

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.render('auth/login', { error: 'Invalid username or password' });
  }
  req.session.userId = user._id;
  req.session.success = 'Welcome back!';
  res.redirect('/movies');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
