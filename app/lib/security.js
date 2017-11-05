
/*========================
=  보안 관련 작성 모듈   =
=========================*/

/* -------------------------------------------------------------------------------
  * version : 0.0.1
  A. changeHash == crypto를 이용한 해싱 암호화
	B. randomHash == 랜덤해시 생성
	C. xssFilter == 간단한 xss 방어
	D. isLogin == 세션 값 체크로 로그인중인지 확인
-------------------------------------------------------------------------------*/

'use strict';

var crypto = require('crypto'),
		mySalt = "hi?delryn",
    request = require('request'),
		csrf = require('csurf'),
    config = require('../../config/config');

module.exports.changeHash = function(val){
	return crypto.createHash('sha512').update( val + mySalt).digest('base64');
};

module.exports.randomHash = function(len){
  return crypto.randomBytes(Math.ceil(len/2))
      .toString('hex')
      .slice(0,len);
};

module.exports.xssFilter = function(val){
	return val.replace(/</g, "&lt;").replace(/>/g, "&gt;")
};


module.exports.csrfProtection = function(){
	return csrf({ cookie: true });
};

module.exports.isLogin = function(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/');
  }
}
