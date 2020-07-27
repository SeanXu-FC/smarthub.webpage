$("#login_btn").click(function() {
    var $userId = $("#userId");
    var $pwd = $("#pwd");
    if ($userId.val() == "") {
        $userId.next().text("Account number is empty").css({
            "font-weight": "bold",
            "color": "red"
        });
        event.preventDefault();
    } else if ($pwd.val() == "") {
        $pwd.next().text("The password is empty").css({
            "font-weight": "bold",
            "color": "red"
        });
        event.preventDefault();
    } else {

        $.ajax({
            url: "/action/login",
            type: "post",
            data: $('#loginInfo').serialize(),
            dataType: "json",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            //         data: {
            //             username: $userId.val(),
            //             password: $pwd.val()
            //         },
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
                    //	window.location.href = "/index.html";
                    top.location.href = "/index.html";
                }

            }
        });
    }
});