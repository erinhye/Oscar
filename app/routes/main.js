var express = require('express');
var router = express.Router();
var security = require('../lib/security');

/* GET home page. */
router.get('/', security.csrfProtection(), function(req, res, next) {
  res.render('main', { title: 'Express' });
});

module.exports = router;
