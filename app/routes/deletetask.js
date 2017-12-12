var express = require('express');
var router = express.Router();
var security = require('../lib/security');
var mongoose = require('mongoose');
var userModel = mongoose.model('users');
var taskModel = mongoose.model('tasks');
const Q = require('q');

router.post('/', function(req, res, next) {//ajax에서 호추롸는 부분 = 포스트
  console.log('POST');
  var title = req.body.title;// ajax로 받아온값
  var email = req.user.email;//user 디비 이메일
  var groupname = req.body.groupname;// ajax로 받아온값
  // var num = req.body.num;
  console.log(title);
  console.log("EMAIL"+email);
  //여기부터 시작
  var resList = [];

    findtask()
      .then(function(result) {
        console.log(result[0]._id);

        taskModel.update({'_id':result[0]._id}, {$set:{'deleted':true}}, {multi:true}, function(err){
          if(err) console.log(err);
          console.log("WOWWOWOWOOWOWOW");
          res.send({result:true, groupname:groupname, title:title});
        });
        console.log('1st Random number:', result);
      })
      .catch(function(err) {
        console.log('Error ocuured:', err.message);
      });
  //
  //
  //
  //

  function findtask() {
      let deferred = Q.defer();
      setTimeout(function() {

      // namelist = [];
      // titlelist = [];
      // datelist = [];
      // monthlist = [];
      // yearlist = [];
      resList = [];

      taskModel.find({'email':email, 'title':title, 'group':groupname, 'deleted':false}).sort({date:-1}).exec(function(err, Contents){
                   // db에서 날짜 순으로 데이터들을 가져옴
              if(err) throw err;

              // console.log(Contents);//you can use this.... how silly you are
              //console.log("im here");

            resList = Contents;
            console.log("res1");
            console.log(resList);
            deferred.resolve(resList);

            //   Contents.forEach(function(item, index){
            //   resList[index] = item;
            // })

        });
      }, 200);
      return deferred.promise;
    }
////////////////////////////////////////////////////////

  // var task = new taskModel({
  //   email: req.user.email,
  //   title: req.body.title,
  //   date: Date.now(),
  //   year: new Date().toISOString().slice(0,10).substring(0,4),
  //   month: new Date().toISOString().slice(0,10).substring(5,7),
  //   day: new Date().toISOString().slice(0,10).substring(8,10),
  //   deadline: req.body.deadline,
  //   dlyear: req.body.deadline.substring(0,4),
  //   dlmonth: req.body.deadline.substring(5,7),
  //   dlday: req.body.deadline.substring(8,10),
  //   associate: "",
  //   group: req.body.groupname
  // });//base - undefined에 저장
  //
  // task.save(function(err){//저장
  //   if (err) {
  //     console.log(err);
  //     throw err;
  //   } else {
  //     console.log(task);//req는 지금 세이브중이니 아직 undefined --  req.task가 아닌 task
  //     res.send({result:true, task:task, title:title});
  //
  //     //console.log(task);
  //   }
  // });



});

module.exports = router;
