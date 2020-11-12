$(function() {
    var data = {
        "jsonrpc": "2.0",
        "method": "lte_get_status",
        "params": {},
        "id": "9.1"
    }
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            console.log(res.result)
            var json = res.result;
            // if (json.moblie_data == -1 || json.roam_data == -1) {
            //     //alert(1)
            //     $("#mobileData").prop("checked", false);
            //     var mobileData = $("#mobileData .layui-form-switch");
            //     mobileData.find("em").text("OFF");
            //     mobileData.prop("class", "layui-unselect layui-form-switch");

            //     $("#DataRoaming").prop("checked", false);
            //     var dataRoaming = $("#DataRoaming .layui-form-switch");
            //     dataRoaming.find("em").text("OFF");
            //     dataRoaming.prop("class", "layui-unselect layui-form-switch");
            //     //layer.msg("状态修改成功");
            //     // $("#onoff").prop("checked", false);
            //     // var o = $(".layui-form-switch");
            //     // o.find("em").text("OFF");
            //     // o.prop("class", "layui-unselect layui-form-switch");
            //     // active.reload();
            // }
            if (json.moblie_data == 1 || json.roam_data == 1) {
                $("#mobileData").prop("checked", true);
                var mobileData = $("#mobileData .layui-form-switch");
                mobileData.find("em").text("ON");
                mobileData.prop("class", "layui-unselect layui-form-switch layui-form-onswitch");

                $("#DataRoaming").prop("checked", true);
                var dataRoaming = $("#DataRoaming .layui-form-switch");
                dataRoaming.find("em").text("ON");
                dataRoaming.prop("class", "layui-unselect layui-form-switch layui-form-onswitch");
            } else {
                //alert(2)
                $("#mobileData").prop("checked", false);
                var mobileData = $("#mobileData .layui-form-switch");
                mobileData.find("em").text("OFF");
                mobileData.prop("class", "layui-unselect layui-form-switch");

                $("#DataRoaming").prop("checked", false);
                var dataRoaming = $("#DataRoaming .layui-form-switch");
                dataRoaming.find("em").text("OFF");
                dataRoaming.prop("class", "layui-unselect layui-form-switch");
                //layer.msg(data);
                // $("#onoff").prop("checked", true);
                // var o = $(".layui-form-switch");
                // o.find("em").text("ON");
                // o.prop("class", "layui-unselect layui-form-switch layui-form-onswitch");
            }
            var json = res.result;

            if (json == '' || json == undefined || json == null || json.length < 1) return;

            if (json.moblie_data == 1 && json.roam_data == 1 && json.auo_switch == 1) {

                $('#provider1').text(json.sim[0].provider);
                $('#sim_imsi1').text(json.sim[0].imsi);
                $('#sim_tele_num1').text(json.sim[0].phonenum);
                $('#sim_puk_num1').text(json.sim[0].pincode);

                $('#provider2').text(json.sim[1].provider);
                $('#sim_imsi2').text(json.sim[1].imsi);
                $('#sim_tele_num2').text(json.sim[1].phonenum);
                $('#sim_puk_num2').text(json.sim[1].pincode);

            }
            var SIMArr = ['SIM1', 'SIM2'];
            if (json.active_sim == 1) {
                $('#SIM option:selected').text(SIMArr[0]);
                $('#SIM option[value=0]').attr("selected", "selected");

                //console.log('SIM1')
            } else {
                $('#SIM option:selected').text(SIMArr[1]);
                $('#SIM option[value=1]').attr("selected", "selected");
                //console.log('SIM2')
            }


        },
        error: function(jqXHR) {
            alert("An error occurred：" + jqXHR.status);

        }
    });

});