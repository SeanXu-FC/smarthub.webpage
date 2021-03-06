$(function() {
    layui.use(['layer', 'form'], function() {
        var form = layui.form,
            layer = layui.layer;
        getMACData(layer, form, "", 0)
    });

    $("#Device_SN_i").bind("input", function() {
        startGetMAC();
    })


    // var element = document.getElementById("toExcel")
    // element.onclick = toExcel;

    $("#exportToPdf1").on("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        $('body,html').animate({
            'scrollTop': 0
        }, 0);
        $(".Rectangle-1182").hide();
        setTimeout(() => {
            exportPdf();
        }, 500);

    })
    $(".item-title").on("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        var attr = $(this).siblings().css('display');
        if (attr == "none") {
            $(this).siblings().show();
            $(this).find("img").attr("src", "images/icon-arrow-down-1.png")
        } else {
            $(this).siblings().hide();
            $(this).find("img").attr("src", "images/icon-arrow-right.png")
        }
    })
    $("#LTE_Start").on("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).attr("disabled", "disabled");
        layui.use(['layer'], function() {
            var layer = layui.layer;
            getLTEdata(layer, 0);
        });
    })
    $("#LAN_Start").on("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).attr("disabled", "disabled");
        layui.use(['layer'], function() {
            var layer = layui.layer;
            getLANdata(layer);
        });
    })
    $("#Location_Start").on("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).attr("disabled", "disabled");
        layui.use(['layer'], function() {
            var layer = layui.layer;
            getLocationdata(layer);
        });
    })
    $("#INP_Start").on("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).attr("disabled", "disabled");
        layui.use(['layer'], function() {
            var layer = layui.layer;
            getIOdata(layer);
        });
    })
    $("#CAN_Start").on("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).attr("disabled", "disabled");
        layui.use(['layer'], function() {
            var layer = layui.layer;
            getAPdata(1);
        });
    })
    $("#AP_Start").on("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).attr("disabled", "disabled");
        layui.use(['layer'], function() {
            var layer = layui.layer;
            getAPdata(0);
        });
    })
    $("#Station_Start").on("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).attr("disabled", "disabled");
        layui.use(['layer'], function() {
            var layer = layui.layer;
            getStationdata();
        });
    })
    getStationdata();
    getAPdata(0);
})
var SNlen = 7;

function startGetMAC() {
    SNlen = $("#SN_select").val();

    if ($("#Device_SN_i").val().length == SNlen) {


        var ImxMac_Adress = $("#ImxMac_Adress_i").val();
        var QCA_WANaddress = $("#QCA_WANaddress_i").val();
        var QCA_WLANAddress = $("#QCA_WANaddress_i").val();
        if (!(ImxMac_Adress || QCA_WANaddress || QCA_WLANAddress)) {
            layui.use(['layer', 'form'], function() {
                var form = layui.form,
                    layer = layui.layer;
                getMacAddr(layer);
            });
        } else {
            layui.use(['form', 'layer'], function() {
                var layer = layui.layer;
                layer.msg("不能重复获取MAC地址！");
            })
        }
    }
}

//插入：号
function sertStr(soure, start, newStr) {
    soure = insertStr(soure, 2, ":")
    soure = insertStr(soure, 5, ":")
    soure = insertStr(soure, 8, ":")
    soure = insertStr(soure, 11, ":")
    soure = insertStr(soure, 14, ":")
    return soure;
}

function insertStr(soure, start, newStr) {
    return soure.slice(0, start) + newStr + soure.slice(start);
}

//去掉：号
function clearStr(str) {
    str = str.replace(/:/g, ""); //取消字符串中出现的所有逗号 
    return str;
}



//传入SN获取MAC地址
function getMacAddr(layer) {
    var loading = parent.layer.load(0, {
        shade: [0.5, '#fff']
    });
    var Device_SN = $("#Device_SN_i").val();

    var ajaxTimeout = $.ajax({
        url: "http://oa.fastrain.com:9898/macs/getMac",
        type: "get", //get请求方式
        dataType: "jsonp", // 返回的数据类型，设置为JSONP方式
        jsonp: "callback", //设置回调函数名
        timeout: 0,
        //jsonpCallback:"flightHandler",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        data: {
            SN: Device_SN, //前端传参SN
            num: 3 //返回mac个数
        },
        success: function(res) {

            if (res.code == 1) {
                if (res.result.mac_addr1) {
                    res.result.mac_addr1 = sertStr(res.result.mac_addr1);
                    $("#ImxMac_Adress_i").val(res.result.mac_addr1);
                } else {
                    layer.msg("返回数据错误，缺少Imx MacAdress");
                }
                if (res.result.mac_addr2) {
                    res.result.mac_addr2 = sertStr(res.result.mac_addr2);
                    $("#QCA_WANaddress_i").val(res.result.mac_addr2);
                } else {
                    layer.msg("返回数据错误，缺少QCA_WAN address");
                }
                if (res.result.mac_addr3) {
                    res.result.mac_addr3 = sertStr(res.result.mac_addr3);
                    $("#QCA_WLANAddress_i").val(res.result.mac_addr3);
                } else {
                    layer.msg("返回数据错误，缺少QCA_WLAN Address");
                }
                if (res.result.mac_addr1 && res.result.mac_addr2 && res.result.mac_addr3) {
                    layui.use(['layer', 'form'], function() {
                        var form = layui.form,
                            layer = layui.layer;
                        setMACData(layer, form, loading);
                    });
                }

            } else {
                parent.layer.close(loading);
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("An error occurred：" + res.result.message);
                })
            }
        },
        complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') { //超时,status还有success,error等值的情况
                ajaxTimeout.abort();
            }
        },
        error: function(jqXHR) {
            parent.layer.close(loading);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    });
}
//回传Admin_Password和WIFI_Password
function setPassword(layer, loading) {
    var Device_SN = $("#Device_SN_i").val() ? $("#Device_SN_i").val() : '';
    var ImxMac_Adress = $("#ImxMac_Adress_i").val() ? $("#ImxMac_Adress_i").val() : '';
    var Admin_Password = $("#Admin_Password").text() ? $("#Admin_Password").text() : '';
    var QCA_WLANAddress = $("#QCA_WLANAddress_i").val() ? $("#QCA_WLANAddress_i").val() : '';
    var WIFI_Password = $("#WIFI_Password").text() ? $("#WIFI_Password").text() : '';
    var Qca6174Mac = $("#Qca6174Mac").val();
    ImxMac_Adress = clearStr(ImxMac_Adress);
    QCA_WLANAddress = clearStr(QCA_WLANAddress);
    Qca6174Mac = clearStr(Qca6174Mac);
    if (!Device_SN) {
        parent.layer.close(loading);
        layer.msg("Device SN 不能为空");
        return;
    }
    if (!ImxMac_Adress) {
        parent.layer.close(loading);
        layer.msg("ImxMac Adress 不能为空");
        return;
    }
    if (!Admin_Password) {
        parent.layer.close(loading);
        layer.msg("Admin Password 不能为空");
        return;
    }
    if (!QCA_WLANAddress) {
        parent.layer.close(loading);
        layer.msg("QCA WLANAddress 不能为空");
        return;
    }
    if (!WIFI_Password) {
        parent.layer.close(loading);
        layer.msg("WIFI Password 不能为空");
        return;
    }
    if (!Qca6174Mac) {
        parent.layer.close(loading);
        layer.msg("Qca6174Mac 不能为空");
        return;
    }
    var param = {
        SN: Device_SN,
        AdminMacAddr: ImxMac_Adress,
        AdminPassword: Admin_Password,
        WifiMacAddr: QCA_WLANAddress,
        WifiPassword: WIFI_Password,
        MAC6174: Qca6174Mac,
    }

    var ajaxTimeout1 = $.ajax({
        url: "http://oa.fastrain.com:9898/macs/getMacBack",
        type: "get", //get请求方式
        dataType: "jsonp", // 返回的数据类型，设置为JSONP方式
        jsonp: "callback", //设置回调函数名
        timeout: 0,
        data: {
            SN: Device_SN, //前端传参
            AdminMacAddr: ImxMac_Adress, //生成AdminPassword对应的mac地址
            AdminPassword: Admin_Password,
            WifiMacAddr: QCA_WLANAddress, //生成WifiPassword对应的mac地址
            WifiPassword: WIFI_Password,
            MAC6174: Qca6174Mac,
        },
        success: function(res) {

            parent.layer.close(loading);
            if (res.code == 0) {
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("An error occurred：" + res.result.message);
                })
            } else if (res.code == 1) {
                $("#Device_SN").attr("disabled", "disabled");
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("回传MAC成功！");
                })
            }
        },
        complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') { //超时,status还有success,error等值的情况
                ajaxTimeout1.abort();
            }
        },
        error: function(jqXHR) {
            parent.layer.close(loading);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    });
}
//获取admin password和wifi password地址
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
                if (res.result.status == 1) {
                    $("#start_btn1").attr("disabled", "disabled");
                } else if (res.result.status == 0) {
                    parent.layer.close(loading);
                    clearInterval(timer);
                    $("#start_btn1").removeAttr("disabled");
                    layer.msg("通信异常");
                } else if (res.result.status == 2) {

                    clearInterval(timer);
                    $("#start_btn1").removeAttr("disabled");
                    if (res.result.sn == 1) {
                        $("#Device_SN_i").attr("readonly", true);
                    } else {
                        $("#Device_SN_i").removeAttr("disabled");
                    }

                    if (res.result.sn_value) {
                        var sn_value = res.result.sn_value.substring(0, 8);
                        $("#Device_SN_i").val(sn_value);
                    }
                    if (res.result.addr1_value) {
                        $("#ImxMac_Adress_i").val(res.result.addr1_value);
                    }
                    if (res.result.addr2_value) {
                        $("#QCA_WANaddress_i").val(res.result.addr2_value);
                    }
                    if (res.result.addr3_value) {
                        $("#QCA_WLANAddress_i").val(res.result.addr3_value);
                    }
                    if (res.result.Qca6174Mac_value) {
                        $("#Qca6174Mac").val(res.result.Qca6174Mac_value);
                    }
                    $("#SN_MAC_status").text(res.result.sn == 1 ? "已写/成功" : '失败');
                    $("#ImxMac_Adress_status").text(res.result.mac_addr1 == 1 ? "已写/成功" : '未写/失败');
                    $("#QCA_WANaddress_status").text(res.result.mac_addr2 == 1 ? "已写/成功" : '未写/失败');
                    $("#QCA_WLANAddress_status").text(res.result.mac_addr3 == 1 ? "已写/成功" : '未写/失败');
                    $("#QCA_6174Address").text(res.result.Qca6174Mac == 1 ? "已写/成功" : '未写/失败');
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

                    $("#Admin_Password").text(res.result.AdminPassword_value ? res.result.AdminPassword_value : '--');
                    $("#WIFI_Password").text(res.result.WifiPassword_value ? res.result.WifiPassword_value : '--')
                    form.render("checkbox");
                    if (res.result.AdminPassword_value && res.result.WifiPassword_value) {
                        if (flag != 0) {
                            setPassword(layer, loading);
                        }

                    } else {
                        parent.layer.close(loading);
                        if (flag != 0) {
                            if (!res.result.AdminPassword_value) {
                                layer.msg("获取Admin Password失败！");
                            }
                            if (!res.result.WifiPassword_value) {
                                layer.msg("获取Wifi Password失败！");
                            }
                        }

                    }

                }

            } else if (res.error) {
                parent.layer.close(loading);
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("An error occurred：" + res.error.message);
                })
            }

        },
        error: function(jqXHR) {
            parent.layer.close(loading);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    })
}
var timer = null;
//设置SN和MAC地址
function setMACData(layer, form, loading) {
    $("#start_btn1").attr("disabled", "disabled");

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
                    if (res.result.sn == 1 && res.result.mac_addr1 == 1 && res.result.mac_addr2 == 1 && res.result.mac_addr3 == 1) {
                        $("#QCA_WLANAddress").attr("disabled", "disabled");
                    }
                }
            } else if (res.error) {
                parent.layer.close(loading);
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
var LTEtimer = null;
//获取LTE INFO
function getLTEdata(layer, mode) {
    var params;
    if (mode == 0) {
        params = {
            "mode": 0,
            "admin_name": "U2FsdGVkX1+LY0+2aFb4Kq/Z874Rwf340ICxzPl9eyc6o70SAeedTgANYxb4AwwC",
            "admin_password": "U2FsdGVkX1/NIkr86CcvkCSglpmv9PKTrkcJbQo2oXk="
        }
    } else {
        params = {
            mode: mode // 查询
        }
    }
    var data = {
        "jsonrpc": "2.0",
        "method": "Factory_Mobile_Testing",
        "params": params,
        "id": "9.1"
    }
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        timeout: 5000,
        url: "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            if (res.result) {
                if (mode == 0) {
                    LTEtimer = setInterval(function() {
                        layui.use(['layer', 'form'], function() {
                            var form = layui.form,
                                layer = layui.layer;
                            getLTEdata(layer, 1)
                        });
                    }, 10000)
                } else {
                    $("#LTE_Module").text(res.result.imei);
                    if (res.result.sim[0].sim_status == 0) {
                        $("#SIM1_Detect").text("Failed");
                    } else {
                        $("#SIM1_Detect").text("Successful");
                    }
                    if (res.result.sim[0].internet == 0) {
                        $("#SIM1_Internet").text("Failed");
                    } else {
                        $("#SIM1_Internet").text("Successful");
                    }

                    if (res.result.sim[1].sim_status == 0) {
                        $("#SIM2_Detect").text("Failed");
                    } else {
                        $("#SIM2_Detect").text("Successful");
                    }
                    if (res.result.sim[1].internet == 0) {
                        $("#SIM2_Internet").text("Failed");
                    } else {
                        $("#SIM2_Internet").text("Successful");
                    }
                    if (res.result.sim[1].lte_uart == 0) {
                        $("#LET_UART").text("Failed");
                    } else {
                        $("#LET_UART").text("Successful");
                    }
                    if (res.result.t_status == 1) {
                        if (res.result.slot == 0) {
                            $("#now_SIM").text("当前测试的SIM卡:SIM1")
                        } else {
                            $("#now_SIM").text("当前测试的SIM卡:SIM2")
                        }
                    } else if (res.result.t_status == 2) {
                        $("#LTE_Start").removeAttr("disabled");
                        clearInterval(LTEtimer);
                        $("#now_SIM").text("检测完成");
                    } else {
                        $("#LTE_Start").removeAttr("disabled");
                        $("#now_SIM").text("");
                        clearInterval(LTEtimer);
                    }

                    if (res.result.provision && res.result.provision == 1) {
                        $("#Provision_key").text("已认证");
                    } else {
                        $("#Provision_key").text("未认证");
                    }
                }

            } else if (res.error) {
                $("#LTE_Start").removeAttr("disabled");
                clearInterval(LTEtimer);
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("An error occurred：" + res.error.message);
                })
            }
        },
        complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') { //超时,status还有success,error等值的情况
                ajaxTimeout.abort();
            }
        },
        error: function(jqXHR) {
            $("#LTE_Start").removeAttr("disabled");
            clearInterval(LTEtimer);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    })
}
//获取INPUT/OUTPUT
function getIOdata() {
    var data = {
        "jsonrpc": "2.0",
        "method": "IoConfigure",
        "params": {
            mode: "4" // 查询
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
            $("#INP_Start").removeAttr("disabled");
            if (res.result) {
                var info = res.result;
                $("#INPUT1").text(info["channel 0"] + " V");
                $("#INPUT2").text(info["channel 1"] + " V");
                $("#INPUT3").text(info["channel 2"] + " V");
                $("#INPUT4").text(info["channel 3"] + " V");
            } else if (res.error) {
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("An error occurred：" + res.error.message);
                })
            }

        },
        error: function(jqXHR) {
            $("#INP_Start").removeAttr("disabled");
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    })
}
//获取Location
function getLocationdata() {
    var data = {
        "jsonrpc": "2.0",
        "method": "GetGpsData",
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
            $("#Location_Start").removeAttr("disabled");
            if (res.result) {
                $("#Location_lng").text(res.result.lng);
                $("#Location_lat").text(res.result.lat);
            } else if (res.error) {
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("code：" + res.error.code + ",message:" + res.error.message);
                })
            }

        },
        error: function(jqXHR) {
            $("#Location_Start").removeAttr("disabled");
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    })
}
//获取LAN
function getLANdata() {
    var data = {
        "jsonrpc": "2.0",
        "method": "LanConfigure",
        "params": { "mode": 4, "ip_1": "", "ip_2": "", "netmask": "", "gateway": "", "start_ip": "", "end_ip": "", "lease_time": -1 },
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
            $("#LAN_Start").removeAttr("disabled");
            if (res.result) {
                if (res.result.lan1 == 0) {
                    $("#LAN1_status").text("Failed");
                } else {
                    $("#LAN1_status").text("Successful");
                }
                if (res.result.lan2 == 0) {
                    $("#LAN2_status").text("Failed");
                } else {
                    $("#LAN2_status").text("Successful");
                }
                if (res.result.lan3 == 0) {
                    $("#LAN3_status").text("Failed");
                } else {
                    $("#LAN3_status").text("Successful");
                }
                if (res.result.lan4 == 0) {
                    $("#LAN4_status").text("Failed");
                } else {
                    $("#LAN4_status").text("Successful");
                }
                if (res.result.led == 0) {
                    $("#LED_status").show();
                    $("#LED_status").text("Failed");
                    $("#LED_status_radio").hide();
                } else {
                    $("#LED_status").hide();
                    $("#LED_status_radio").show();
                }

            } else if (res.error) {
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("An error occurred：" + res.error.message);
                })
            }

        },
        error: function(jqXHR) {
            $("#LAN_Start").removeAttr("disabled");
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    })
}
//获取AP
function getAPdata(mode) {
    var data = {
        "jsonrpc": "2.0",
        "method": "Factory_Test",
        "params": {
            mode: mode
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
            $("#CAN_Start").removeAttr("disabled");
            $("#AP_Start").removeAttr("disabled");
            if (res.result) {
                if (mode == 0) {
                    $("#AP_SSID").text(res.result.ssid ? res.result.ssid : '--');
                    $("#AP_pasword").text(res.result.password ? res.result.password : '--');
                } else if (mode == 1) {
                    if (res.result.status == 1) {
                        $("#CAN2000").text("Successful")
                    } else {
                        $("#CAN2000").text("Failed")
                    }
                }

            } else if (res.error) {
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("code：" + res.error.code + ",message:" + res.error.message);
                })
            }

        },
        error: function(jqXHR) {
            $("#CAN_Start").removeAttr("disabled");
            $("#AP_Start").removeAttr("disabled");
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    })
}

function getStationdata() {
    var data = {
        "jsonrpc": "2.0",
        "method": "WlanStationConfig",
        "params": {
            "operate_code": 8
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
            $("#Station_Start").removeAttr("disabled");
            if (res.result) {
                $("#Station_SSID").text(res.result.ssid);
                $("#connected_status").text(res.result.status);
            } else if (res.error) {
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("code：" + res.error.code + ",message:" + res.error.message);
                })
            }

        },
        error: function(jqXHR) {
            $("#Station_Start").removeAttr("disabled");
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    })
}

function exportPdf() {
    var target = document.getElementById('export_content');
    target.style.background = "#FFFFFF";

    html2canvas(target, {
        onrendered: function(canvas) {
            var contentWidth = canvas.width;
            var contentHeight = canvas.height;

            //一页pdf显示html页面生成的canvas高度;
            var pageHeight = contentWidth / 592.28 * 841.89;
            //未生成pdf的html页面高度
            var leftHeight = contentHeight;
            //页面偏移
            var position = 0;
            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            var imgWidth = 595.28;
            var imgHeight = 592.28 / contentWidth * contentHeight;

            var pageData = canvas.toDataURL('image/jpeg', 1.0);

            var pdf = new jsPDF('', 'pt', 'a4');

            //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            //当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < pageHeight) {
                pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
            } else {
                while (leftHeight > 0) {
                    pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                    leftHeight -= pageHeight;
                    position -= 841.89;
                    //避免添加空白页
                    if (leftHeight > 0) {
                        pdf.addPage();
                    }
                }
            }
            if ($("#Device_SN_i").val()) {
                var SNNum = $("#Device_SN_i").val();
                pdf.save(SNNum + ".pdf");
            } else {
                pdf.save("report.pdf");
            }


            setTimeout(() => {
                $(".Rectangle-1182").show();
            }, 5000);
        }
    })
}

function exportPDF() {
    let targetDom = $("#export_content");
    targetDom.css("background-color", "#fff")
    targetDom.scrollTop();
    // let copyDom = targetDom.clone();
    let copyDom = $("<div/>");
    copyDom.addClass('super');
    copyDom.width(targetDom.width() + "px");
    copyDom.height(targetDom.height() + "px");
    $('body').append(copyDom);
    let cont = document.getElementById('export_content');

    html2canvas(targetDom, {
        // windowHeight:2000,
        height: cont.offsetHeight, //给canvas设置高度，
        onrendered: function(canvas) {

            //通过html2canvas将html渲染成canvas，然后获取图片数据
            let imgData = canvas.toDataURL('image/jpeg', 1.0);
            // console.log(imgData);

            //初始化pdf，设置相应格式
            let doc = new jsPDF("p", "mm", "a4");
            // let doc = new jsPDF('', 'pt', 'a4')

            //这里设置的是a4纸张尺寸
            doc.addImage(imgData, 'JPEG', 0, 0, 210, 297);

            //输出保存命名为content的pdf
            doc.save('report.pdf');
            //移除dom中添加的元素
            $('.super').remove();

        }
    });
}

function toExcel(event) {
    // 获得表格数据的html标签和文本d;
    var html = "<html><head><meta charset='UTF-8'></head><body>" + document.getElementById("exel_data").outerHTML + "</body></html>";
    // 创建一个Blob对象，第一个参数是文件的数据，第二个参数是文件类型属性对象
    var blob = new Blob([html], { type: "application/vnd.ms-excel" });
    var a = event.target;

    // 利用URL的createObjectURL方法为元素a生成blobURL
    a.href = URL.createObjectURL(blob);
    if ($("#Device_SN_i").val()) {
        var SNNum = $("#Device_SN_i").val();
        a.download = SNNum + "表";
    } else {
        // 设置文件名
        a.download = "SN表";
    }

}