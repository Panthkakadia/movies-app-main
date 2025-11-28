const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/movies');
});

router.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = router;
