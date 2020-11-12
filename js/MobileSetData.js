$(function() {
    //console.log($('#date input[type="text"]').eq(0).val())
    // $('.formonth').change(function() {
    //     console.log($('.formonth option').val())
    // });
    save = function() {

        var data = {
            "jsonrpc": "2.0",
            "method": "lte_set_status",
            "result": {
                "sta_info": []
            },
            "id": "9.1"
        };

        data = JSON.stringify(data);

        //console.log(this.checked)

        $.ajax({
            type: "post",
            url: "/action/action",
            data: data,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function(res) {

                if (data == "true") {
                    //alert(1)
                    $("#mobileData").prop("checked", true);
                    var mobileData = $("#mobileData .layui-form-switch");
                    mobileData.find("em").text("ON");
                    mobileData.prop("class", "layui-unselect layui-form-switch layui-form-onswitch");

                    $("#DataRoaming").prop("checked", false);
                    var dataRoaming = $("#DataRoaming .layui-form-switch");
                    dataRoaming.find("em").text("ON");
                    dataRoaming.prop("class", "layui-unselect layui-form-switch layui-form-onswitch");
                    //layer.msg("状态修改成功");
                    // $("#onoff").prop("checked", false);
                    // var o = $(".layui-form-switch");
                    // o.find("em").text("OFF");
                    // o.prop("class", "layui-unselect layui-form-switch");
                    // active.reload();
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

            },
            error: function(jqXHR) {
                alert("An error occurred：" + jqXHR.status);

            }
        });








    }
});