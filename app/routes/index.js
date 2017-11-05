var express = require('express');
var router = express.Router();
var security = require('../lib/security');

/* GET home page. */
router.get('/', security.csrfProtection(), function(req, res, next) {
  res.render('index', {
    isAuthenticated : req.isAuthenticated()
  });
});

module.exports = router;
