$(function() {
    // 按钮禁掉和灰掉
    $(".Change-password").prop("disabled", true);
    $(".Change-password").css("opacity", "0.5");


    var isShow;
    $(".SHOW1").on("click", function() {
        isShow = $("#pwd").attr("type");
        if (isShow == "text") {
            $("#pwd").attr("type", "password");
            $(this).text("SHOW");
        } else {
            $("#pwd").attr("type", "text");
            $(this).text("HIDE");
        }
    })
    $(".SHOW2").on("click", function() {
        isShow = $("#pwd2").attr("type");
        if (isShow == "text") {
            $("#pwd2").attr("type", "password");
            $(this).text("SHOW");
        } else {
            $("#pwd2").attr("type", "text");
            $(this).text("HIDE");
        }
    })
    $(".SHOW3").on("click", function() {
        isShow = $("#pwd3").attr("type");
        if (isShow == "text") {
            $("#pwd3").attr("type", "password");
            $(this).text("SHOW");
        } else {
            $("#pwd3").attr("type", "text");
            $(this).text("HIDE");
        }
    })


    $('#pwd,#pwd2,#pwd3').bind("keyup", function() {
        var reg = reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,64}$/;

        var oPwd2 = document.getElementById("pwd2").value;
        var oPwd3 = document.getElementById("pwd3").value;
        var len = $('#pwd').val().length;
        var len2 = $('#pwd2').val().length;
        var len3 = $('#pwd3').val().length;
        if (8 <= len && len <= 64) {
            $("#btn").removeAttr("disabled");
            $("#btn").css("opacity", "1");
        } else {
            $("#btn").attr("disabled", "true");
            $("#btn").css("opacity", "0.5");
            return false;
        }

        if (oPwd2 != oPwd3) {
            $("#tip").show();
            $("#tip").text("Passwords don't match"); //两次输入的密码不一致！
            $("#tip").css({
                "color": "#ff002a",
                "fontWeight": "normal"
            });
            $("#btn").attr("disabled", "true");
            $("#btn").css("opacity", "0.5");
            return false;

        } else {
            $("#tip").text('Passwords match');
            $("#tip").css({
                "color": "#26b167",
                "fontWeight": "normal"
            });
        }
        if (8 <= len3 && len3 <= 64) {
            $("#btn").removeAttr("disabled");
            $("#btn").css("opacity", "1");
        } else {
            $("#btn").attr("disabled", "true");
            $("#btn").css("opacity", "0.5");
            $("#tip").text('Password too short'); //长度太短，为了显示这个len3判断提前len2
            $("#tip").css({
                "color": "#909090",
                "fontWeight": "normal"
            });
            return false;
        }
        if (8 <= len2 && len2 <= 64) {
            $("#btn").removeAttr("disabled");
            $("#btn").css("opacity", "1");
        } else {
            $("#btn").attr("disabled", "true");
            $("#btn").css("opacity", "0.5");
            return false;
        }

    });

    $('#btn').on('click', function() {

        $.ajax({
            url: "/action/password",
            type: "post",
            data: $('#chagePWD').serialize(),
            //data: "username=admin&password=123456",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            success: function(res) {
                if (res.result && res.result.flag == "0") {
                    $("#current_pass_e").text("Password is incorrect").addClass('state3');
                } else {
                    $('#success').show(1000);
                    clearCookie("LogInStaus");
                    var RememberPassword = JSON.parse(localStorage.getItem("RememberPassword"));
                    if (RememberPassword && RememberPassword.status) {
                        RememberOBJ = {
                            status: true,
                            password: $("#pwd3").val()
                        }
                        RememberOBJ = JSON.stringify(RememberOBJ)
                        localStorage.setItem("RememberPassword", RememberOBJ)
                    }
                    setTimeout(() => {
                        top.location.href = "/index.html";
                    }, 3000);
                }

            }
        });
    })

})


function check2() {

    var oPwd2 = document.getElementById("pwd2").value;

    var sp2 = document.getElementById("myspan2");

    if (oPwd2.length == 0 || oPwd2.length == null) {

        sp2.innerHTML = "<span style='color: #ff002a;'>Password cannot be empty</span>"; //密码不能为空

    } else if (oPwd2.length < 8) {

        sp2.innerHTML = "Password strength: <span style='color: #909090;'>Too short</span>"; //密码不能小于6个字符 The password cannot be less than 6 characters

    } else if (8 <= oPwd2.length && oPwd2.length <= 10) {
        sp2.innerHTML = "";
        sp2.innerHTML = "Password strength: <span style='color: #ff002a;'>Weak</span>"; //密码等级'较弱'，建议字母+数字 Password level 'weak', letter + number is recommended
        // var mmzz1 = /^[0-9]{8,100}$|^[a-zA-Z]{8,64}$/; //较弱：全是数字或全是字母 6-16个字符

        // var mmzz2 = /^[A-Za-z0-9]{8,64}$/; //中级：数字、26个英文字母 6-16个字符

        // var mmzz3 = /^[\da-zA-Z!@#$%|+-^&*.~]{8,64}$/; //较高：由数字、26个英文字母或者下划线组成的字符串 6-16个字符^[\da-zA-Z!@#$%^&*]*$

        // if (oPwd2.match(mmzz1)) {
        //     sp2.innerHTML = "Password strength: <span style='color: #ff002a;'>Weak</span>"; //密码等级'较弱'，建议字母+数字 Password level 'weak', letter + number is recommended

        // } else if (oPwd2.match(mmzz2)) {
        //     sp2.innerHTML = "Password strength:<span style='color: #f69c00;'>Fair</span>"; //密码等级'中等'，建议字母+数字+特殊符 Password level 'medium', letters + numbers + special characters are recommended

        // } else if (oPwd2.match(mmzz3)) {
        //     sp2.innerHTML = "Password strength: <span style='color: #26b167;'>Strong</span>"; //密码等级'较强'

        // }

    } else if (10 < oPwd2.length && oPwd2.length <= 13) {
        sp2.innerHTML = "Password strength:<span style='color: #f69c00;'>Fair</span>"; //密码等级'中等'，建议字母+数字+特殊符 Password level 'medium', letters + numbers + special characters are recommended
    } else if (13 < oPwd2.length && oPwd2.length <= 64) {
        sp2.innerHTML = "Password strength: <span style='color: #26b167;'>Strong</span>"; //密码等级'较强'
    }
}