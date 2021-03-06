var express = require('express');
var router = express.Router();
var security = require('../lib/security');
var mongoose = require('mongoose');
var userModel = mongoose.model('users');
var taskModel = mongoose.model('tasks');

router.post('/', function(req, res, next) {//ajax에서 호추롸는 부분 = 포스트
  console.log('POST');
  var title = req.body.title;// ajax로 받아온값
  var groupname = req.body.groupname;//user 디비 이메일
  var email = req.user.email;//user 디비 이메일
  // var num = req.body.num;
  console.log(title);
  console.log(groupname);
  console.log(email);
  //여기부터 시작


  var task = new taskModel({
    email: req.user.email,
    title: req.body.title,
    date: Date.now(),
    year: new Date().toISOString().slice(0,10).substring(0,4),
    month: new Date().toISOString().slice(0,10).substring(5,7),
    day: new Date().toISOString().slice(0,10).substring(8,10),
    deadline: new Date().toISOString().slice(0,10),
    dlyear: new Date().toISOString().slice(0,10).substring(0,4),
    dlmonth: new Date().toISOString().slice(0,10).substring(5,7),
    dlday: new Date().toISOString().slice(0,10).substring(8,10),
    associate: "",
    group: req.body.groupname
  });//base - undefined에 저장

  task.save(function(err){//저장
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(task);//req는 지금 세이브중이니 아직 undefined --  req.task가 아닌 task
      res.send({result:true, task:task, title:title});

      //console.log(task);
    }
  });



});

module.exports = router;
