$(function() {
    // 按钮禁掉和灰掉
    $(".Change-password").prop("disabled", true);
    $(".Change-password").css("opacity", "0.5");

    var isShow = true;

    change = function() {
        var v = $("#pwd").get(0);
        if (isShow) {
            v.type = "text";
            isShow = false;
        } else {
            v.type = "password";
            isShow = true;
        }
    };
    change2 = function() {
        var v2 = $("#pwd2").get(0);
        if (isShow) {
            v2.type = "text";
            isShow = false;
        } else {
            v2.type = "password";
            isShow = true;
        }
    };
    change3 = function() {
        var v3 = $("#pwd3").get(0);
        if (isShow) {
            v3.type = "text";
            isShow = false;
        } else {
            v3.type = "password";
            isShow = true;
        }
    };
    change();
    change2();
    change3();


    $('#pwd,#pwd2,#pwd3').bind("keyup", function() {
        var reg = reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,100}$/;
        var val = reg.test($('#pwd').val());
        var val2 = reg.test($('#pwd2').val());
        var val3 = reg.test($('#pwd3').val());
        var len = $('#pwd').val().length;
        var len2 = $('#pwd2').val().length;
        var len3 = $('#pwd3').val().length;
        if (len <= 8 || val == "" || val == null) {
            $("#btn").attr("disabled", "true");
            $("#btn").css("opacity", "0.5");
        } else {
            $("#btn").removeAttr("disabled");
            $("#btn").css("opacity", "1");
        }
        if (len2 <= 8 || val2 == "" || val2 == null) {
            $("#btn").attr("disabled", "true");
            $("#btn").css("opacity", "0.5");
        } else {
            $("#btn").removeAttr("disabled");
            $("#btn").css("opacity", "1");
        }
        if (len3 <= 8 || val3 == "" || val3 == null) {
            $("#btn").attr("disabled", "true");
            $("#btn").css("opacity", "0.5");
        } else {
            $("#btn").removeAttr("disabled");
            $("#btn").css("opacity", "1");

        }

        var oPwd2 = document.getElementById("pwd2").value;
        var oPwd3 = document.getElementById("pwd3").value;
        if (oPwd2 != oPwd3) {
            $("#tip").show();
            $("#tip").text("Passwords don't match"); //两次输入的密码不一致！
            $("#tip").css({
                "color": "red",
                "fontWeight": "normal"
            });

            return false;

        } else {
            $("#tip").text('Passwords match'); //两次输入的密码一致！
            $("#tip").css({
                "color": "green",
                "fontWeight": "bold"
            });
            if (8 <= len3) {
                console.log(len3)
                $("#btn").removeAttr("disabled");
                $("#btn").css("opacity", "1");
            }

            return false;
        }
    });

    $('#btn').on('click', function() {
        console.log($('#chagePWD').serialize())

        $.ajax({
            url: "/proxy/action/password",
            type: "post",
            data: $('#chagePWD').serialize(),
            //data: "username=admin&password=123456",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            success: function(res) {
                if (res.result.login == "0") {
                    // $userId.next().text("Wrong user name or password").css({
                    //     "font-weight": "bold",
                    //     "color": "red"
                    // });
                    $(".state2").hide();
                    $(".state4").text("Wrong user name or password").addClass('state3');
                } else {
                    $('#success').show(1000);
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

    } else if (oPwd2.length >= 8) {
        sp2.innerHTML = "";

        var mmzz1 = /^[0-9]{8,100}$|^[a-zA-Z]{8,100}$/; //较弱：全是数字或全是字母 6-16个字符

        var mmzz2 = /^[A-Za-z0-9]{8,100}$/; //中级：数字、26个英文字母 6-16个字符

        var mmzz3 = /^[\da-zA-Z!@#$%|+-^&*.~]{8,100}$/; //较高：由数字、26个英文字母或者下划线组成的字符串 6-16个字符^[\da-zA-Z!@#$%^&*]*$

        if (oPwd2.match(mmzz1)) {
            sp2.innerHTML = "Password strength: <span style='color: #ff002a;'>Weak</span>"; //密码等级'较弱'，建议字母+数字 Password level 'weak', letter + number is recommended

        } else if (oPwd2.match(mmzz2)) {
            sp2.innerHTML = "Password strength:<span style='color: #f69c00;'>Fair</span>"; //密码等级'中等'，建议字母+数字+特殊符 Password level 'medium', letters + numbers + special characters are recommended

        } else if (oPwd2.match(mmzz3)) {
            sp2.innerHTML = "Password strength: <span style='color: #26b167;'>Strong</span>"; //密码等级'较强'

        } else {
            sp2.innerHTML = "Password strength: <span style='color: #26b167;'>Strong</span>"; //密码等级'较强'
        }
        console.log(sp2.innerHTML)

    }
}

function check3() {
    var oPwd3 = $("#pwd3").val();
    if (oPwd3.length < 8) {
        $("#tip").text('Password too short'); //两次输入的密码一致！
        $("#tip").css({
            "color": "#5d5d5d",
            "fontWeight": "bold"
        });
    }

}