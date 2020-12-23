document.onkeydown = function(e) {
    var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        login();
    }
}
$(function() {

    var username = false;
    var password = false;
    var repassword = false;
    var email = false;
    //username
    $('input[name="username"]').focus(function() {
        $(this)
            .siblings()
            .find('span')
            .text('User name input error, should be between 5-20 digits!')
            .removeClass('state1 state4 state3').addClass('state2');
        $(".state2").show();
    }).blur(function() {
        var len = $(this).val().length;
        if (len >= 5 && len <= 20 && $(this).val() != '') {
            $(this).siblings()
                .find('span')
                .text('The user name is entered correctly!')
                .removeClass('state1 state4 state3').addClass('state4');
            username = true;
            $("#login_btn").removeAttr("disabled");
        } else {
            $(this).siblings()
                .find('span')
                .text('User name input error, should be between 5-20 digits!')
                .removeClass('state1 state2 state4')
                .addClass('state3');
            $("#login_btn").attr("disabled", "disabled");
        }
    })

    //password
    $('input[name="password"]').focus(function() {
        $(this).siblings()
            .find('span')
            .text('Password 6-20 characters, only contains alphanumeric underline!')
            .removeClass()
            .addClass('state2');
    }).keyup(function() {
        // var reg = /^[a-z | A-Z]\w{5,19}$/; //以字母开头，5-19位               
        //var reg = /^\w{6,19}$/;
        var reg = /^[\da-zA-Z!@#$%|+-^&*.~]{6,64}$/; //数字、字母、特殊字符
        if (reg.test($(this).val())) {
            $(this).siblings()
                .find('span')
                .text('Correct password input!')
                .removeClass()
                .addClass('state4');
            password = true;
            $("#login_btn").removeAttr("disabled");
        } else {
            $(this).siblings()
                .find('span')
                .text('Password input error, please re-enter!')
                .removeClass()
                .addClass('state3');
            $("#login_btn").attr("disabled", "disabled");
        }
    })

    $(".password-show").on("click", function() {

        var type = $("#pwd").attr("type");
        if (type == "password") {
            $("#pwd").attr("type", "text");
            $(this).text("HIDE");
        } else {
            $("#pwd").attr("type", "password");
            $(this).text("SHOW");
        }
    })


})


function login() {
    var $userId = $("#userId");
    var $pwd = $("#pwd");
    console.log($('#loginInfo').serialize())
        //return;
    $.ajax({
        url: "/action/login",
        type: "post",
        data: $('#loginInfo').serialize(),
        //data: "username=admin&password=123456",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function(res) {
            if (res.result && res.result.login == "0") {
                // $userId.next().text("Wrong user name or password").css({
                //     "font-weight": "bold",
                //     "color": "red"
                // });
                $(".state2").hide();
                $(".state4").text("Wrong user name or password").addClass('state3');
            } else {
                top.location.href = "/index.html";
            }

        }
    });
}