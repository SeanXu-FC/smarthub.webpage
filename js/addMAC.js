$(function() {
    layui.use(['layer', 'form'], function() {
        var form = layui.form,
            layer = layui.layer;

        getMACData(layer, form, "", 0)
    });
    $("#start_btn1").on("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        layui.use(['layer', 'form'], function() {
            var form = layui.form,
                layer = layui.layer;
            setMACData(layer, form);
        });
    })
})

function getMACData(layer, form, loading, flag) {
    var data = {
        "jsonrpc": "2.0",
        "method": "Factory_SetSnAndMac",
        "params": {
            mode: 1 // 查询
        },
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
            if (res.result) {
                var sn_value = res.result.sn_value.substring(0, 8);
                $("#Device_SN_i").val(sn_value);
                $("#ImxMac_Adress_i").val(res.result.addr1_value);
                $("#QCA_WANaddress_i").val(res.result.addr2_value);
                $("#QCA_WLANAddress_i").val(res.result.addr3_value);
                $("#SN_MAC_status").text(res.result.sn == 1 ? "已写/成功" : '失败');
                $("#ImxMac_Adress_status").text(res.result.mac_addr1 == 1 ? "已写/成功" : '未写/失败');
                $("#QCA_WANaddress_status").text(res.result.mac_addr2 == 1 ? "已写/成功" : '未写/失败');
                $("#QCA_WLANAddress_status").text(res.result.mac_addr3 == 1 ? "已写/成功" : '未写/失败');
                if (res.result.sn == 1) {
                    $("#Device_SN").attr("disabled", "disabled");
                } else {
                    $("#Device_SN").removeAttr("disabled");
                }
                if (res.result.mac_addr1 == 1) {
                    $("#ImxMac_Adress").attr("disabled", "disabled");
                } else {
                    $("#ImxMac_Adress").removeAttr("disabled");
                }
                if (res.result.mac_addr2 == 1) {
                    $("#QCA_WANaddress").attr("disabled", "disabled");
                } else {
                    $("#QCA_WANaddress").removeAttr("disabled");
                }
                if (res.result.mac_addr3 == 1) {
                    $("#QCA_WLANAddress").attr("disabled", "disabled");
                } else {
                    $("#QCA_WLANAddress").removeAttr("disabled");
                }
                form.render("checkbox");

                if (res.result.status == 1) {
                    $("#start_btn1").attr("disabled", "disabled");
                } else if (res.result.status == 0) {
                    parent.layer.close(loading);
                    clearInterval(timer);
                    $("#start_btn1").removeAttr("disabled");
                    layer.msg("通信异常");
                } else if (res.result.status == 2) {
                    parent.layer.close(loading);
                    clearInterval(timer);
                    $("#start_btn1").removeAttr("disabled");
                    if (flag == 1) {
                        layer.msg("操作成功");
                    }

                }

            } else if (res.error) {
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("An error occurred：" + res.error.message);
                })
            }

        },
        error: function(jqXHR) {
            layer.close(loading);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    })
}
var timer = null;

function setMACData(layer, form) {
    $("#start_btn1").attr("disabled", "disabled");
    var loading = parent.layer.load(0, {
        shade: [0.5, '#fff']
    });
    var param = { mode: 0, };
    // if ($("#Device_SN").attr("disabled") != "disabled") {
    //     param.sn = $("#Device_SN_i").val() ? $("#Device_SN_i").val() : "";
    // }
    // if ($("#ImxMac_Adress").attr("disabled") != "disabled") {
    //     param.mac_addr1 = $("#ImxMac_Adress_i").val() ? $("#ImxMac_Adress_i").val() : "";
    // }
    // if ($("#QCA_WANaddress").attr("disabled") != "disabled") {
    //     param.mac_addr2 = $("#QCA_WANaddress_i").val() ? $("#QCA_WANaddress_i").val() : "";
    // }
    // if ($("#QCA_WLANAddress").attr("disabled") != "disabled") {
    //     param.mac_addr3 = $("#QCA_WLANAddress_i").val() ? $("#QCA_WLANAddress_i").val() : "";
    // }
    param = {
        mode: 0,
        "sn": $("#Device_SN_i").val() ? $("#Device_SN_i").val() : "",
        "mac_addr1": $("#ImxMac_Adress_i").val() ? $("#ImxMac_Adress_i").val() : "",
        "mac_addr2": $("#QCA_WANaddress_i").val() ? $("#QCA_WANaddress_i").val() : "",
        "mac_addr3": $("#QCA_WLANAddress_i").val() ? $("#QCA_WLANAddress_i").val() : ""
    }
    console.log(param)
    if ($("#Device_SN").attr("disabled") == "disabled")
        var data = {
            "jsonrpc": "2.0",
            "method": "Factory_SetSnAndMac",
            "params": param,
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
            if (res.result) {
                if (res.result.status == 1) {
                    timer = setInterval(function() {
                        layui.use(['layer', 'form'], function() {
                            var form = layui.form,
                                layer = layui.layer;
                            getMACData(layer, form, loading, 1)
                        });
                    }, 3000)
                } else if (res.result.status == 0) {
                    parent.layer.close(loading);
                    clearInterval(timer);
                    $("#start_btn1").removeAttr("disabled");
                    layer.msg("通信异常");
                } else if (res.result.status == 2) {
                    parent.layer.close(loading);
                    clearInterval(timer);
                    $("#start_btn1").removeAttr("disabled");
                    layer.msg("操作成功");
                }
            } else if (res.error) {
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("An error occurred：" + res.error.message);
                })
            }

        },
        error: function(jqXHR) {
            $("#start_btn1").removeAttr("disabled");
            parent.layer.close(loading);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    })
}