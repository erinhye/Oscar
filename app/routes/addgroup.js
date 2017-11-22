var express = require('express');
var router = express.Router();
var security = require('../lib/security');
var mongoose = require('mongoose');
var userModel = mongoose.model('users');
var taskModel = mongoose.model('tasks');
var groupModel = mongoose.model('groups');

router.post('/', function(req, res, next) {//ajax에서 호추롸는 부분 = 포스트
  console.log('ADDGROuP');
  var name = req.body.name;// ajax로 받아온값

  var email = req.user.email;//user 디비 이메일
  // var num = req.body.num;
  console.log(name);
  console.log(email);
  //여기부터 시작


  var group = new groupModel({
    email: req.user.email,
    name: req.body.name
  });

  group.save(function(err){//저장
    if (err) {
      console.log(err);
      throw err;
    } else {
      //console.log(task);//req는 지금 세이브중이니 아직 undefined --  req.task가 아닌 task
      res.send({result:true, name:name});

      //console.log(task);
    }
  });



});

module.exports = router;
