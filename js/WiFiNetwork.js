var layer, form, swithcData;
var frequency = 0;
var frequencyWifiList = 0;
var tipIndex = null;
var timer = null; //8轮询定时器
var queryWifiListTimer = null;
var queryStatusTimerout = null;
var wifiListTimerQueryFlag = false; //其他操作正在进行需要中断定时查询wifi列表标志
$(function() {
        document.body.style.zoom = 0.57;
        layui.use(['form', 'layer'], function() {
            form = layui.form;
            layer = layui.layer;
            getSwitchStatus(layer, form);
            form.on('switch(switchTest)', function(data) {
                // swithcData = data;
                // swithcData.othis[0].classList.remove('layui-form-onswitch'); //switch失能
                // console.log(swithcData.othis[0])
                //     // setTimeout(() => {
                //     //     swithcData.othis[0].classList.add('layui-form-onswitch');
                //     // }, 3000);
                // return;
                var checked = data.elem.checked;
                changeSwitchStatus(layer, form, checked)
            });
        });
        $(window).on('beforeunload', function() {
            clearInterval(timer);
            clearInterval(queryWifiListTimer);
            clearTimeout(queryStatusTimerout);
        });
    })
    //开启每隔15s获取wifi列表定时器
function TimerPollingWifiList() {
    clearTimerPollingWifiList();
    wifiListTimerQueryFlag = false;
    queryWifiListTimer = setInterval(function() {
        if (wifiListTimerQueryFlag) { //在每隔15s执行进来的时候都要判断此时此刻有没有被其他操作打断，有其他操作，关闭定时器
            clearInterval(queryWifiListTimer);
        } else { //没有其他操作打断则继续执行

            layui.use(['form', 'layer'], function() {
                var layer = layui.layer;
                var loading = layer.load(0, {
                    shade: [0.5, '#fff'],
                });
                getWLANData15s(layer, loading);
            });
        }
    }, 15 * 1000)
}
//关闭每隔15s获取wifi列表定时器
function clearTimerPollingWifiList() {
    wifiListTimerQueryFlag = true;
    clearInterval(queryWifiListTimer); //关闭每隔15s获取wifi列表定时器

}

function getSwitchStatus(layer, form) {
    var loading = parent.layer.load(0, {
        shade: [0.5, '#fff'],
    });
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
            frequency = 0;
            parent.layer.close(loading);

            if (res.result) {
                if (res.result.status == "WLAN_ON") {
                    $("#WLAN_swtich").attr("checked", "checked");
                    $(".network-c").show();
                    $("#WLAN_list_c").show();
                    $(".search-container").show();

                    getWLANScan(layer);

                    TimerPollingWifiList(); //开启每隔15s获取wifi列表
                } else {
                    $("#WLAN_swtich").removeAttr("checked");
                    $("#WLAN_swtich_c").hide();
                    form.render();
                    $(".network-c").hide();
                    $("#WLAN_list_c").hide();
                    $(".search-container").hide();

                }
                form.render();
                $("#WLAN_swtich_c").show();
            } else if (res.error) {
                layer.msg(res.error.message);

                TimerPollingWifiList(); //开启每隔15s获取wifi列表
            }

        },
        error: function(jqXHR) {
            console.log(JSON.stringify(jqXHR))
            frequency++;
            if (frequency < 5) {
                setTimeout(() => {
                    layui.use(['form', 'layer'], function() {
                        var form = layui.form;
                        var layer = layui.layer;
                        getSwitchStatus(layer, form);
                    });
                }, 5000);
            } else {
                frequency = 0;
                parent.layer.close(loading);
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication!</div>';
                promptMessage("Error message", tip);
            }
        }
    });
}

function changeSwitchStatus(layer, form, checked) {
    clearTimerPollingWifiList(); //其他操作正在进行需要中断定时查询wifi列表
    var loading = layer.load(0, {
        shade: [0.5, '#fff'],
    });
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
            //swithcData.othis[0].classList.remove('layui-form-onswitch'); //switch失能
            layer.close(loading);
            if (res.result) {
                if (res.result.error_code && res.result.error_code == 1) {
                    if (mode) {
                        $("#WLAN_swtich_c input").removeAttr("checked");
                    } else {
                        $("#WLAN_swtich_c input").attr("checked", "checked");
                    }
                    form.render();
                    var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + res.result.error_msg + '!</div>';
                    promptMessage("Error message", tip);
                } else {
                    if (mode) {

                        $(".network-c").show();
                        $("#WLAN_list_c").show();
                        $(".search-container").show();
                        $("#WLAN_list_c").html("");

                        getWLANScan(layer);

                        TimerPollingWifiList(); //开启每隔15s获取wifi列表
                    } else {

                        $(".network-c").hide();
                        $("#WLAN_list_c").hide();
                        $(".search-container").hide();
                    }
                }
            } else if (res.error) {
                layer.msg("An error occurred：" + res.error.message);
                if (mode == 0) { //mode == 0没有关闭成功，所以开关还是打开的，需要轮询更新

                    TimerPollingWifiList(); //开启每隔15s获取wifi列表
                }

            }


        },
        error: function(jqXHR) {
            console.log(JSON.stringify(jqXHR))
                //swithcData.othis[0].classList.remove('layui-form-onswitch'); //switch失能
            layer.close(loading);
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication, please try again later!</div>';
            promptMessage("Error message", tip);
        }
    });
}

function getWLANScan(layer) {
    var loading = parent.layer.load(0, {
        shade: [0.5, '#fff'],
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
            frequency = 0;
            if (res.result && res.result.status == "WlanStationConfig Scan Done") {
                setTimeout(() => {
                    getWLANData(layer, loading);
                }, 3000);
            } else if (res.error) {
                $("#none_wifiList").children("img").hide();
                //$("#none_wifiList").children("span").text(res.error.message)
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
            console.log(JSON.stringify(jqXHR))
            frequency++;
            if (frequency < 5) {
                setTimeout(() => {

                    getWLANScan(layer);
                }, 3000);
            } else {
                frequency = 0;
                parent.layer.close(loading);
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication!</div>';
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
            frequency = 0;
            if (res.result && res.result.ap_list && res.result.ap_list.length > 0) {
                var json = res.result.ap_list;
                json.sort(arrSort("rssi"));
                sessionStorage.setItem('wifiJson', JSON.stringify(json));
                $(".search-container").hide();
                parent.layer.close(loading);
                renderWifiList(json);

            } else if (res.result && res.result.ap_list && res.result.ap_list.length < 1) { //返回列表为空再请求两次
                frequencyWifiList++;
                if (frequencyWifiList < 3) {
                    setTimeout(() => {
                        getWLANData(layer, loading);
                    }, 5000);
                } else {
                    frequencyWifiList = 0;
                    $(".search-container").hide();
                    parent.layer.close(loading);
                }
            } else if (res.error) {
                parent.layer.close(loading);
                $(".search-container").hide();
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + res.error.message + '</div>';
                promptMessage("Error message", tip);
            }   

        },
        error: function(jqXHR) {
            console.log(JSON.stringify(jqXHR))
            frequency++;
            if (frequency < 5) {
                setTimeout(() => {
                    getWLANData(layer, loading);
                }, 3000);
            } else {
                frequency = 0;
                $(".search-container").hide();
                parent.layer.close(loading);
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication!</div>';
                promptMessage("Error message", tip);
            }
        }
    });
}
//15s获取wifi列表
function getWLANData15s(layer, loading) {

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
            frequency = 0;
            layer.close(loading);
            if (res.result && res.result.ap_list && res.result.ap_list.length > 0) {
                var json = res.result.ap_list;
                json.sort(arrSort("rssi"));
                sessionStorage.setItem('wifiJson', JSON.stringify(json));
                $(".search-container").hide();
                renderWifiList(json);
            }
        },
        error: function(jqXHR) {
            console.log(JSON.stringify(jqXHR))
            layer.close(loading);

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
        ConnectedClass = "",
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
            } else if (json[i].is_connected == 2) {
                //ConnectedClass = "color-red"
                ConnectedStr = "No internet";
            } else {
                ConnectedStr = "Connecting";
            }
            str += '<tr class="connected-wifi"><td class="col-md-8" ><div class="wifi-name wifi-name-green">' + json[i].ssid + '</div><div class=" c9 Connected-24GHz" style="padding-left:0"><img class="connecting-img" src="images/loading.gif" /><span id="Connecting-status" class="' + ConnectedClass + '">' + ConnectedStr + '</span></div></td><td><div class="col-md-2">'
            signal = Math.abs(json[i].rssi);
            if (100 > signal && signal >= 85) {
                wifiImg = "s_wifi_02a.png";
            } else if (85 > signal && signal >= 70) {
                wifiImg = "s_wifi_03a.png";
            } else if (70 > signal && signal >= 55) {
                wifiImg = "s_wifi_04a.png";
            } else if (55 > signal) {
                wifiImg = "s_wifi_05a.png";
            }

            str += '<img class="wifi-icon" src="images/' + wifiImg + '"></div></td><td style="padding-left: 0;"><div id="wifi_infoIcon" class="col-md-2 wireless"><img src="images/icon-info.png" style="display: inline-block;margin-left:3px;margin-top:5px;"></div></td><td class="wifi-info" style="display:none"><span class="save-wifi-info" bssid="' + json[i].bssid + '" encrypt="' + json[i].encrypt + '" freq="' + json[i].freq + '" is_connected="' + json[i].is_connected + '" is_saved="' + json[i].is_saved + '" rssi="' + json[i].rssi + '" ssid="' + json[i].ssid + '"></span></td></tr>'

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
                wifiImg = "s_wifi_02a.png";
            } else if (85 > signal && signal >= 70) {
                wifiImg = "s_wifi_03a.png";
            } else if (70 > signal && signal >= 55) {
                wifiImg = "s_wifi_04a.png";
            } else if (55 > signal) {
                wifiImg = "s_wifi_05a.png";
            }
            if (json[j].is_saved != 0) {
                savedStr = "Saved";
            } else if (json[j].encrypt == "[OPEN]" && json[j].is_saved == 0) {
                savedStr = "";
            } else {
                savedStr = "Encrypted";
            }
            str += '<tr class="tip-dom" id="wifi_tips' + j + '"><td class="col-md-8 wifi"><div class="wifi-name">' + json[j].ssid + '</div><div class=" c9 Connected-24GHz" style="padding-left:0">' + savedStr + '</div></td><td><div class="col-md-2"><img class="wifi-icon" src="images/' + wifiImg + '"></div></td><td style="padding-left: 0;"><div class="col-md-2 wireless wifi-infoIcon"><img src="images/icon-info.png" style="display: inline-block;margin-left:3px;margin-top:5px;"></div></td><td class="wifi-info"  style="display:none"><span class="save-wifi-info" bssid="' + json[j].bssid + '" encrypt="' + json[j].encrypt + '" freq="' + json[j].freq + '" is_connected="' + json[j].is_connected + '" is_saved="' + json[j].is_saved + '" rssi="' + json[j].rssi + '" ssid="' + json[j].ssid + '"></span></td></tr>'
        }
    }
    str += '<tr><td colspan="3" class="add-Available-networks"><div class="col-md-2" style="padding-left:0"><img src="images/icon-add.png" style="display: inline-block;"></div><div class="col-md-10"><span style="display: inline-block;margin-top:3px;margin-left:-10px;" class="addN">Add network</span></div></td></tr></table>';
    $("#WLAN_list_c").html(str);
    bindEvent();
}

//绑定事件
function bindEvent() {


    // $('.Rectangle-1205 .wifi-table .tip-dom').hover(function() {
    //     var infoHtml = $(this).children(".wifi-info").children("span");
    //     var ssid = infoHtml.attr("ssid");
    //     var freq = infoHtml.attr("freq");
    //     var bssid = infoHtml.attr("bssid");
    //     var encrypt = infoHtml.attr("encrypt");
    //     var tipId = $(this).attr("id");

    //     if (2400 < freq && freq < 2900) {
    //         freq = "2.4GHz"
    //     } else if (5030 < freq && freq < 5900) {
    //         freq = "5GHz"
    //     }
    //     var tipStr = '<div class="tips-c"><div class="-flex-dis"><span class="tip-l">Ssid:</span><span class="tip-r">' + ssid + '</span></div><div class="-flex-dis"><span class="tip-l">Frequency band:</span><span class="tip-r">' + freq + '</span></div><div class="-flex-dis"><span class="tip-l">Security:</span><span class="tip-r">' + encrypt + '</span></div><div class="-flex-dis"><span class="tip-l">MAC address:</span><span class="tip-r">' + bssid + '</span></div></div>'
    //     layui.use('layer', function() {
    //         var layer = layui.layer;
    //         tipIndex = layer.tips(tipStr, "#" + tipId, {
    //             area: ['auto', 'auto'],
    //             time: 0,
    //             tips: [1, "#f9f9f9"]
    //         });
    //     });
    // }, function() {
    //     layer.close(tipIndex)
    // });

    $(".wifi-infoIcon").on('click', function() {
        var infoHtml = $(this).parents("tr").children(".wifi-info").children("span");
        var ssid = infoHtml.attr("ssid");
        var freq = infoHtml.attr("freq");
        var bssid = infoHtml.attr("bssid");
        var encrypt = infoHtml.attr("encrypt");
        var is_saved = infoHtml.attr("is_saved");

        var signal = infoHtml.attr("rssi");

        if (is_saved == 1) {
            forgetSavedWifi(infoHtml);
        } else {
            signal = Math.abs(signal);

            if (signal < 70) {

                signal = "Good";
            } else if (signal >= 70) {

                signal = "Weak";
            }

            if (2400 < freq && freq < 2900) {
                freq = "2.4GHz"
            } else if (5030 < freq && freq < 5900) {
                freq = "5GHz"
            }
            var tipStr = '<div class="tips-c"><div class="tip-title">' + ssid + '</div><div class="-flex-dis"><span class="tip-l">Signal strength:</span><span class="tip-r">' + signal + '</span></div><div class="-flex-dis"><span class="tip-l">Frequency band:</span><span class="tip-r">' + freq + '</span></div><div class="-flex-dis"><span class="tip-l">Security:</span><span class="tip-r">' + encrypt + '</span></div><div class="-flex-dis"><span class="tip-l">MAC address:</span><span class="tip-r">' + bssid + '</span></div></div>'
            promptWifiMessage(ssid, tipStr, infoHtml);
        }

    })



    //弹出一个iframe层
    $('.Rectangle-1205 .wifi').on('click', function() {
        var infoHtml = $(this).parents("tr").children(".wifi-info").children("span");
        $("#saved_id").attr("passwordIncorrect", "");
        enterPasswordHtml(infoHtml);
    });
    $('#wifi_infoIcon').on('click', function() {
        var infoHtml = $(this).parents("tr").children(".wifi-info").children("span");
        wifiHtmlDetail(infoHtml)
    });
    $('.add-Available-networks').on('click', function() {
        $(".layui-layer").css("background", "none");
        $("#saved_id").val("").attr("encrypt", "None").attr("passwordIncorrect", "");
        addNetworkHtml();

    });
}

function promptWifiMessage(title, content, infoHtml) {

    layui.use(['layer'], function() {
        var divWH = gitWinWH(512, 350);
        var layer = layui.layer;
        parent.layer.open({
            type: 1,
            id: 'wifi_some_info', //防止重复弹出   
            title: false,
            area: ['512px', '350px'],
            offset: [divWH.h, divWH.w],
            content: content,
            btn: 'Connect',
            btnAlign: 'r', //按钮居中 
            closeBtn: 1,
            shade: [0.4, '#000'], //不显示遮罩                            
            yes: function(index) {
                parent.layer.close(index);
                $("#saved_id").attr("passwordIncorrect", "");
                enterPasswordHtml(infoHtml);
            }
        });
    })
}
//新增wifi并连接
function addNetworkHtml() {
    clearTimerPollingWifiList(); //其他操作正在进行需要中断定时查询wifi列表
    var divWH = gitWinWH(540, 360);
    parent.layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        shade: 0.8,
        area: ['541px', '361px'],
        offset: [divWH.h, divWH.w],
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
                clearTimerPollingWifiList(); //其他操作正在进行需要中断定时查询wifi列表
                for (var i = 0; i < wifiJson.length; i++) {
                    wifiJson[i].is_connected = 0;
                    if (connectingSsid == wifiJson[i].ssid && connectingEncrypt == wifiJson[i].encrypt) {
                        wifiJson[i].is_connected = 9;
                    }
                }
                renderWifiList(wifiJson);
                clearInterval(timer);
                $(".connecting-img").show();
                timer = setInterval(function() {

                    pollingWifiStatus("", "AddNetwork", newWifi);
                }, 5000)

                document.getElementById("WLAN_list_c").scrollTop = 0;
            } else {

                TimerPollingWifiList(); //开启每隔15s获取wifi列表
            }
        }
    });
}

var clickFlag = true; //禁止连续多次点击
function wifiHtmlDetail(infoHtml) {
    if (clickFlag) {
        clickFlag = false;
        var is_connected = infoHtml.attr("is_connected");

        if (is_connected == 1 || is_connected == 2) {
            forgetWifiHtml(infoHtml);
        }
        setTimeout(() => {
            clickFlag = true;
        }, 2000);
        return;

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
    } else {
        layui.use(['form', 'layer'], function() {
            var layer = layui.layer;
            layer.msg("Loading, please do not click repeatedly!");
        })
    }

}
//删除/忘记wifi
function forgetWifiHtml(infoHtml) {
    clearTimerPollingWifiList(); //其他操作正在进行需要中断定时查询wifi列表
    var ssid = infoHtml.attr("ssid");
    ssid = escape(ssid);
    var bssid = infoHtml.attr("bssid");
    var encrypt = infoHtml.attr("encrypt");
    var is_saved = infoHtml.attr("is_saved");
    var is_connected = infoHtml.attr("is_connected");
    if (ssid && bssid) {} else {
        layui.use(['form', 'layer'], function() {
            var layer = layui.layer;
            layer.msg("WiFi is not connected, unable to get details", { time: 3000 });
        })
        return;
    }
    var divWH = gitWinWH(534, 584);
    //iframe层
    parent.layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        shade: 0.8,
        area: ['534px', '585px'],
        offset: [divWH.h, divWH.w],
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
                }, 5000)
            } else {

                TimerPollingWifiList(); //开启每隔15s获取wifi列表
            }

        }
    });
    $(window).resize();
}
//删除/忘记已经保存的wifi
function forgetSavedWifi(infoHtml) {
    clearTimerPollingWifiList(); //其他操作正在进行需要中断定时查询wifi列表
    var ssid = infoHtml.attr("ssid");
    ssid = escape(ssid);
    var bssid = infoHtml.attr("bssid");
    var encrypt = infoHtml.attr("encrypt");
    var is_saved = infoHtml.attr("is_saved");
    var is_connected = infoHtml.attr("is_connected");
    if (ssid && bssid) {} else {
        layui.use(['form', 'layer'], function() {
            var layer = layui.layer;
            layer.msg("WiFi is not connected, unable to get details", { time: 3000 });
        })
        return;
    }
    var divWH = gitWinWH(534, 464);
    //iframe层
    parent.layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        shade: 0.8,
        area: ['534px', '465px'],
        offset: [divWH.h, divWH.w],
        //area: '534px',
        content: ["SavedWifi.html?ssid=" + ssid + "&bssid=" + bssid + "&encrypt=" + encrypt + "&is_saved=" + is_saved, 'no'],
        end: function() {
            var connectingSsid = $("#saved_id").val();
            var connectingBssid = $("#saved_id").attr("bssid");
            var go_connect = $("#saved_id").attr("go_connect");
            var wifiJson = JSON.parse(sessionStorage.getItem('wifiJson'));
            if (connectingSsid && connectingBssid) {
                if (go_connect) { //点击连接按钮
                    enterPasswordHtml(infoHtml);
                    //savedWifiConnect(connectingSsid, connectingBssid, encrypt, infoHtml);
                } else {
                    clearTimerPollingWifiList(); //其他操作正在进行需要中断定时查询wifi列表
                    for (var i = 0; i < wifiJson.length; i++) {
                        if (connectingSsid == wifiJson[i].ssid && connectingBssid == wifiJson[i].bssid) {
                            wifiJson.splice(i, 1);
                            sessionStorage.setItem('wifiJson', JSON.stringify(wifiJson))
                        }
                    }
                    renderWifiList(wifiJson);
                    clearInterval(timer);
                    setTimeout(() => {
                        updateWifiList();
                    }, 500);


                    TimerPollingWifiList(); //开启每隔15s获取wifi列表
                }
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
    if (encrypt.indexOf(("[OPEN]")) != -1) { //无需密码直接连接
        noPWDWifiConnect(ssid, bssid, is_saved, infoHtml);
        return;
    }

    ssid = escape(ssid);
    var divWH = gitWinWH(520, 360);
    //iframe层
    parent.layer.open({
        type: 2,
        title: false,
        closeBtn: 0,
        shade: 0.8,
        area: ['521px', '360px'],
        offset: [divWH.h, divWH.w],
        content: ["EnterPassword.html?ssid=" + ssid + "&bssid=" + bssid + "&encrypt=" + encrypt + "&is_saved=" + is_saved, 'no'],
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
                clearInterval(timer);
                $(".connecting-img").show();
                timer = setInterval(function() {
                    pollingWifiStatus(infoHtml, "EnterPassword");
                }, 5000)
            } else {

                TimerPollingWifiList(); //开启每隔15s获取wifi列表
            }
        }
    });
}
//轮询当前wifi连接状态
function pollingWifiStatus(infoDOM, type, newWifi) {
    var timeout0 = 5000;
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
            frequency = 0;
            if (res.result && res.result.status) {
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
                    $(".connected-wifi .wifi-info span").attr("is_connected", "1");
                    $(".connected-wifi .wifi-info span").attr("bssid", res.result.bssid);
                    updateWifiList();
                    $(".connecting-img").hide();

                    TimerPollingWifiList(); //开启每隔15s获取wifi列表
                }
                if (res.result.status == "Connected" && type == "AddNetwork") { //新增WiFi并连接，调接口返回列表不会马上有新路由，只能手动先添加进缓存列表，等连接上后，再调接口获取有新WiFi的列表，区更新wifi列表和缓存数据
                    clearInterval(timer);
                    $(".connecting-img").hide();
                    $(".connected-wifi .wifi-info span").attr("is_connected", "1");
                    $(".connected-wifi .wifi-info span").attr("bssid", res.result.bssid);
                    updateWifiList();

                    TimerPollingWifiList(); //开启每隔15s获取wifi列表
                }

                if (res.result.status == "Password Incorrect" && type == "EnterPassword") { //密码错误从新弹框输入
                    clearInterval(timer);
                    $("#saved_id").attr("passwordIncorrect", "enterWifiIncorrect")
                    infoDOM.attr("is_saved", 0);
                    enterPasswordHtml(infoDOM, type);
                    timer = setInterval(function() {
                        pollingWifiStatus(infoDOM);
                    }, 5000)

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
                        if (res.result.status == "Password Incorrect") {
                            clearInterval(timer);
                            $(".connecting-img").hide();
                            infoDOM.attr("is_saved", "0");
                            $("#saved_id").attr("passwordIncorrect", "enterWifiIncorrect")
                            enterPasswordHtml(infoDOM);
                        }
                    } else {

                        TimerPollingWifiList(); //开启每隔15s获取wifi列表
                    }

                }
            } else if (res.error) {
                clearInterval(timer);
                if (res.error.message == "WLAN DEVICE NOT READY") {
                    layui.use(['form', 'layer'], function() {
                        var form = layui.form;
                        var layer = layui.layer;
                        getSwitchStatus(layer, form);
                    });
                } else {
                    var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + res.error.message + '</div>';
                    promptMessage("Error message", tip, fn);

                    TimerPollingWifiList(); //开启每隔15s获取wifi列表
                }
            }
        },
        // complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数       
        //     clearInterval(timer);
        //     console.log("关闭后", timer, status)
        //     if (status == 'timeout') { //超时,status还有success,error等值的情况
        //         console.log(status)
        //         ajaxTimeout.abort();
        //         frequency++;
        //         if (frequency < 5) {
        //             queryStatusTimerout = setTimeout(() => {
        //                 pollingWifiStatus();
        //             }, 5000);
        //         } else {
        //             frequency = 0;
        //             $(".search-container").hide();
        //             var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication!</div>';
        //             promptMessage("Error message", tip);
        //         }
        //     }
        // },
        error: function(jqXHR) {
            clearInterval(timer);

            frequency++;
            if (frequency < 5) {
                queryStatusTimerout = setTimeout(() => {
                    pollingWifiStatus();
                }, 5000);
            } else {
                frequency = 0;
                $(".search-container").hide();
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication!</div>';
                promptMessage("Error message", tip);
            }
        }
    });
}
//空函数，防止弹框跳首页
function fn() {};
//已经保存的WiFi直接连接
function savedWifiConnect(ssid, bssid, encrypt, infoHtml) {
    var loading = layer.load(0, {
        shade: [0.5, '#fff'],
    });
    if (encrypt.indexOf(("[OPEN]")) != -1) {
        encrypt = "None";
    }
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
            layer.close(loading);
            frequency = 0;
            if (res.result) {
                $("#Connecting-status").text(res.result.status);
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
                        clearInterval(timer);
                        $(".connecting-img").show();
                        timer = setInterval(function() {

                            pollingWifiStatus(infoHtml, "EnterPassword");
                        }, 5000)

                    }

                }
                document.getElementById("WLAN_list_c").scrollTop = 0;

            } else if (res.error) {
                layer.close(loading);
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("An error occurred：" + res.error.message);
                })

                TimerPollingWifiList(); //开启每隔15s获取wifi列表
            }
        },
        error: function(jqXHR) {
            console.log(JSON.stringify(jqXHR))
            frequency++;
            if (frequency < 4) {
                setTimeout(() => {
                    savedWifiConnect(ssid, bssid, encrypt, infoHtml);
                }, 3000);
            } else {
                layer.close(loading);
                frequency = 0;
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication!</div>';
                promptMessage("Error message", tip);
            }
        }
    });
}
//无密码的WiFi直接连接
function noPWDWifiConnect(ssid, bssid, is_saved, infoHtml) {
    var loading = layer.load(0, {
        shade: [0.5, '#fff'],
    });
    var data = {
        "jsonrpc": "2.0",
        "method": "WlanStationConfig",
        "params": {
            "operate_code": 2,
            "ssid": ssid,
            "bssid": bssid,
            "encrypt": "None",
            "is_saved": Number(is_saved),
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
            frequency = 0;

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
                    if (res.result.status == "Password Incorrect") {
                        $("#saved_id").attr("passwordIncorrect", "enterWifiIncorrect");
                        infoHtml.attr("is_saved", 0);
                        enterPasswordHtml(infoHtml);
                    } else {
                        clearInterval(timer);
                        $(".connecting-img").show();
                        timer = setInterval(function() {
                            pollingWifiStatus();
                        }, 5000)
                    }

                }
                document.getElementById("WLAN_list_c").scrollTop = 0;

            } else if (res.error) {
                layer.close(loading);
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("An error occurred：" + res.error.message);
                })

                TimerPollingWifiList(); //开启每隔15s获取wifi列表
            }
        },
        error: function(jqXHR) {
            console.log(JSON.stringify(jqXHR))
            frequency++;
            if (frequency < 4) {
                setTimeout(() => {
                    noPWDWifiConnect(ssid, bssid, is_saved);
                }, 3000);
            } else {
                layer.close(loading);
                frequency = 0;
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication!</div>';
                promptMessage("Error message", tip);
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