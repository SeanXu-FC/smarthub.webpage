var frequency = 0;
var queryWifiListTimer = null;
var queryStatusTimerout = null;
var wifiListTimerQueryFlag = false; //其他操作正在进行需要中断定时查询wifi列表标志
$(function() {
    $(".Back").prop("disabled", true);
    $(".Back").css("opacity", "0.5");
    layui.use(['form', 'layer'], function() {
        var form = layui.form;
        var layer = layui.layer;
        getWLANScan(layer, form);
    });
    $(window).on('beforeunload', function() {
        clearInterval(timer);
        clearTimerPollingWifiList();
        clearTimeout(queryStatusTimerout);
    });
    $(".Continue").click(function() {
        var domain = window.location.host;
        window.location.href = ('https:' == document.location.protocol ?
            'https://' : 'http://') + domain + "/setupWizard-2.html";
    })
})


function getWLANScan(layer, form) {
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
                    TimerPollingWifiList(); //开启每隔15s获取wifi列表
                }, 3000);

            } else if (res.error) {
                if (res.error.code == "090705") {
                    changeSwitchStatus(layer, loading, 1);
                    return;
                }
                $("#none_wifiList").children("img").hide();
                //$("#none_wifiList").children("span").text(res.error.message)
                setTimeout(() => {
                    getWLANData(layer, loading);
                    TimerPollingWifiList(); //开启每隔15s获取wifi列表
                }, 3000);
            }

        },
        error: function(jqXHR) {
            console.log("Error message", JSON.stringify(jqXHR))
            frequency++;
            if (frequency < 5) {
                setTimeout(() => {
                    getWLANScan(layer);
                }, 3000);
            } else {
                frequency = 0;
                parent.layer.close(loading);
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication, please try again later!</div>';
                promptMessage("Error message", tip);
            }
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
            if (res.result && res.result.ap_list && res.result.ap_list.length > 0) {
                var json = res.result.ap_list;
                json.sort(arrSort("rssi"));
                sessionStorage.setItem('wifiJson', JSON.stringify(json));
                renderWifiList(json);
                $(".search-container").hide();
            } else if (res.result && res.result.ap_list && res.result.ap_list.length < 1) { //返回列表为空再请求两次
                frequency++;
                if (frequency < 3) {
                    setTimeout(() => {
                        getWLANData(layer, loading);
                    }, 5000);
                } else {
                    frequency = 0;
                    $(".search-container").hide();
                    parent.layer.close(loading);
                }
            } else if (res.error) {
                layer.msg("An error occurred：" + res.error.message);
                $(".search-container").hide();
            }  
            //sessionStorage.setItem('clickFlag', true);

        },
        error: function(jqXHR) {
            console.log("Error message", JSON.stringify(jqXHR));
            frequency++;
            if (frequency < 5) {
                setTimeout(() => {
                    getWLANData(layer, loading);
                }, 3000);
            } else {
                frequency = 0;
                $(".search-container").hide();
                parent.layer.close(loading);
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication, please try again later!</div>';
                promptMessage("Error message", tip);
            }
        }
    });
}

function changeSwitchStatus(layer, loading, checked) {
    var data = {
        "jsonrpc": "2.0",
        "method": "WlanStationConfig",
        "params": {
            "operate_code": checked
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
            if (res.result) {
                if (res.result.error_code && res.result.error_code == 1) {
                    var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + res.result.error_msg + '!</div>';
                    promptMessage("Error message", tip);
                } else {
                    if (checked) {
                        $(".network-c").show();
                        $("#WLAN_list_c").show();
                        $("#WLAN_list_c").html("");
                        getWLANScan(layer, loading);
                    } else {
                        $(".network-c").hide();
                        $("#WLAN_list_c").hide();
                    }
                }

            } else if (res.error) {
                layer.msg("An error occurred：" + res.error.message);
            }


        },
        error: function(jqXHR) {
            console.log("Error message", JSON.stringify(jqXHR));
            frequency++;
            if (frequency < 5) {
                setTimeout(() => {
                    changeSwitchStatus(layer, loading, 1);
                }, 3000);
            } else {
                frequency = 0;
                parent.layer.close(loading);
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication, please try again later!</div>';
                promptMessage("Error message", tip);
            }
        }
    });
}
//开启每隔15s获取wifi列表定时器
function TimerPollingWifiList() {
    clearTimerPollingWifiList();
    console.log("15s获取wifi列表重新开启")
    wifiListTimerQueryFlag = false;
    queryWifiListTimer = setInterval(function() {
        if (wifiListTimerQueryFlag) { //在每隔15s执行进来的时候都要判断此时此刻有没有被其他操作打断，有其他操作，关闭定时器
            clearInterval(queryWifiListTimer);
        } else { //没有其他操作打断则继续执行
            console.log("15s获取wifi列表执行中")
            layui.use(['form', 'layer'], function() {
                var layer = layui.layer;
                getWLANData(layer);
            });
        }
    }, 15 * 1000)
}
//关闭每隔15s获取wifi列表定时器
function clearTimerPollingWifiList() {
    wifiListTimerQueryFlag = true;
    clearInterval(queryWifiListTimer); //关闭每隔15s获取wifi列表定时器
    console.log("15s获取wifi列表终止")
}
//渲染wifi列表
function renderWifiList(json) {
    $("#set_wizard_c").html("");
    var str = "",
        savedStr = "",
        encryptStr = "",
        ConnectedStr = "",
        ConnectedClass = "",
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
                ConnectedClass = "color-green";
                if (2400 < Number(json[i].freq) && Number(json[i].freq) < 2900) {
                    ConnectedStr = "Connected (2.4GHz)";
                } else if (5100 < Number(json[i].freq) && Number(json[i].freq) < 5900) {
                    ConnectedStr = "Connected (5GHz)";
                }
            } else if (json[i].is_connected == 2) {
                ConnectedClass = "color-red";
                ConnectedStr = "No internet";
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
            //str += '<div class="row setWifi-item -flex-display -justify-box" id="wifi_tips' + i + '"><input class="dom_saved_data" value="" bssid="' + json[i].bssid + '" encrypt="' + json[i].encrypt + '" freq="' + json[i].freq + '" is_connected="' + json[i].is_connected + '" is_saved="' + json[i].is_saved + '" rssi="' + json[i].rssi + '" ssid="' + json[i].ssid + '" style="display:none;"><div class="-radio-flex"><div class="myAp wifi-name wifi-name-green">' + json[i].ssid + '</div><div class="c9"><img class="connecting-img" src="images/loading.gif" /><span id="Connecting-status" class="color-green">' + ConnectedStr + '</span></div></div><div class=""><img class="wifi-icon" src="images/' + wifiImg + '"></div></div>'
            //有感叹号图标
            str += '<div class="row -flex-display -justify-box concected-wifi" id="wifi_tips' + i + '"><input class="dom_saved_data" value="" bssid="' + json[i].bssid + '" encrypt="' + json[i].encrypt + '" freq="' + json[i].freq + '" is_connected="' + json[i].is_connected + '" is_saved="' + json[i].is_saved + '" rssi="' + json[i].rssi + '" ssid="' + json[i].ssid + '" style="display:none;"><div class="-radio-flex"><div class="myAp wifi-name wifi-name-green">' + json[i].ssid + '</div><div class="c9"><img class="connecting-img" src="images/loading.gif" /><span id="Connecting-status" class="' + ConnectedClass + '">' + ConnectedStr + '</span></div></div><div class=""><img class="wifi-icon" src="images/' + wifiImg + '"></div><div class=""><img class="detail-wifi-icon" src="images/icon-info.png"></div></div>'
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
            } else if (json[j].encrypt == "[OPEN]" && json[j].is_saved == 0) {
                savedStr = "";
            } else {
                savedStr = "Encrypted";
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
            str += '<div class="row setWifi-item -flex-display -justify-box wifi" style="margin-bottom:13px;" id="wifi_tips' + j + '"><input class="dom_saved_data" value="" bssid="' + json[j].bssid + '" encrypt="' + json[j].encrypt + '" freq="' + json[j].freq + '" is_connected="' + json[j].is_connected + '" is_saved="' + json[j].is_saved + '" rssi="' + json[j].rssi + '" ssid="' + json[j].ssid + '" style="display:none;"><div class="-radio-flex"><div class="wifi-name-set">' + json[j].ssid + '</div><div class="c9" style="padding-left:0">' + savedStr + '</div></div><div class=""><img class="wifi-icon" src="images/' + wifiImg + '"></div></div>'
        }
    }
    str += ' <div class="row mt-30 add-Available-networks" style="display: flex;"><div class="col-md-2 pl-0"><div><img src="images/icon-add.png"></div></div><div class="col-md-10"><span class="addN">Add network</span></div></div>'
    $("#set_wizard_c").html(str);
    bindEvent();
}
var tipIndex = null;
var timer = null; //定时器
//绑定事件
function bindEvent() {
    $('.setWifi-item').hover(function() {
        var infoHtml = $(this).children(".dom_saved_data");
        var ssid = infoHtml.attr("ssid");
        var freq = infoHtml.attr("freq");
        var bssid = infoHtml.attr("bssid");
        var encrypt = infoHtml.attr("encrypt");
        var tipId = $(this).attr("id");
        if (2400 < freq && freq < 2900) {
            freq = "2.4GHz"
        } else if (5030 < freq && freq < 5900) {
            freq = "5GHz"
        }
        var tipStr = '<div class="tips-c"><div class="-flex-dis"><span class="tip-l">Ssid: </span><span class="tip-r"> ' + ssid + '</span></div><div class="-flex-dis"><span class="tip-l">Frequency band: </span><span class="tip-r"> ' + freq + '</span></div><div class="-flex-dis"><span class="tip-l">Security: </span><span class="tip-r"> ' + encrypt + '</span></div><div class="-flex-dis"><span class="tip-l">MAC address: </span><span class="tip-r"> ' + bssid + '</span></div></div>'
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
    $('.wifi').on('click', function() {
        var infoHtml = $(this).children(".dom_saved_data");
        $("#saved_id").attr("passwordIncorrect", "");
        enterPasswordHtml(infoHtml);
    });
    $('.add-Available-networks').on('click', function() {
        $(".layui-layer").css("background", "none");
        $("#saved_id").val("").attr("encrypt", "None").attr("passwordIncorrect", "");
        addNetworkHtml();

    });
    $('.detail-wifi-icon').on('click', function() {
        var infoHtml = $(this).parents().siblings(".dom_saved_data");
        wifiHtmlDetail(infoHtml);
    });
}

var clickFlag = true; //禁止连续多次点击
function wifiHtmlDetail(infoHtml) {
    clearTimerPollingWifiList(); //其他操作正在进行需要中断定时查询wifi列表
    if (clickFlag) {
        clickFlag = false;
        var ssid = infoHtml.attr("ssid");
        var bssid = infoHtml.attr("bssid");
        var data = {
            "jsonrpc": "2.0",
            "method": "WlanStationConfig",
            "params": {
                "operate_code": 5,
                "ssid": ssid,
                "bssid": bssid ? bssid : "",
            },
            "id": "9.1"
        };
        data = JSON.stringify(data);
        $.ajax({
            type: "post",
            timeout: 7000,
            url: "/action/action",
            data: data,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function(res) {
                clickFlag = true;
                if (res.result && res.result.status) {
                    forgetWifiHtml(infoHtml);
                } else if (res.error) {
                    layui.use(['form', 'layer'], function() {
                        var layer = layui.layer;
                        layer.msg("An error occurred：" + res.error.message);
                    })
                } else {
                    layui.use(['form', 'layer'], function() {
                        var layer = layui.layer;
                        layer.msg("WiFi is not connected, unable to get details", { time: 3000 });
                    })
                }
            },
            error: function(jqXHR) {
                console.log("Error message", JSON.stringify(jqXHR))
                clickFlag = true;
                var tip =
                    '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication, please try again later!</div>';
                promptMessage("Error message", tip);
            }
        })
    }

}
//删除/忘记wifi
function forgetWifiHtml(infoHtml) {
    var ssid = infoHtml.attr("ssid");
    var bssid = infoHtml.attr("bssid");
    var encrypt = infoHtml.attr("encrypt");
    var is_saved = infoHtml.attr("is_saved");
    var is_connected = infoHtml.attr("is_connected");


    //iframe层
    parent.layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        shade: 0.8,
        area: ['534px', '585px'],
        //area: '534px',
        content: ["WirelessNameInfo.html?ssid=" + ssid + "&bssid=" + bssid + "&encrypt=" + encrypt + "&is_saved=" + is_saved, 'no'],
        end: function() {
            var connectingSsid = $("#saved_id").val();
            var connectingBssid = $("#saved_id").attr("bssid");
            var wifiJson = JSON.parse(sessionStorage.getItem('wifiJson'));
            if (connectingSsid && connectingBssid) {
                clearTimerPollingWifiList(); //其他操作正在进行需要中断定时查询wifi列表
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
            } else {
                TimerPollingWifiList(); //开启每隔15s获取wifi列表
            }

        }
    });
    $(window).resize();
}
//弹出输入密码事件
function enterPasswordHtml(infoHtml) {
    clearTimerPollingWifiList(); //其他操作正在进行需要中断定时查询wifi列表
    var ssid = infoHtml.attr("ssid");
    var bssid = infoHtml.attr("bssid");
    var encrypt = infoHtml.attr("encrypt");
    var is_saved = infoHtml.attr("is_saved");
    if (is_saved == 1) { //已保存，直接连接
        savedWifiConnect(ssid, bssid, encrypt, infoHtml);
        return;
    }
    if (encrypt.indexOf(("[OPEN]")) != -1) {
        noPWDWifiConnect(ssid, bssid, is_saved);
        return;
    }
    //iframe层
    parent.layer.open({
        type: 2,
        title: false,
        //shadeClose: true,
        shade: 0.8,
        area: ['521px', '360px'],
        content: ['EnterPassword.html?ssid=' + ssid + "&bssid=" + bssid + "&encrypt=" + encrypt + "&is_saved=" + is_saved, 'no'],
        end: function() {
            var connectingSsid = $("#saved_id").val();
            var connectingBssid = $("#saved_id").attr("bssid");
            var wifiJson = JSON.parse(sessionStorage.getItem('wifiJson'));

            if (connectingSsid && connectingBssid) {
                clearTimerPollingWifiList(); //其他操作正在进行需要中断定时查询wifi列表
                for (var i = 0; i < wifiJson.length; i++) {
                    if (wifiJson[i].is_connected == 1 || wifiJson[i].is_connected == 2) {
                        wifiJson[i].is_connected = 0;
                    }
                    if (connectingSsid == wifiJson[i].ssid && connectingBssid == wifiJson[i].bssid) {
                        wifiJson[i].is_connected = 9;
                    }
                }
                renderWifiList(wifiJson);
                document.getElementById("set_wizard_c").scrollTop = 0;
                clearInterval(timer);
                $(".connecting-img").show();
                timer = setInterval(function() {
                    pollingWifiStatus(infoHtml, "EnterPassword");
                }, 3000)
            } else {
                TimerPollingWifiList(); //开启每隔15s获取wifi列表
            }

        }
    });
}
//新增wifi并连接
function addNetworkHtml() {
    clearTimerPollingWifiList(); //其他操作正在进行需要中断定时查询wifi列表
    parent.layer.open({
        type: 2,
        title: false,
        //shadeClose: true,
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
                is_connected: 9
            }
            wifiJson.unshift(newWifi);
            if (connectingSsid && connectingEncrypt) {
                console.log(connectingSsid)
                clearTimerPollingWifiList(); //其他操作正在进行需要中断定时查询wifi列表
                for (var i = 0; i < wifiJson.length; i++) {
                    wifiJson[i].is_connected = 0;
                    if (connectingSsid == wifiJson[i].ssid && connectingEncrypt == wifiJson[i].encrypt) {
                        wifiJson[i].is_connected = 9;
                    }
                }
                renderWifiList(wifiJson);
                $("#set_wizard_c .connecting-img").show();
                clearInterval(timer);
                timer = setInterval(function() {
                    pollingWifiStatus("", "AddNetwork");
                }, 3000)
                document.getElementById("set_wizard_c").scrollTop = 0;
            } else {
                TimerPollingWifiList(); //开启每隔15s获取wifi列表
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
                if (res.result.status == "Connect Error") {
                    clearInterval(timer);
                    $(".connecting-img").hide();
                    var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Connect Error!</div>';
                    promptMessagePoll("Error message", tip, updateWifiList);
                    TimerPollingWifiList(); //开启每隔15s获取wifi列表
                }
                if (res.result.status == "Connected") {
                    clearInterval(timer);
                    updateWifiList();
                    $(".connecting-img").hide();
                    TimerPollingWifiList(); //开启每隔15s获取wifi列表
                }
                if (res.result.status == "Connected" && type == "AddNetwork") { //新增WiFi并连接，调接口返回列表不会马上有新路由，只能手动先添加进缓存列表，等连接上后，再调接口获取有新WiFi的列表，区更新wifi列表和缓存数据
                    $(".connecting-img").hide();
                    updateWifiList();
                    TimerPollingWifiList(); //开启每隔15s获取wifi列表
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
                                wifiJson[i].is_connected = 9;
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
            } else if (res.error && res.error.message == "WLAN DEVICE NOT READY") {
                clearInterval(timer);
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + res.error.message + '</div>';
                promptMessage("Error message", tip);
            }
        },
        complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数           
            if (status == 'timeout') { //超时,status还有success,error等值的情况
                console.log(status)
                ajaxTimeout.abort();
            }
        },
        error: function(jqXHR) {
            queryStatusTimerout = setTimeout(() => {
                pollingWifiStatus();
            }, 5000);
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
                var wifiJson = JSON.parse(sessionStorage.getItem('wifiJson'));
                if (ssid && bssid) {
                    for (var i = 0; i < wifiJson.length; i++) {
                        if (wifiJson[i].is_connected == 1 || wifiJson[i].is_connected == 2) {
                            wifiJson[i].is_connected = 0;
                        }
                        if (ssid == wifiJson[i].ssid && bssid == wifiJson[i].bssid) {
                            wifiJson[i].is_connected = 9;
                        }
                    }
                    renderWifiList(wifiJson);
                    if (res.result.status == "Password Incorrect") {
                        $("#saved_id").attr("passwordIncorrect", "enterWifiIncorrect");
                        infoHtml.attr("is_saved", 0);
                        enterPasswordHtml(infoHtml);
                    } else {
                        $("#Connecting-status").text(res.result.status);
                        clearInterval(timer);
                        $(".connecting-img").show();
                        timer = setInterval(function() {
                            pollingWifiStatus(infoHtml, "EnterPassword");
                        }, 3000)
                    }

                }
                document.getElementById("set_wizard_c").scrollTop = 0;

            } else if (res.error) {
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("An error occurred：" + res.error.message);
                })
                TimerPollingWifiList(); //开启每隔15s获取wifi列表
            }
        },
        error: function(jqXHR) {
            console.log("Error message", JSON.stringify(jqXHR))
            frequency++;
            if (frequency < 3) {
                setTimeout(() => {
                    savedWifiConnect(ssid, bssid, encrypt, infoHtml);
                }, 5000);
            } else {
                frequency = 0;
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication, please try again later!</div>';
                promptMessage("Error message", tip);
                TimerPollingWifiList(); //开启每隔15s获取wifi列表
            }
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
            "is_saved": Number(is_saved),
            //"psk": "",
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
            TimerPollingWifiList(); //开启每隔15s获取wifi列表
            if (res.result) {
                var wifiJson = JSON.parse(sessionStorage.getItem('wifiJson'));
                if (ssid && bssid) {
                    for (var i = 0; i < wifiJson.length; i++) {
                        if (wifiJson[i].is_connected == 1 || wifiJson[i].is_connected == 2) {
                            wifiJson[i].is_connected = 0;
                        }
                        if (ssid == wifiJson[i].ssid && bssid == wifiJson[i].bssid) {
                            wifiJson[i].is_connected = 9;
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
                document.getElementById("set_wizard_c").scrollTop = 0;

            } else if (res.error) {
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("An error occurred：" + res.error.message);
                })
            }
        },
        error: function(jqXHR) {
            console.log("Error message", JSON.stringify(jqXHR))
            frequency++;
            if (frequency < 3) {
                setTimeout(() => {
                    noPWDWifiConnect(ssid, bssid, is_saved);
                }, 5000);
            } else {
                frequency = 0;
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication, please try again later!</div>';
                promptMessage("Error message", tip);
                TimerPollingWifiList(); //开启每隔15s获取wifi列表
            }
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

function promptMessagePoll(title, content, fn) {
    layui.use(['layer'], function() {
        var layer = layui.layer;
        layer.open({
            type: 1,
            id: 'layerDemo1', //防止重复弹出   
            title: title,
            content: content,
            btn: 'close',
            btnAlign: 'c', //按钮居中 
            closeBtn: 0,
            shade: 0, //不显示遮罩                            
            yes: function(index) {
                layer.close(index);
                fn();
            }
        });
    })
}