document.onkeydown = function(e) {
    var theEvent = window.event || e;
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == 13) {
        login();
    }
}

$("#login_btn").click(function() {
    login();
});

function showTips(id, info) {
    document.getElementById(id + "span").innerHTML = "<span style=\"color:#f00;\">" + info + "</span>"
}

function checkUser(id, info) {
    //1.Get the user name data entered by the user
    var uValue = document.getElementById(id).value;
    //2.To test the efficacy
    if (uValue == "") {
        document.getElementById(id + "span").innerHTML = "<span style=\"color:#f00\">" + info + "</span>"
    } else {
        document.getElementById(id + "span").innerHTML = ""
    }
}

function login() {
    var $userId = $("#userId");
    var $pwd = $("#pwd");
    if ($userId.val() == "") {
        showTips(id, info);
        checkUser(id, info);
    } else if ($pwd.val() == "") {
        showTips(id, info);
        checkUser(id, info);
    } else {

        $.ajax({
            url: "/action/login",
            type: "post",
            data: $('#loginInfo').serialize(),
            dataType: "json",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            success: function(res) {
                if (res.result.login == "0") {
                    $userId.next().text("Wrong user name or password").css({
                        "font-weight": "bold",
                        "color": "red"
                    });
                    $pwd.next().text("Wrong user name or password").css({
                        "font-weight": "bold",
                        "color": "red"
                    });
                } else {
                    top.location.href = "/index.html";
                }

            }
        });
    }
}