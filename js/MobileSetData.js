$(function() {
    // 按钮禁掉和灰掉
    $(".connected button").prop("disabled", true);
    $(".connected button").css("opacity", "0.5");


    $('#pwd,#pwd2,#pwd3').bind("keyup", function() {
        var reg = reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{6,19}$/;
        var val = reg.test($('#pwd').val());
        var val2 = reg.test($('#pwd2').val());
        var val3 = reg.test($('#pwd3').val());
        var len = $('#pwd').val().length;
        var len2 = $('#pwd2').val().length;
        var len3 = $('#pwd3').val().length;
        if (len <= 6 || len >= 16 || val == "" || val == null) {
            $("#OK_btn").attr("disabled", "true");
            $("#OK_btn").css("opacity", "0.5");
        } else {
            $("#OK_btn").removeAttr("disabled");
            $("#OK_btn").css("opacity", "1");
        }
        if (len2 <= 6 || len2 >= 16 || val2 == "" || val2 == null) {
            $("#OK_btn").attr("disabled", "true");
            $("#OK_btn").css("opacity", "0.5");
        } else {
            $("#OK_btn").removeAttr("disabled");
            $("#OK_btn").css("opacity", "1");
        }
        if (len3 <= 6 || len3 >= 16 || val3 == "" || val3 == null) {
            $("#OK_btn").attr("disabled", "true");
            $("#OK_btn").css("opacity", "0.5");
        } else {
            $("#OK_btn").removeAttr("disabled");
            $("#OK_btn").css("opacity", "1");
        }
        var oPwd2 = $('#pwd2').val();
        var oPwd3 = $('#pwd3').val();
        if (oPwd2 != oPwd3) {
            $("#tip").show();
            $("#tip").text("Passwords don't match"); //两次输入的密码不一致！
            $("#tip").css({
                "color": "red",
                "fontWeight": "normal"
            });
        } else {
            $("#tip").hide();
        }
    });

    $('#cancel').click(function() {
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index); //关闭当前页
    });

    // show
    var isShow = true;

    change = function() {
        var type = $("#pwd").attr("type");
        if (type == "text") {
            $("#pwd").attr("type", "password");
        } else {
            $("#pwd").attr("type", "text");
        }
    };
    change2 = function() {
        var type = $("#pwd2").attr("type");
        if (type == "text") {
            $("#pwd2").attr("type", "password");
        } else {
            $("#pwd2").attr("type", "text");
        }
    };
    change3 = function() {
        var type = $("#pwd3").attr("type");
        if (type == "text") {
            $("#pwd3").attr("type", "password");
        } else {
            $("#pwd3").attr("type", "text");
        }
    };

    $("#OK_btn").on("click", function() {
        saveChangePin();
    })
});

function saveChangePin() {
    var pin1 = $("#pwd").val();
    var pin2 = $("#pwd2").val();
    var pin3 = $("#pwd3").val();
    var data = {
        "jsonrpc": "2.0",
        "method": "lte_set_status",
        "params": {
            "moblie_data": 1,
            "roam_data": 1,
            "active_sim": 1,
            "auto_switch": 1,
            "sim": [{
                    "sim_id": 0,
                    "monthly_data_limit_flag": 1,
                    "monthly_data_limit": 9800000,
                    "sim_data_limt_unit": 1,
                    "start_date": "2020-09-04",
                    "last_month": 2,
                    "usage_reminder_flag": 1,
                    "rule_weak_signal": 1,
                    "rule_dlimit": 1,
                    "rule_roamming": 1,
                    "rule_noservice": 1,
                    "pincode": 100,
                    "apn": []
                },
                {
                    "sim_id": 1,
                    "monthly_data_limit_flag": 1,
                    "monthly_data_limit": 800000090,
                    "sim_data_limt_unit": 0,
                    "start_date": "2020-11-04",
                    "last_month": 12,
                    "usage_reminder_flag": 1,
                    "sim_data_limt": 1024000,
                    "rule_weak_signal": 1,
                    "rule_dlimit": 1,
                    "rule_roamming": 1,
                    "rule_noservice": 1,
                    "pinlock": 0,
                    "pincode": 0,
                    "apn": []
                }
            ]
        },
        "id": "9.1"
    };

    data = JSON.stringify(data);

    $.ajax({
        type: "post",
        url: "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            if (res.result) {
                //layer.msg(res.result.status);
            } else if (res.error) {
                layer.msg("An error occurred：" + res.error.message);
            }

        },
        error: function(jqXHR) {
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);

        }
    });
}