$(function() {

    layui.use(['form', 'layer'], function() {
        var form = layui.form;
        var layer = layui.layer;
        getSwitchStatus(layer, form);
        form.on('switch(switchTest)', function(data) {
            var checked = data.elem.checked;
            changeSwitchStatus(layer, form, checked)
        });
    });
})

function getSwitchStatus(layer, form) {
    var data = {
        "jsonrpc": "2.0",
        "method": "WlanStationConfig",
        "params": {
            "operate_code": 12
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
                if (res.result.status == "WLAN_ON") {
                    $("#WLAN_swtich").attr("checked", "checked");
                    $(".network-c").show();
                    $("#WLAN_list_c").show();
                    getWLANScan(layer);

                } else {
                    $("#WLAN_swtich").removeAttr("checked");

                }
                form.render();
                $("#WLAN_swtich_c").show();
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

function changeSwitchStatus(layer, form, checked) {
    var mode;
    if (checked == false) {
        mode = 0;
    } else if (checked == true) {
        mode = 1;

    }
    var data = {
        "jsonrpc": "2.0",
        "method": "WlanStationConfig",
        "params": {
            "operate_code": mode
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
                layer.msg(res.result.status);
                if (mode) {
                    $(".network-c").show();
                    $("#WLAN_list_c").show();
                    $("#WLAN_list_c").html("");
                    getWLANScan(layer);
                } else {
                    $(".network-c").hide();
                    $("#WLAN_list_c").hide();
                }
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
                    //var noneStr = '<div class="none-list" id="none_wifiList"><span>' + res.error.message + '</span></div>'
                    //$("#WLAN_list_c").html(noneStr);
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
                //$(".mCont").show();
                var json = res.result.ap_list;
                json.sort(arrSort("rssi"));
                sessionStorage.setItem('wifiJson', JSON.stringify(json));
                renderWifiList(json);
                // var $img = $(".wifi-icon");
                // var signal = 0;
                // for (var k = 0; k < json.length; k++) {
                //     signal = json[k].rssi;
                //     // console.log(signal);
                //     if (-100 < signal <= -85) {
                //         $img.eq(k).attr("src", "/images/wifi-icon1.png");
                //     } else if (-85 < signal <= -75) {
                //         $img.eq(k).attr("src", "/images/wifi-icon2.png");
                //     } else if (-50 < signal <= -70) {
                //         $img.eq(k).attr("src", "/images/wifi-icon3.png");
                //     } else if (-50 < signal) {
                //         $img.eq(k).attr("src", "/images/wifi-icon4.png");
                //     }
                // } 
            } else if (res.error) {
                layer.msg("An error occurred：" + res.error.message);
            }   

            //sessionStorage.setItem('clickFlag', true);


        },
        error: function(jqXHR) {
            //sessionStorage.setItem('clickFlag', true);
            parent.layer.close(loading);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);

        }
    });
}

//渲染wifi列表
function renderWifiList(json) {
    $("#WLAN_list_c").html("");
    var str = "",
        savedStr = "",
        encryptStr = "",
        ConnectedStr = "",
        wifiImg = "wifi-icon4.png";
    var signal = 0;
    //es5字符串拼接：
    str += '<table class="wifi-table">';
    for (var i = 0; i < json.length; i++) {
        if (json[i].is_connected != 0) { //当前连接上的
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
            str += '<tr><td class="col-md-8"><div class="wifi-name wifi-name-green">' + json[i].ssid + '</div><div class=" c9 Connected-24GHz" style="padding-left:0"><img class="connecting-img" src="images/loading.gif" /><span id="Connecting-status">' + ConnectedStr + '</span></div></td><td><div class="col-md-2">'
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

            str += '<img class="wifi-icon" src="images/' + wifiImg + '"></div></td><td><div class="col-md-2 wireless"><img src="images/icon-info.png" style="display: inline-block;margin-left:3px;margin-top:-2px;"></div></td><td class="wifi-info" style="display:none"><span class="save-wifi-info" bssid="' + json[i].bssid + '" encrypt="' + json[i].encrypt + '" freq="' + json[i].freq + '" is_connected="' + json[i].is_connected + '" is_saved="' + json[i].is_saved + '" rssi="' + json[i].rssi + '" ssid="' + json[i].ssid + '"></span></td></tr>'

        }
    }
    str += '<tr><td colspan="3" class="Available-networks">Available networks</td></tr>';
    for (let j = 0; j < json.length; j++) {
        if (json[j].is_connected == 0) {
            if (!!json[j].encrypt) {
                encryptStr = "WiFi_Protected.png"
            } else {
                encryptStr = "icon-wifi.png"
            };
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
            if (json[j].is_saved != 0) {
                savedStr = "Saved";
            } else if (json[j].encrypt == "[OPEN]" && json[j].is_saved == 0) {
                savedStr = "";
            } else {
                savedStr = "Encrypted";
            }
            str += '<tr class="tip-dom" id="wifi_tips' + j + '"><td class="col-md-8 wifi"><div class="wifi-name">' + json[j].ssid + '</div><div class=" c9 Connected-24GHz" style="padding-left:0">' + savedStr + '</div></td><td><div class="col-md-2"><img class="wifi-icon" src="images/' + wifiImg + '"></div></td><td></td><td class="wifi-info"  style="display:none"><span class="save-wifi-info" bssid="' + json[j].bssid + '" encrypt="' + json[j].encrypt + '" freq="' + json[j].freq + '" is_connected="' + json[j].is_connected + '" is_saved="' + json[j].is_saved + '" rssi="' + json[j].rssi + '" ssid="' + json[j].ssid + '"></span></td></tr>'
        }
    }
    str += '<tr><td colspan="3" class="add-Available-networks"><div class="col-md-2" style="padding-left:0"><img src="images/icon-add.png" style="display: inline-block;"></div><div class="col-md-10"><span style="display: inline-block;margin-top:3px;margin-left:-10px;" class="addN">Add network</span></div></td></tr></table>';
    $("#WLAN_list_c").html(str);
    bindEvent();
}
var tipIndex = null;
var timer = null; //定时器
//绑定事件
function bindEvent() {


    $('.Rectangle-1205 .wifi').hover(function() {
        var infoHtml = $(this).parents("tr").children(".wifi-info").children("span");
        var ssid = infoHtml.attr("ssid");
        var freq = infoHtml.attr("freq");
        var bssid = infoHtml.attr("bssid");
        var encrypt = infoHtml.attr("encrypt");
        var tipId = $(this).parents("tr").attr("id");
        if (2400 < freq && freq < 2900) {
            freq = "2.4GHz"
        } else if (5030 < freq && freq < 5900) {
            freq = "5GHz"
        }
        var tipStr = '<div class="tips-c"><div class="-flex-dis"><span class="tip-l">Ssid:</span><span class="tip-r">' + ssid + '</span></div><div class="-flex-dis"><span class="tip-l">Frequency band:</span><span class="tip-r">' + freq + '</span></div><div class="-flex-dis"><span class="tip-l">Security:</span><span class="tip-r">' + encrypt + '</span></div><div class="-flex-dis"><span class="tip-l">MAC address:</span><span class="tip-r">' + bssid + '</span></div></div>'
        layui.use('layer', function() {
            var layer = layui.layer;
            tipIndex = layer.tips(tipStr, "#" + tipId, {
                area: ['auto', 'auto'],
                time: 0,
                tips: [2, "#f9f9f9"]
            });
        });
    }, function() {
        layer.close(tipIndex)
    });



    //弹出一个iframe层
    $('.Rectangle-1205 .wifi').on('click', function() {
        var infoHtml = $(this).parents("tr").children(".wifi-info").children("span");
        $("#saved_id").attr("passwordIncorrect", "");
        enterPasswordHtml(infoHtml);
    });
    $('.wireless').on('click', function() {
        var infoHtml = $(this).parents("tr").children(".wifi-info").children("span");
        forgetWifiHtml(infoHtml);
    });
    $('.add-Available-networks').on('click', function() {
        $(".layui-layer").css("background", "none");
        $("#saved_id").val("").attr("encrypt", "None").attr("passwordIncorrect", "");
        addNetworkHtml();

    });
}
//新增wifi并连接
function addNetworkHtml() {
    parent.layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        shade: 0.8,
        area: ['541px', '361px'],
        content: ['AddNetwork.html', 'no'],
        end: function() {
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
                $(".connecting-img").show();
                timer = setInterval(function() {
                    pollingWifiStatus("", "AddNetwork", newWifi);
                }, 3000)
            }

        }
    });
}
//删除/忘记wifi
function forgetWifiHtml(infoHtml) {
    var ssid = infoHtml.attr("ssid");
    var bssid = infoHtml.attr("bssid");
    var encrypt = infoHtml.attr("encrypt");
    var is_saved = infoHtml.attr("is_saved");
    var is_connected = infoHtml.attr("is_connected");

    if (is_connected != '1') {
        return;
    }
    //iframe层
    parent.layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        shade: 0.8,
        area: ['534px', '63%'],
        //area: '534px',
        content: ['WirelessNameInfo.html?ssid=' + ssid + "&bssid=" + bssid + "&encrypt=" + encrypt + "&is_saved=" + is_saved, 'no'],
        end: function() {
            var connectingSsid = $("#saved_id").val();
            var connectingBssid = $("#saved_id").attr("bssid");
            console.log(connectingSsid, connectingBssid);
            var wifiJson = JSON.parse(sessionStorage.getItem('wifiJson'));
            if (connectingSsid && connectingBssid) {
                for (var i = 0; i < wifiJson.length; i++) {

                    if (connectingSsid == wifiJson[i].ssid && connectingBssid == wifiJson[i].bssid) {
                        wifiJson.splice(i, 1);
                        sessionStorage.setItem('wifiJson', JSON.stringify(wifiJson))
                    }
                }
                renderWifiList(wifiJson);
                clearInterval(timer);
                $(".connecting-img").show();
                pollingWifiStatus(infoHtml, "forgetWifi");
                timer = setInterval(function() {
                    pollingWifiStatus(infoHtml, "forgetWifi");
                }, 3000)
            }

        }
    });
    $(window).resize();
}
//弹出输入密码事件
function enterPasswordHtml(infoHtml) {
    var ssid = infoHtml.attr("ssid");
    var bssid = infoHtml.attr("bssid");
    var encrypt = infoHtml.attr("encrypt");
    var is_saved = infoHtml.attr("is_saved");

    if (is_saved == 1) { //已保存，直接连接
        savedWifiConnect(ssid, bssid, encrypt, infoHtml);
        return;
    }
    if (encrypt == "[OPEN]") { //无需密码直接连接
        noPWDWifiConnect(ssid, bssid, is_saved);
        return;
    }
    console.log("ssid", ssid, bssid, encrypt, is_saved)
        //iframe层
    parent.layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        shade: 0.8,
        area: ['521px', '360px'],
        content: ['EnterPassword.html?ssid=' + ssid + "&bssid=" + bssid + "&encrypt=" + encrypt + "&is_saved=" + is_saved, 'no'],
        end: function() {
            var connectingSsid = $("#saved_id").val();
            var connectingBssid = $("#saved_id").attr("bssid");
            var wifiJson = JSON.parse(sessionStorage.getItem('wifiJson'));
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
//轮询当前wifi连接状态
function pollingWifiStatus(infoDOM, type, newWifi) {
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

                if (res.result.status == "Connected") {
                    clearInterval(timer);
                    updateWifiList();
                    $(".connecting-img").hide();
                }
                if (res.result.status == "Connected" && type == "AddNetwork") { //新增WiFi并连接，调接口返回列表不会马上有新路由，只能手动先添加进缓存列表，等连接上后，再调接口获取有新WiFi的列表，区更新wifi列表和缓存数据
                    $(".connecting-img").hide();
                    updateWifiList();
                }

                if (res.result.status == "Password Incorrect" && type == "EnterPassword") { //密码错误从新弹框输入
                    clearInterval(timer);
                    timer = setInterval(function() {
                        pollingWifiStatus(infoDOM);
                    }, 3000)
                    $("#saved_id").attr("passwordIncorrect", "enterWifiIncorrect")
                    infoDOM.attr("is_saved", 0);
                    enterPasswordHtml(infoDOM, type);
                }
                if (res.result.status == "Password Incorrect" && type == "AddNetwork") { //新增wifi密码错误从新弹框输入
                    clearInterval(timer);
                    $("#saved_id").attr("passwordIncorrect", "newWifiIncorrect")
                    addNetworkHtml();
                }
                if (type == "forgetWifi") { //删除/忘记网络后，之前有保存网络，路由会自动连接，轮询连接的这个wifi
                    if (res.result.ssid && res.result.bssid) {
                        var wifiJson = JSON.parse(sessionStorage.getItem('wifiJson'));
                        for (var i = 0; i < wifiJson.length; i++) {
                            if (res.result.ssid == wifiJson[i].ssid && res.result.bssid == wifiJson[i].bssid) {
                                wifiJson[i].is_connected = 2;
                                infoDOM.attr("ssid", res.result.ssid);
                                infoDOM.attr("bssid", res.result.bssid);
                                infoDOM.attr("encrypt", wifiJson[i].encrypt);
                                infoDOM.attr("is_saved", 0);
                                //updateWifiList(wifiJson);
                            }
                        }
                        renderWifiList(wifiJson);

                    }
                    if (res.result.status == "Password Incorrect") {
                        clearInterval(timer);
                        $(".connecting-img").hide();
                        infoDOM.attr("is_saved", "0");
                        $("#saved_id").attr("passwordIncorrect", "enterWifiIncorrect")
                        enterPasswordHtml(infoDOM);
                    }
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
            pollingWifiStatus();
            //var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            //promptMessage("Error message", tip);
        }

    });
}
//已经保存的WiFi直接连接
function savedWifiConnect(ssid, bssid, encrypt, infoHtml) {
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
    $.ajax({
        type: "post",
        url: "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            if (res.result) {
                $("#Connecting-status").text(res.result.status);
                var wifiJson = JSON.parse(sessionStorage.getItem('wifiJson'));
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
                            pollingWifiStatus(infoHtml, "EnterPassword");
                        }, 3000)
                    } else if (res.result.status == "Password Incorrect") {
                        $("#saved_id").attr("passwordIncorrect", "enterWifiIncorrect");
                        infoHtml.attr("is_saved", 0);
                        enterPasswordHtml(infoHtml);
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
                var wifiJson = JSON.parse(sessionStorage.getItem('wifiJson'));
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

//输入密码关闭弹窗回调函数
function connectWifiCall(info) {
    console.log(info)
}

function aa() {
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
            layer.close(loading);
            if (res.result) {
                //$(".mCont").show();
                var json = res.result.ap_list;
                var str = "";
                //方法一:es5字符串拼接：
                str += '<table style="width:100%" class=" table-responsive">';
                // str += '<tr>';
                // str += '<td width="60%"><div class="btFs ml20 mt20" id="wn_name_00">' + json[0].ssid + '</div><div class="green ml20">Channel:<span class="channel_00">' + json[0].channel + '</span> </div><div class="green ml20" id="wn_openStatus_00">' + json[0].encryption + '</div></td>';
                // str += '<td width="25%"><div class="mt10"><img class="imgIcon" src="images/icon-wifi01.png"></div><div class="mt10"><span id="signal_00">' + json[0].signal + '</span>%</div></td>';
                // str += '<td><img src="images/icon-info.png"></td>';
                // str += '</tr>';
                str += '<tr><td colspan="3" class="fsFw"><div class="ml20 ">Available networks</div></td></tr>';
                for (var index in json) {
                    str += '<tr>';
                    str += '<td width="60%"><div class="btFs ml20 mt20" id="wn_name_00">' + json[index].ssid + '</div><div class="green ml20">Channel:<span class="channel_00">' + json[index].channel + '</span> <span class="green ml20" id="wn_openStatus_00">encryption:' + json[index].encryption + '</span><span class="green ml20">mode:' + json[index].mode + '</span><span class="green ml20">bssid:' + json[index].bssid + '</span></div></td>';
                    str += '<td width="25%"><div class="mt10"><img class="imgIcon" src="images/icon-wifi01.png"></div><div class="mt10"><span id="signal_00">' + json[index].signal + '</span>%</div></td>';
                    // str += '<td><img src="images/icon-info.png"></td>';
                    str += '</tr>';
                }
                str += '<tr><td colspan="3"><img src="images/icon-add.png" style="margin-top:-6px !important;margin-left:18px"><span data-toggle="modal" data-target="#myModal" class="addN">Add network</span></td></tr>';
                str += '</table>'

                $(".mCont").html(str);

                var $img = $(".imgIcon");
                // for (var i = 0; i < $img.length; i++) {
                //     console.log($img[i]);
                // }

                if (json == '' || json == undefined || json == null || json.length < 1) return;
                for (let i = 0; i < json.length; i++) {
                    var signal = json[i].signal;
                    if (signal);
                    if (signal == 0) {
                        $img.eq(i).attr("src", "/images/signal-0.png");
                    } else if (signal <= 25) {
                        $img.eq(i).attr("src", "/images/signal-0-25.png");
                    } else if (signal <= 50) {
                        $img.eq(i).attr("src", "/images/signal-25-50.png");
                    } else if (signal <= 75) {
                        $img.eq(i).attr("src", "/images/signal-50-75.png");
                    } else if (signal <= 100) {
                        $img.eq(i).attr("src", "/images/signal-75-100.png");
                    }
                } 
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