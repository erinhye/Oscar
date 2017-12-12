'use strict';

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    userModel = mongoose.model('users'),
    taskModel = mongoose.model('tasks'),
    groupModel = mongoose.model('groups'),
    security = require('../lib/security'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy;

var index = require('../routes/index');
var main = require('../routes/main');
var addtask = require('../routes/addtask');
var addtaskdl = require('../routes/addtaskdl');
var addtaskgroupname = require('../routes/addtaskgroupname');
var addsuperimptask = require('../routes/addsuperimptask');
var addgroup = require('../routes/addgroup');
var adddeadlinegroupname = require('../routes/adddeadlinegroupname');

var adddeadlineimp = require('../routes/adddeadlineimp');
var addgroupimp = require('../routes/addgroupimp');
var adddeadlinegroupimp = require('../routes/adddeadlinegroupimp');

var deletetask = require('../routes/deletetask');
var deletegroup = require('../routes/deletegroup');





// app.use('/', index);
// app.use('/main', main);

module.exports = function (app) {
  app.use('/', router);
  app.use('/', index);
  app.use('/main', main);
  app.use('/addtask', addtask);
  app.use('/addtaskdl', addtaskdl);
  app.use('/addtaskgroupname', addtaskgroupname);
  app.use('/addsuperimptask', addsuperimptask);
  app.use('/addgroup', addgroup);
  app.use('/adddeadlinegroupname', adddeadlinegroupname);
  app.use('/adddeadlineimp', adddeadlineimp);
  app.use('/addgroupimp', addgroupimp);
  app.use('/adddeadlinegroupimp', adddeadlinegroupimp);

  app.use('/deletetask', deletetask);
  app.use('/deletegroup', deletegroup);
};

router.get('/api/user_data', function(req, res) {

            if (req.user === undefined) {
                // The user is not logged in
                res.json({});
            } else {
                res.json({
                    username: req.user,
                    sessionID: req.sessionID
                });
            }
});



// router.get('/start', security.csrfProtection(), function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
//
// router.get('/main', security.csrfProtection(), function(req, res, next) {
//   res.render('main', { title: 'Express' });
// });

router.get('/signin', security.csrfProtection(), function (req, res) {
    res.render('signin', {
      title: 'Oscar | Sign In',
      csrfToken: req.csrfToken(),
      message: req.flash('error'),
      remember: req.cookies.remember
    });
});

router.get('/signup', security.csrfProtection(), function (req, res) {
    res.render('signup', {
      title: 'Oscar | Sign Up',
      csrfToken: req.csrfToken()
    });
});

// 패스포트 로그인 성공 시 세션 처리
passport.serializeUser(function (user, done) {
    done(null, user);
});

// 패스포트 페이지 이동 시 세션 처리
// passport 공홈에선 페이지 이동할때마다 serializeUser의 세션값을 이용하여 정보를 검색해서 deserializeUser를 사용하라고 하지만 유저정보가 작기 때문에 안씀
passport.deserializeUser(function (user, done) {
    done(null, user);
});

// local Strategy 세팅
passport.use(new localStrategy({
  usernameField: 'email',
  passwordField : 'password',
  passReqToCallback : true
},
  function (req, email, password, done)
  {
    userModel.findOne({email: security.xssFilter(email), password: security.changeHash(password)}, function(err, User){
      if (err) {
        throw err;
      } else if (!User) {
        return done(null, false, {message: '등록된 이메일 주소가 없거나 비밀번호가 틀렸습니다.'});
      } else {
        return done(null, User);
      }
    });
  }
));

// 로그인 처리
router.post('/signin', security.csrfProtection(), passport.authenticate('local', {
  // 실패 url
  failureRedirect : '/signin',
  failureFlash: true
}),
function (req, res){
  // 메일 저장
  if (req.body.remember) {
    res.cookie('remember', req.body.email, {expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}); // 1년
  } else {
    res.clearCookie('remember');
  }
  res.redirect('/main');
});

// 성공 한뒤 가는 url
// router.get('/success', security.isLogin, function (req, res){
//   res.render('success',{
//     title: '로그인 성공 페이지',
//     user: req.user
//   });
// });

// 로그아웃
router.get('/signout', function (req, res){
  req.logout();
  res.redirect('/');
});

// 탈퇴
router.get('/delete', function (req, res){
  userModel.remove({ _id: req.user._id }, function (err) {
    if (err) {
      throw err;
    } else {
      req.logout();
      res.redirect('/');
    }
  });
});

// 이메일 있는지 확인 ajax
router.post('/emailCheck', security.csrfProtection(), function (req, res){
  userModel.findOne({email: security.xssFilter(req.body.email)}, function(err, User){
    if (err) {
      throw err;
    } else if(User) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
});

// 회원 가입
router.post('/signup', security.csrfProtection(), function (req,res){
  var user = new userModel({
    email: security.xssFilter(req.body.email),
    name: security.xssFilter(req.body.name),
    password: security.changeHash(req.body.password),
    joinWay: '로컬 가입'
  });
  var validationErr = user.validateSync();
  user.save(function (err, User){
    if (err) {
      throw err;
    } else if (User && !validationErr) {
      res.json(true);
      console.log(user);
    } else {
      res.json(false);
    }
  });
});
