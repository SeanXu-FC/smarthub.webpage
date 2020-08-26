"use strict";

$(function () {
  var oldPwd = $("#oldPwd").val();
  var newPwd = $("#newpwd").val();
  $('input[name="oldPwd"]').focus(function () {
    $(this).siblings().find('span').text('Please input a password!').removeClass('state1 state4 state3').addClass('state2');
  }).blur(function () {
    var len = $(this).val().length;

    if (len >= 8 && len <= 20 && $(this).val() != '') {
      $(this).siblings().find('span').text('The password is entered correctly!').removeClass('state1 state4 state3').addClass('state4'); // username = true;
    } else {
      $(this).siblings().find('span').text('The password input error, should be No less than 8-digit password!').removeClass('state1 state2 state4').addClass('state3');
    }
  });
  $('input[name="newPwd"]').focus(function () {
    $(this).siblings().find('span').text('Please enter a new password!').removeClass('state1 state4 state3').addClass('state2');
  }).blur(function () {
    var len = $(this).val().length;

    if (len >= 8 && len <= 20 && $(this).val() != '') {
      $(this).siblings().find('span').text('The new password is entered correctly!').removeClass('state1 state4 state3').addClass('state4'); //username = true;
    } else {
      $(this).siblings().find('span').text('The new password input error, should be No less than 8-digit password!').removeClass('state1 state2 state4').addClass('state3');
    }
  });
  $('input[type="submit"]').on('click', function () {
    //console.log(111)
    // if (oldPwd && newPwd) {
    //     //$('form').submit();
    //     alert("Password modified successfully");
    // } else {
    //     return alert('You didn\'t fill it out completely or fill in the wrong format!');
    // }
    // var data = {
    //     "jsonrpc": "2.0",
    //     "method": "change_password",
    //     "params": {
    //         "oldPwd": $("#pwd").val(),
    //         "newPwd": $("#newPwd").val()
    //     },
    //     "id": "9.1"
    // };
    // data = JSON.stringify(data);
    $.ajax({
      type: "post",
      url: "/action/password",
      // data: data,
      dataType: "json",
      data: $("#form").serialize(),
      //contentType: "application/json;charset=utf-8",
      contentType: "application/x-www-form-urlencoded;charset=utf-8",
      success: function success(res) {
        if (res.result.flag == "success") {
          console.log(res);
          alert("Password modified successfully");
        } else {
          console.log("An error occurred：" + res.result.flag);
        }
      },
      error: function error(jqXHR) {
        alert("An error occurred：" + jqXHR.status);
      }
    });
  }); // $('#saveBtn').click(function() {
  //     var data = {
  //         "jsonrpc": "2.0",
  //         "method": "change_password",
  //         "params": {
  //             "oldPwd": $("#pwd").val(),
  //             "newPwd": $("#newPwd").val()
  //         },
  //         "id": "9.1"
  //     };
  //     data = JSON.stringify(data);
  //     $.ajax({
  //         type: "post",
  //         url: "/action/password",
  //         data: data,
  //         dataType: "json",
  //         contentType: "application/json;charset=utf-8",
  //         success: function(data) {
  //             if (data.status == "success") {
  //                 console.log(data.msg);
  //             } else {
  //                 console.log("出现错误：" + data.msg);
  //             }
  //         },
  //         error: function(jqXHR) {
  //             alert("发生错误：" + jqXHR.status);
  //         }
  //     });
  // });
});