var express = require('express');
var router = express.Router();
var security = require('../lib/security');
var mongoose = require('mongoose');
var userModel = mongoose.model('users');
var taskModel = mongoose.model('tasks');
var groupModel = mongoose.model('groups');
const Q = require('q');

router.post('/', function(req, res, next) {//ajax에서 호추롸는 부분 = 포스트
  console.log('ADDGROuP');
  var name = req.body.name;// ajax로 받아온값 -- GROUPNAME == name

  var email = req.user.email;//user 디비 이메일
  // var num = req.body.num;
  console.log(name);
  console.log(email);
  //여기부터 시작

  var resList = [];

  findgroup()
    .then(function(result) {
      console.log(result[0]._id);

      groupModel.update({'_id':result[0]._id}, {$set:{'deleted':true}}, {multi:true}, function(err){
        if(err) console.log(err);
        console.log("WOWWOWOWOOWOWOW");
        res.send({result:true, name:name});
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

function findgroup() {
    let deferred = Q.defer();
    setTimeout(function() {

    // namelist = [];
    // titlelist = [];
    // datelist = [];
    // monthlist = [];
    // yearlist = [];
    resList = [];

    groupModel.find({'email':email, 'name':name, 'deleted':false}).sort({date:-1}).exec(function(err, Contents){
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


  ///////


});

module.exports = router;
