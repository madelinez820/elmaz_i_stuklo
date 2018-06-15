//this file links together all the pages using express

// dependencies
const express = require('express');
const router = express.Router();

// public endpoints
router.get('/', function(req, res, next) {
  res.sendFile('landingpage.html', { root: 'src/views' });
});


module.exports = router;
