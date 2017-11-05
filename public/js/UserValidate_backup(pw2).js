
// client validate

'use strict';

$(function() {
  // 로그인 validate
  $('#LoginForm').validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: "required",
    },
    messages: {
      email: {
        required: "이메일 주소를 입력해주세요.",
        email: "올바른 이메일 주소가 아닙니다."
      },
      password: {
        required: "비밀번호를 입력해주세요."
      }
    },
    highlight: function(input){
      $(input).addClass('invalid');
    },
    unhighlight: function(input){
      $(input).removeClass('invalid');
      $(input).addClass('valid');
    },
    errorPlacement: function(error, element){
      $(element)
        .closest("form")
        .find("label[for='" + element.attr("id") + "']")
        .attr('data-error', error.text());
    }
  });

  // 가입 validate
  $('#JoinForm').validate({
    rules: {
      email: {
        required: true,
        email: true,
        remote: {
          url: '/emailCheck'+$('#JoinForm').attr('action'),
          type: 'post',
          data: {
            email: function(){
              return $('#JoinForm input[name="email"]').val();
            }
          },
          dataFilter: function(Result){
            var valid = JSON.parse(Result);
            if(valid){
              return false;
            }else{
              return true;
            }
          }
        }
      },
      name: "required",
      password: {
        required: true,
        passwordCheck: true,
        minlength: 7,
        maxlength: 15
      },
      password2 : {
        required : true,
        equalTo: "[name=password]"
      }
    },
    messages: {
      email: {
        required: "이메일 주소를 입력해주세요.",
        email: "올바른 이메일 주소가 아닙니다.",
        remote: "이미 등록된 이메일 주소입니다."
      },
      name: {
        required: "이름을 적어주세요."
      },
      password: {
        required: "비밀번호를 입력해주세요.",
        passwordCheck: "8-15자로 영문,숫자,특수문자가 포함되어야 합니다.",
        minlength: "7자 이상이어야 합니다.",
        maxlength: "15자를 넘기면 안됩니다."
      },
      password2: {
        required: "비밀번호 확인을 입력해주세요.",
        equalTo: '비밀번호가 일치하지 않습니다.'
      }
    },
    submitHandler: function(form){
      $.ajax({
      url: '/signup'+$(form).attr('action'),
      type: 'post',
      data: $(form).serialize(),
      success: function(Result){
        if (Result) {
          swal({
            title: '회원 가입 완료',
            text: "Welcome",
            type: 'success',
            confirmButtonColor: '#7A2DFF',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Let\'s Start!'
          }).then(function () {
            location.replace('/success');
          });
        } else {
          swal({
            title: 'Error!',
            text: 'Something is wrong..Please try this again',
            type: 'error',
            confirmButtonText: 'Okay...'
          }).then(function () {
            form.reset();
          });
        }
      },
      error:function(request,status,error){
        console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
      }
      });
    },
    highlight: function(input){
      $(input).addClass('invalid');
    },
    unhighlight: function(input){
      $(input).removeClass('invalid');
      $(input).addClass('valid');
    },
    errorPlacement: function(error, element){
      $(element)
        .closest("form")
        .find("label[for='" + element.attr("id") + "']")
        .attr('data-error', error.text());
    }
  });
  $.validator.addMethod("passwordCheck",  function( value, element ) {
    return this.optional(element) ||  /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/.test(value);
  });

  var $date = $('#test7').html();
  $('#test7').html(DateFormat($date));

});

function DateFormat(val){
  var thisDate = new Date(val),
      changeDate,
      monthName = [];
  monthName[0] = "January";
  monthName[1] = "February";
  monthName[2] = "March";
  monthName[3] = "April";
  monthName[4] = "May";
  monthName[5] = "June";
  monthName[6] = "July";
  monthName[7] = "August";
  monthName[8] = "September";
  monthName[9] = "October";
  monthName[10] = "November";
  monthName[11] = "December";

  changeDate = monthName[thisDate.getMonth()]+'&nbsp;'+thisDate.getDate()+',&nbsp;'+thisDate.getFullYear();
  return changeDate;
}
