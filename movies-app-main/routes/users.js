const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { body } = require('express-validator');

router.get('/register', authController.registerForm);
router.post('/register', [
  body('username').trim().notEmpty().withMessage('Username required'),
  body('password').trim().isLength({ min: 5 }).withMessage('Password min 5 chars')
], authController.register);

router.get('/login', authController.loginForm);
router.post('/login', authController.login);

router.post('/logout', authController.logout);

module.exports = router;
