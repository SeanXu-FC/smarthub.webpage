$(function() {
    $(".Back").prop("disabled", true);
    $(".Back").css("opacity", "0.5");
    layui.use(['form', 'layer'], function() {
        var form = layui.form;
        var layer = layui.layer;
        getWLANScan(layer, form);
    });
})

function getWLANScan(layer) {
    var loading = parent.layer.load(0, {
        shade: [0.5, '#fff']
    });
    var data = {
        "jsonrpc": "2.0",
        "method": "WlanStationConfig",
        "params": {
            "operate_code": 9
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
            if (res.result && res.result.status == "WlanStationConfig Scan Done") {
                setTimeout(() => {
                    getWLANData(layer, loading);
                }, 3000);

            } else if (res.error) {

                $("#none_wifiList").children("img").hide();
                $("#none_wifiList").children("span").text(res.error.message)
                    //layer.msg("An error occurred：" + res.error.message);
                    //sessionStorage.setItem('clickFlag', true);
                setTimeout(() => {
                    getWLANData(layer, loading);
                }, 3000);
            }

        },
        error: function(jqXHR) {
            //sessionStorage.setItem('clickFlag', true);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    });
}

function getWLANData(layer, loading) {
    console.log(9999999)
    var data = {
        "jsonrpc": "2.0",
        "method": "WlanStationConfig",
        "params": {
            "operate_code": 10
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
            parent.layer.close(loading);
            if (res.result && res.result.ap_list) {
                var json = res.result.ap_list;
                json.sort(arrSort("rssi"));
                sessionStorage.setItem('wifiJson', JSON.stringify(json));
                renderWifiList(json);
            } else if (res.error) {
                layer.msg("An error occurred：" + res.error.message);
            }  
            //sessionStorage.setItem('clickFlag', true);

        },
        error: function(jqXHR) {
            parent.layer.close(loading);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
            //sessionStorage.setItem('clickFlag', true);
        }
    });
}
//渲染wifi列表
function renderWifiList(json) {
    $("#set_wizard_c").html("");
    var str = "",
        savedStr = "",
        encryptStr = "",
        ConnectedStr = "",
        wifiImg = "wifi-icon4.png";
    var signal = 0;
    //es5字符串拼接：
    for (let i = 0; i < json.length; i++) {
        if (json[i].is_connected != 0) {
            if (!!json[i].encrypt) {
                encryptStr = "WiFi_Protected.png"
            } else {
                encryptStr = "icon-wifi.png"
            }
            if (json[i].is_connected == 1) {
                if (2400 < Number(json[i].freq) && Number(json[i].freq) < 2900) {
                    ConnectedStr = "Connected (2.4GHz)";
                } else if (5100 < Number(json[i].freq) && Number(json[i].freq) < 5900) {
                    ConnectedStr = "Connected (5GHz)";
                }
            } else {
                ConnectedStr = "Connecting";
            }
            signal = Math.abs(json[i].rssi);
            if (100 > signal && signal >= 85) {
                wifiImg = "s_wifi_02.png";
            } else if (85 > signal && signal >= 70) {
                wifiImg = "s_wifi_03.png";
            } else if (70 > signal && signal >= 55) {
                wifiImg = "s_wifi_04.png";
            } else if (55 > signal) {
                wifiImg = "s_wifi_05.png";
            }
            str += '<div class="row -flex-display -justify-box"><div class="-radio-flex"><div class="myAp wifi-name wifi-name-green">' + json[i].ssid + '</div><div class="c9"><img class="connecting-img" src="images/loading.gif" /><span id="Connecting-status" class="color-green">' + ConnectedStr + '</span></div></div><div class=""><img class="wifi-icon" src="images/' + wifiImg + '"></div></div>'
        }
    }
    for (let j = 0; j < json.length; j++) {
        if (json[j].is_connected == 0) {
            if (!!json[j].encrypt) {
                encryptStr = "WiFi_Protected.png"
            } else {
                encryptStr = "icon-wifi.png"
            }
            if (json[j].is_saved != 0) {
                savedStr = "Saved";
            } else if (json[j].encrypt != "[ESS][UTF-8]" && json[j].is_saved == 0) {
                savedStr = "Encrypted";
            } else {
                savedStr = "";
            }
            signal = Math.abs(json[j].rssi);
            if (100 > signal && signal >= 85) {
                wifiImg = "s_wifi_02.png";
            } else if (85 > signal && signal >= 70) {
                wifiImg = "s_wifi_03.png";
            } else if (70 > signal && signal >= 55) {
                wifiImg = "s_wifi_04.png";
            } else if (55 > signal) {
                wifiImg = "s_wifi_05.png";
            }
            str += '<div class="row -flex-display -justify-box wifi" style="margin-top:13px;"><input class="dom_saved_data" value="" bssid="' + json[j].bssid + '" encrypt="' + json[j].encrypt + '" freq="' + json[j].freq + '" is_connected="' + json[j].is_connected + '" is_saved="' + json[j].is_saved + '" rssi="' + json[j].rssi + '" ssid="' + json[j].ssid + '" style="display:none;"><div class="-radio-flex"><div class="wifi-name-set">' + json[j].ssid + '</div><div class="c9" style="padding-left:0">' + savedStr + '</div></div><div class=""><img class="wifi-icon" src="images/' + wifiImg + '"></div></div>'
        }
    }
    str += ' <div class="row mt-40 add-Available-networks" style="display: flex;"><div class="col-md-2 pl-0"><div><img src="images/icon-add.png"></div></div><div class="col-md-10"><span class="addN">Create network</span></div></div>'
    $("#set_wizard_c").html(str);
    bindEvent();
}
var tipIndex = null;
var timer = null; //定时器
//绑定事件
function bindEvent() {
    //弹出一个iframe层
    $('.wifi').on('click', function() {
        var infoHtml = $(this).children(".dom_saved_data");
        enterPasswordHtml(infoHtml);
    });
    $('.add-Available-networks').on('click', function() {
        $(".layui-layer").css("background", "none");

        addNetworkHtml();

    });
}
//弹出输入密码事件
function enterPasswordHtml(infoHtml) {
    var ssid = infoHtml.attr("ssid");
    var bssid = infoHtml.attr("bssid");
    var encrypt = infoHtml.attr("encrypt");
    var is_saved = infoHtml.attr("is_saved");
    if (is_saved == 1) { //已保存，直接连接
        savedWifiConnect(ssid, bssid, encrypt);
        return;
    }
    if (encrypt == "[OPEN]") {
        noPWDWifiConnect(ssid, bssid, is_saved);
        return;
    }
    console.log("ssid", ssid, bssid, encrypt, is_saved)
        //iframe层
    parent.layer.open({
        type: 2,
        title: false,
        //shadeClose: true,
        shade: 0.8,
        area: ['521px', '360px'],
        content: ['EnterPassword.html?ssid=' + ssid + "&bssid=" + bssid + "&encrypt=" + encrypt + "&is_saved=" + is_saved, 'no'],
        end: function() {
            console.log($("#saved_id").val())
            var connectingSsid = $("#saved_id").val();
            var connectingBssid = $("#saved_id").attr("bssid");
            var wifiJson = JSON.parse(sessionStorage.getItem('wifiJson'));
            console.log(wifiJson)
            if (connectingSsid && connectingBssid) {
                for (var i = 0; i < wifiJson.length; i++) {
                    if (wifiJson[i].is_connected == 1) {
                        wifiJson[i].is_connected = 0;
                    }
                    if (connectingSsid == wifiJson[i].ssid && connectingBssid == wifiJson[i].bssid) {
                        wifiJson[i].is_connected = 2;
                    }
                }
                renderWifiList(wifiJson);
                clearInterval(timer);
                $(".connecting-img").show();
                timer = setInterval(function() {
                    pollingWifiStatus(infoHtml, "EnterPassword");
                }, 3000)
            }

        }
    });
}
//新增wifi并连接
function addNetworkHtml() {
    parent.layer.open({
        type: 2,
        title: false,
        //shadeClose: true,
        shade: 0.8,
        area: ['541px', '361px'],
        content: ['AddNetwork.html', 'no'],
        end: function() {
            console.log($("#saved_id").val())
            var connectingSsid = $("#saved_id").val();
            var connectingEncrypt = $("#saved_id").attr("encrypt");
            var wifiJson = JSON.parse(sessionStorage.getItem('wifiJson'));
            var newWifi = {
                ssid: connectingSsid,
                encrypt: connectingEncrypt,
                is_connected: 2
            }
            wifiJson.unshift(newWifi);
            if (connectingSsid && connectingEncrypt) {
                for (var i = 0; i < wifiJson.length; i++) {
                    if (wifiJson[i].is_connected == 1 && connectingSsid != wifiJson[i].ssid) {
                        wifiJson[i].is_connected = 0;
                    }
                    if (connectingSsid == wifiJson[i].ssid && connectingEncrypt == wifiJson[i].encrypt) {
                        wifiJson[i].is_connected = 2;
                    }
                }
                renderWifiList(wifiJson);
                clearInterval(timer);
                $(".connecting-img1").show();
                timer = setInterval(function() {
                    pollingWifiStatus("", "AddNetwork");
                }, 3000)
            }
        }
    });
}
//轮询当前wifi连接状态
function pollingWifiStatus(infoDOM, type) {
    var timeout0 = 2000;
    data = {
        "jsonrpc": "2.0",
        "method": "WlanStationConfig",
        "params": {
            "operate_code": 8
        },
        "id": "9.1"
    }
    data = JSON.stringify(data);
    var ajaxTimeout = $.ajax({
        type: "post",
        url: "/action/action",
        timeout: timeout0,
        data: data,
        dataType: "json",
        contentType: "application/json",
        success: function(res) {
            if (res.result.status) {
                $("#Connecting-status").text(res.result.status);
                if (res.result.status == "Password Incorrect" && type == "EnterPassword") { //密码错误从新弹框输入
                    clearInterval(timer);
                    timer = setInterval(function() {
                        pollingWifiStatus(infoDOM);
                    }, 3000)
                    enterPasswordHtml(infoDOM, type)
                }
                if (res.result.status == "Connected") {
                    clearInterval(timer);
                    updateWifiList();
                    $(".connecting-img").hide();
                }
                // if (res.result.status == "Disconnected") {
                //     clearInterval(timer);
                // }
                if (res.result.status == "Connected" && type == "AddNetwork") { //新增WiFi并连接，调接口返回列表不会马上有新路由，只能手动先添加进缓存列表，等连接上后，再调接口获取有新WiFi的列表，区更新wifi列表和缓存数据
                    clearInterval(timer);
                    $(".connecting-img").hide();
                    updateWifiList();
                }
            }
        },
        complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
            if (status == 'timeout') { //超时,status还有success,error等值的情况
                ajaxTimeout.abort();
            }
        },
        error: function(jqXHR) {
            clearInterval(timer);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }

    });
}
//已经保存的WiFi直接连接
function savedWifiConnect(ssid, bssid, encrypt) {
    var data = {
        "jsonrpc": "2.0",
        "method": "WlanStationConfig",
        "params": {
            "operate_code": 2,
            "ssid": ssid,
            "bssid": bssid,
            "encrypt": encrypt,
            "is_saved": 1,
        },
        "id": "9.1"
    };

    data = JSON.stringify(data);

    console.log(data);
    $.ajax({
        type: "post",
        url: "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            if (res.result) {
                var wifiJson = JSON.parse(sessionStorage.getItem('wifiJson'));
                console.log(wifiJson)
                if (ssid && bssid) {
                    for (var i = 0; i < wifiJson.length; i++) {
                        if (wifiJson[i].is_connected == 1) {
                            wifiJson[i].is_connected = 0;
                        }
                        if (ssid == wifiJson[i].ssid && bssid == wifiJson[i].bssid) {
                            wifiJson[i].is_connected = 2;
                        }
                    }
                    renderWifiList(wifiJson);
                    if (res.result.status != "Connected" && res.result.status != "Password Incorrect") {
                        clearInterval(timer);
                        $(".connecting-img").show();
                        timer = setInterval(function() {
                            pollingWifiStatus();
                        }, 3000)
                    } else {
                        $("#Connecting-status").text(res.result.status);
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
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    });
}
//无密码的WiFi直接连接
function noPWDWifiConnect(ssid, bssid, is_saved) {
    var data = {
        "jsonrpc": "2.0",
        "method": "WlanStationConfig",
        "params": {
            "operate_code": 2,
            "ssid": ssid,
            "bssid": bssid,
            "encrypt": "None",
            "is_saved": is_saved,
            //"psk": "",
        },
        "id": "9.1"
    };

    data = JSON.stringify(data);

    console.log(data);
    $.ajax({
        type: "post",
        url: "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            if (res.result) {
                var wifiJson = JSON.parse(sessionStorage.getItem('wifiJson'));
                console.log(wifiJson)
                if (ssid && bssid) {
                    for (var i = 0; i < wifiJson.length; i++) {
                        if (wifiJson[i].is_connected == 1) {
                            wifiJson[i].is_connected = 0;
                        }
                        if (ssid == wifiJson[i].ssid && bssid == wifiJson[i].bssid) {
                            wifiJson[i].is_connected = 2;
                        }
                    }
                    renderWifiList(wifiJson);
                    if (res.result.status != "Connected" && res.result.status != "Password Incorrect") {
                        clearInterval(timer);
                        $(".connecting-img").show();
                        timer = setInterval(function() {
                            pollingWifiStatus();
                        }, 3000)
                    } else {
                        $("#Connecting-status").text(res.result.status);
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
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    });
}
//更新WiFi列表连接状态
function updateWifiList() {
    var data = {
        "jsonrpc": "2.0",
        "method": "WlanStationConfig",
        "params": {
            "operate_code": 10
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
            if (res.result && res.result.ap_list) {
                var wifiJson = res.result.ap_list;
                wifiJson.sort(arrSort("rssi"));

                sessionStorage.setItem('wifiJson', JSON.stringify(wifiJson))
                renderWifiList(wifiJson);

            }
        }
    })
}

//数组根据属性排序
function arrSort(prop) {
    return function(obj1, obj2) {
        var val1 = Math.abs(obj1[prop]);
        var val2 = Math.abs(obj2[prop]);
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }
}