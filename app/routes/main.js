var express = require('express');
var router = express.Router();
var security = require('../lib/security');
var taskModel = mongoose.model('tasks');

/* GET home page. */
router.get('/', security.csrfProtection(), function(req, res, next) {
  res.render('main', { title: 'Express' });

});

router.post('/', function(req, res, next) {
  console.log('POST');
  var deadline = req.body.deadline;
  // var num = req.body.num;
  console.log(deadline);

});

module.exports = router;
