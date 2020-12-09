$(function() {
    //console.log($('#date input[type="text"]').eq(0).val())
    // $('.formonth').change(function() {
    //     console.log($('.formonth option').val())
    // });

    $("#btn_saved1").on("click", function() {
        saveDatausage();
    })
    $("#btn_saved2").on("click", function() {
        saveSIMmanagement();
    })

});

function saveDatausage() {
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

    //console.log(this.checked)
    //var mobileDataOnoff = [0, 1];
    $.ajax({
        type: "post",
        url: "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            //console.log(data);
            if (data == "true") {
                alert(1)
                    // $("#mobileData").prop("checked", true);
                    // var mobileData = $("#mobileData .layui-form-switch");
                    // mobileData.find("em").text("ON");
                    // mobileData.prop("class", "layui-unselect layui-form-switch layui-form-onswitch");

                // $("#DataRoaming").prop("checked", false);
                // var dataRoaming = $("#DataRoaming .layui-form-switch");
                // dataRoaming.find("em").text("ON");
                // dataRoaming.prop("class", "layui-unselect layui-form-switch layui-form-onswitch");
                //layer.msg("状态修改成功");
                // $("#onoff").prop("checked", false);
                // var o = $(".layui-form-switch");
                // o.find("em").text("OFF");
                // o.prop("class", "layui-unselect layui-form-switch");
                // active.reload();
            } else {
                alert(2)

                // $("#mobileData").prop("checked", true);
                // var mobileData = $("#mobileData .layui-form-switch");
                // mobileData.find("em").text("ON");
                // mobileData.prop("class", "layui-unselect layui-form-switch layui-form-onswitch");
                // $("#DataRoaming").prop("checked", true);
                // var dataRoaming = $("#DataRoaming .layui-form-switch");
                // dataRoaming.find("em").text("ON");
                // dataRoaming.prop("class", "layui-unselect layui-form-switch layui-form-onswitch");
                // $("#DataRoaming").prop("checked", false);
                // var dataRoaming = $("#DataRoaming .layui-form-switch");
                // dataRoaming.find("em").text("OFF");
                // dataRoaming.prop("class", "layui-unselect layui-form-switch");
                //layer.msg(data);
                // $("#onoff").prop("checked", true);
                // var o = $(".layui-form-switch");
                // o.find("em").text("ON");
                // o.prop("class", "layui-unselect layui-form-switch layui-form-onswitch");
            }

        },
        error: function(jqXHR) {
            alert("An error occurred：" + jqXHR.status);

        }
    });
}

function saveSIMmanagement() {

}