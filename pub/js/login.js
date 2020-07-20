$(function() {
    $("#login_btn").click(function() {
        var $userId = $("#userId").val();
        var $pwd = $("#pwd").val();
        if ($userId == "") {
            $("#info-user").text("Account number is empty").css({
                "font-weight": "bold",
                "color": "red"
            });
            event.preventDefault();
        } else if ($pwd == "") {
            $("#info-pass").text("The password is empty").css({
                "font-weight": "bold",
                "color": "red"
            });
            event.preventDefault();
        } else {

            $.ajax({
                url: "/action/login",
                type: "post",
                data: {
                    username: $userId.val(),
                    password: $pwd.val()
                },
                cache: false,
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
                        alert("Login successful");
                    }

                }
            });
        }
    });
})