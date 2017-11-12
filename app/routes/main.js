var express = require('express');
var router = express.Router();
var security = require('../lib/security');
var mongoose = require('mongoose');
var userModel = mongoose.model('users');
var taskModel = mongoose.model('tasks');

/* GET home page. */
router.get('/', security.csrfProtection(), function(req, res, next) {
  res.render('main', { title: 'Express' });

});

router.post('/', function(req, res, next) {//ajax에서 호추롸는 부분 = 포스트
  console.log('POST');
  var deadline = req.body.deadline;// ajax로 받아온값
  var email = req.user.email;//user 디비 이메일
  // var num = req.body.num;
  console.log(deadline);
  console.log(email);
  //여기부터 시작

  var task = new taskModel({
    email: req.user.email,
    group: req.body.group,
    deadline: req.body.deadline,
    importance: req.body.importance,
    title: req.body.title,
    description: req.body.description,
    associate: req.body.associate
  });

  task.save(function(err){//저장
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(task);//req는 지금 세이브중이니 아직 undefined --  req.task가 아닌 task
      res.send({result:true, task:task});
      //console.log(task);
    }
  });



});

module.exports = router;
