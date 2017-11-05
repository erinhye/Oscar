'use strict';

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    userModel = mongoose.model('users'),
    security = require('../lib/security'),
    key = require('../../config/key'),
    passport = require('passport'),
    facebookStrategy = require('passport-facebook').Strategy,
    googleStrategy = require('passport-google-oauth20').Strategy,
    githubStrategy = require('passport-github').Strategy,
    twitterStrategy = require('passport-twitter').Strategy;

module.exports = function (app) {
  app.use('/auth', router);
};

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    var result = user;
    result.password = "";
    done(null, result);
});

// facebook
passport.use(new facebookStrategy({
        clientID: key.facebookId,
        clientSecret: key.facebookSecret,
        callbackURL: key.facebookCallback,
        profileFields: ['displayName', 'email', 'picture.type(large)']
    },
    function(accessToken, refreshToken, profile, done) {
      // 비동기 처리 방식
      process.nextTick(function() {
        userModel.findOne({email: profile.emails[0].value}, function(err, User){
          if (err) {
            return done(err);
          } else if (!User) {
            var user = new userModel({
              email: profile.emails[0].value,
              password: security.randomHash(10),
              name: profile.displayName,
              joinWay: 'facebook',
              image: profile.photos[0].value
            });
            user.save(function(err, saveUser){
              if (err) {
                return done(err);
              } else {
                return done(null, saveUser);
              }
            });
          } else if(User && User.joinWay !== 'facebook') {
            return done(null, false, {message: '이미 등록된 SNS 계정이 있습니다.'});
          } else {
            return done(null, User);
          }
        });
      });
    }
));
router.get('/facebook',passport.authenticate('facebook', {authType: 'rerequest', scope: [ 'email' ]}));
router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/success',
    failureRedirect : '/',
    failureFlash: true
}));

// twitter
passport.use(new twitterStrategy({
        consumerKey: key.twitterId,
        consumerSecret: key.twitterSecret,
        callbackURL: key.twitterCallback,
        includeEmail: true
    },
    function(token, tokenSecret, profile, done) {
      process.nextTick(function() {
        userModel.findOne({email: profile.emails[0].value}, function(err, User){
          if (err) {
            return done(err);
          } else if (!User) {
            var user = new userModel({
              email: profile.emails[0].value,
              password: security.randomHash(10),
              name: profile.displayName,
              joinWay: 'twitter',
              image: profile.photos[0].value
            });
            user.save(function (err, saveUser){
              if (err) {
                return done(err);
              } else {
                return done(null, saveUser);
              }
            });
          }else if (User && User.joinWay !== 'twitter'){
            return done(null, false, {message: '이미 등록된 SNS 계정이 있습니다.'});
          } else {
            return done(null, User);
          }
        });
      });
    }
));
router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/success',
    failureRedirect : '/',
    failureFlash: true
}));

// github
passport.use(new githubStrategy({
        clientID: key.githubId,
        clientSecret: key.githubSecret,
        callbackURL: key.githubCallback
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        userModel.findOne({email: profile.emails[0].value}, function(err, User){
          if (err) {
            return done(err);
          } else if (!User) {
            var user = new userModel({
              email: profile.emails[0].value,
              password: security.randomHash(10),
              name: profile.displayName,
              joinWay: 'github',
              image: profile.photos[0].value
            });
            user.save(function (err, saveUser){
              if (err) {
                return done(err);
              } else {
                return done(null, saveUser);
              }
            });
          }else if(User && User.joinWay !== 'github'){
            return done(null, false, {message: '이미 등록된 SNS 계정이 있습니다.'});
          }else{
            return done(null, User);
          }
        });
      });
    }
));
router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', {
    successRedirect: '/success',
    failureRedirect : '/',
    failureFlash: true
}));

// google
passport.use(new googleStrategy({
        clientID: key.googleId,
        clientSecret: key.googleSecret,
        callbackURL: key.googleCallback,
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        userModel.findOne({email: profile.emails[0].value}, function(err, User){
          if (err) {
            return done(err);
          } else if (!User) {
            var user = new userModel({
              email: profile.emails[0].value,
              password: security.randomHash(10),
              name: profile.displayName,
              joinWay: 'google',
              image: profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'))
            });
            user.save(function (err, saveUser){
              if (err) {
                return done(err);
              } else {
                return done(null, saveUser);
              }
            });
          }else if (User && User.joinWay !== 'google') {
            return done(null, false, {message: '이미 등록된 SNS 계정이 있습니다.'});
          } else {
            return done(null, User);
          }
        });
      });
    }
));
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/main',
  failureRedirect : '/',
  failureFlash: true
}));
