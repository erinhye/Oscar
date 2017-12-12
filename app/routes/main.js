var express = require('express');
var router = express.Router();
var security = require('../lib/security');
var mongoose = require('mongoose');
var userModel = mongoose.model('users');
var taskModel = mongoose.model('tasks');
var groupModel = mongoose.model('groups');

/* GET home page. */
router.get('/', security.csrfProtection(), function(req, res, next) {

  taskModel.find({'email':req.user.email}).sort({date:-1}).exec(function(err, rawContents){
       // db에서 날짜 순으로 데이터들을 가져옴
        if(err) throw err;


  groupModel.find({'email':req.user.email}).sort({date:1}).exec(function(err, groupContents){
             // db에서 날짜 순으로 데이터들을 가져옴
        if(err) throw err;

  res.render('main', {title: 'Express', contents: rawContents, groupContents: groupContents});//undefined contents
  //contents변수엔 db 검색 결과 json 데이터를 저장해줌
  // res.render('main', { title: 'Express' });
  });
  });
});

router.post('/', function(req, res, next) {//ajax에서 호추롸는 부분 = 포스트
  console.log('POST');
  var deadline = req.body.deadline;// ajax로 받아온값
  var email = req.user.email;//user 디비 이메일
  // var num = req.body.num;
  console.log(deadline);
  console.log(email);
  console.log(req.body.group);
  //여기부터 시작

  var task = new taskModel({
    email: req.user.email,
    date: Date.now(),
    year: new Date().toISOString().slice(0,10).substring(0,4),
    month: new Date().toISOString().slice(0,10).substring(5,7),
    day: new Date().toISOString().slice(0,10).substring(8,10),
    deadline: req.body.deadline,
    dlyear: req.body.deadline.substring(0,4),
    dlmonth: req.body.deadline.substring(5,7),
    dlday: req.body.deadline.substring(8,10),
    group: req.body.group,
    title: req.body.title,
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
