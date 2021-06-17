document.onkeydown = function(e) {
    var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        var len1 = $('input[name="username"]').val().length;
        var len2 = $('input[name="password"]').val().length;
        if ((len1 >= 5 && len1 <= 20) && (len2 >= 6 && len2 <= 20)) {
            login();
        }

    }
}
$(function() {

    var username = false;
    var password = false;
    var repassword = false;
    var email = false;
    //username
    $('input[name="username"]').keyup(function() {
        var len = $(this).val().length;
        if (len >= 5 && len <= 20 && $(this).val() != '') {
            username = true;
            var len1 = $('input[name="password"]').val().length;
            if (len1 >= 6 && len1 <= 20) {
                $("#login_btn").removeAttr("disabled");
            }
        } else {
            $("#login_btn").attr("disabled", "disabled");
        }
    })

    //password
    $('input[name="password"]').keyup(function() {
        // var reg = /^[a-z | A-Z]\w{5,19}$/; //以字母开头，5-19位               
        //var reg = /^\w{6,19}$/;
        var reg = /^[\da-zA-Z!@#$%|+-^&*.~]{6,64}$/; //数字、字母、特殊字符
        if (reg.test($(this).val())) {
            password = true;
            var len = $('input[name="username"]').val().length;
            if (len >= 5 && len <= 20) {
                $("#login_btn").removeAttr("disabled");
            }
        } else {
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
                $("#passwordspan").text("Wrong user name or password")
            } else {
                var domain = window.location.host;
                //  str = ('https:' == document.location.protocol ? 'https://' :
                //     'http://') + domain + "/index.html";
                top.location.href = ('https:' == document.location.protocol ? 'https://' :
                    'http://') + domain + "/index.html";
            }

        }
    });
}
//限制输入中文和字节输入长度
function WidthCheckIO(str, maxLen) {
    var w = 0;
    var tempCount = 0;

    str.value = str.value.replace(/[^\x00-\xff]+/g, '');
    str.value = str.value.replace(/(^\s*)/g, "");
    //length 获取字数数
    for (var i = 0; i < str.value.length; i++) {
        //charCodeAt()获取字符串中某一个字符的编码 
        var c = str.value.charCodeAt(i);
        //单字节加1 
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            w++;
        } else {
            w += 2;
        }
        if (w > maxLen) {
            str.value = str.value.substr(0, i);
            break;
        }
    }
}