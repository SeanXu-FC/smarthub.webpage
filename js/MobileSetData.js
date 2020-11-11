$(function() {
    //console.log($('#date input[type="text"]').eq(0).val())
    $('.formonth').change(function() {
        console.log($('.formonth option').val())
    });
    save = function() {

        layui.use(['form'], function() {

            var form = layui.form;

            var serverStatus = 1;

            if (serverStatus) {
                data.elem.checked = checked;
            } else {
                data.elem.checked = !checked;
            }
            form.render();

            var data = {
                "jsonrpc": "2.0",
                "method": "lte_set_status",
                "params": {
                    "moblie_data": $('#mobileData').val(),
                    "roam_data": $('#DataRoaming').val(),
                    "active_sim": 1,
                    "auto_switch": $('#AutoSim').val(),
                    "sim": [{
                            "sim_id": 0,
                            "monthly_data_limit_flag": 1,
                            "monthly_data_limit": 9800,
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
                            "monthly_data_limit": 690,
                            "sim_data_limt_unit": 0,
                            "start_date": "2020-11-04",
                            "last_month": 12,
                            "usage_reminder_flag": 1,
                            "sim_data_limt": $('#dataLimit input[type="text"]').eq(0).val(),
                            "rule_weak_signal": $('#tab-content1 input[type="checkbox"]').eq(0).val(),
                            "rule_dlimit": $('#tab-content1 input[type="checkbox"]').eq(1).val(),
                            "rule_roamming": $('#tab-content1 input[type="checkbox"]').eq(2).val(),
                            "rule_noservice": $('#tab-content1 input[type="checkbox"]').eq(3).val(),
                            "pinlock": 0,
                            "pincode": 0,
                            "apn": []
                        }
                    ]
                },
                "id": "9.1"
            };

            data = JSON.stringify(data);
            console.log(data);
            //console.log(this.checked)

            $.ajax({
                type: "post",
                url: "/action/action",
                data: data,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function(res) {
                    if (data == "true") {
                        //layer.msg("状态修改成功");
                        // $("#onoff").prop("checked", false);
                        // var o = $(".layui-form-switch");
                        // o.find("em").text("OFF");
                        // o.prop("class", "layui-unselect layui-form-switch");
                        // active.reload();
                    } else {
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


        });





    }
});