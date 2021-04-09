var timer = null;
var frequency1 = 0;
var progressTimer = null;
var progressBarTimer = null;
var progress = null;
var progressFrequency = 0;
$(function() {

    layui.use(['layer', 'form'], function() {
        var layer = layui.layer;
        var form = layui.form;
        var loading = layer.load(0, {
            shade: false
        });
        getHomeData(layer, loading);
        timer = setInterval(() => {
            getHomeData(layer, loading);
        }, 10000);
    })
    getStatus();

    $(window).on('beforeunload', function() {
        clearInterval(timer);
    });


    $("#Home_c .row a,#connected_devices").on("click", function() {
            var url = $(this).attr('data-url');
            if (url == "home.html" || url == undefined) {
                $(parent.document).find("#my-iframe").attr("src", url);
            } else {
                var login = getCookie("LogInStaus");
                if (login) {
                    $(parent.document).find("#my-iframe").attr("src", url);
                } else {
                    LoginMessage(url);
                }
            }
        })
        //getCnss();
        //getCloud();

});



function getHomeData(layer, loading) {
    var data = {
        "jsonrpc": "2.0",
        "method": "GetHomeStatus",
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
            layer.close(loading);
            if (res.result) {
                var json = res.result;
                var arr = ['Connected', 'Connected(2.4GHz)', 'Connected(5GHz)', 'On', 'Off',
                    'Error'
                ];
                if (json.cloud.status == 0) {
                    $('.cloud').eq(0).text(arr[5]);
                    $('.r_01').attr("src", "images/r_01_gray.png");
                    $('.cloud').css('color', 'red')
                } else {
                    $('.Connected').eq(0).text(arr[0]);
                    $('.r_01').attr("src", "images/r_01.png");
                    $('.cloud').css('color', '#26b167');
                }

                if (json.sta.status == 0) {
                    $('.connected24').eq(0).text(arr[4]);
                    //$('.r_06').attr("src", "images/r_06_gray.png");
                    //$('#connected24').attr("src", "images/s_wifi_nonea.png");
                    $('.connected24').css('color', 'red');
                    $(".imgIcon1 .ssid").text("-");
                    $(".WiFiNetwork-disable").show();
                } else if (json.sta.status == 2) {
                    $('.connected24').eq(0).text(arr[5]);
                    //$('.r_06').attr("src", "images/r_06_gray.png");
                    //$('#connected24').attr("src", "images/s_wifi_nonea.png");
                    $('.connected24').css('color', 'red');
                    $(".imgIcon1 .ssid").text("-");
                    $(".WiFiNetwork-disable").show();
                } else {
                    if (json.sta.band == 0) {
                        $('.connected24').eq(0).text(arr[1]);
                    } else {
                        $('.connected24').eq(0).text(arr[2]);
                    }
                    $('.r_06').attr("src", "images/r_06.png");
                    $('.ssid').eq(0).text(json.sta.sta_ssid);
                    $('.connected24').css('color', '#26b167');
                    $(".WiFiNetwork-disable").hide();
                }

                var $img = $(".imgIcon1 img");
                //var img0 = $('<img class="">');
                var MobileSignalArr = ['mobileSignal-none.png', 'mobileSignal-0-20.png',
                    'mobileSignal-20-40.png', 'mobileSignal-40-60.png',
                    'mobileSignal-60-80.png', 'mobileSignal-80-100.png'
                ];
                var WiFiSignalArr = ['s_wifi_nonea.png', 's_wifi_02a.png', 's_wifi_03a.png',
                    's_wifi_04a.png', 's_wifi_05a.png'
                ];
                if (json.mobile.active_sim == 99) {
                    $('.Connected4G').eq(0).text(arr[4]);
                    $('#Connected4G').attr("src", "images/mobileSignal-none.png");
                    $('.Connected4G').css('color', 'red')
                    $('.NetworkProvider').eq(0).text('-');
                    $('.active_sim').eq(0).text('-');
                    // $('.imsi').eq(0).text('-');
                    // $('.plmn').eq(0).text('-');
                    // $('.csq').eq(0).text('-');
                    // $('.location').eq(0).text('-');
                    // $('.act').eq(0).text('-');
                    // $('.register').eq(0).text('');
                    $('.cell').eq(0).text('-');
                    $(".mobiledataImg-disable").show();
                } else {
                    var mobileStatus = "";
                    if (json.mobile.status == 0) {
                        if (json.mobile.act_num == 0) {
                            mobileStatus = "Disconnected(3G)"
                        } else {
                            mobileStatus = "Disconnected(4G)"
                        }

                        $('.Connected4G').eq(0).text(mobileStatus);
                        $('.Connected4G').css('color', 'red')
                        $('.NetworkProvider').eq(0).text(json.mobile.provider ? json.mobile
                            .provider : '-');
                        $('.active_sim').eq(0).text(json.mobile.active_sim ? json.mobile
                            .active_sim : '-');
                        // $('.imsi').eq(0).text(json.mobile.imsi ? json.mobile.imsi : '-');
                        // $('.plmn').eq(0).text(json.mobile.plmn ? json.mobile.plmn : '-');
                        // $('.csq').eq(0).text(json.mobile.csq ? json.mobile.csq : '-');
                        // $('.location').eq(0).text(json.mobile.lca ? json.mobile.lca : '-');
                        // $('.act').eq(0).text(json.mobile.act ? json.mobile.act : '-');
                        // $('.register').eq(0).text(json.mobile.cgreg ? json.mobile.cgreg : '');
                        $('.cell').eq(0).text(json.mobile.cell_id ? json.mobile.cell_id : '-');
                        $(".mobiledataImg-disable").show();
                    } else {
                        if (json.mobile.act_num == 0) {
                            mobileStatus = "Connected(3G)"
                        } else {
                            mobileStatus = "Connected(4G)"
                        }
                        $('.Connected4G').eq(0).text(mobileStatus);
                        $('.NetworkProvider').eq(0).text(json.mobile.provider ? json.mobile
                            .provider : '-');
                        $('.active_sim').eq(0).text(json.mobile.active_sim ? json.mobile
                            .active_sim : '-');
                        // $('.imsi').eq(0).text(json.mobile.imsi ? json.mobile.imsi : '-');
                        // $('.plmn').eq(0).text(json.mobile.plmn ? json.mobile.plmn : '-');
                        // $('.csq').eq(0).text(json.mobile.csq ? json.mobile.csq : '-');
                        // $('.location').eq(0).text(json.mobile.lca ? json.mobile.lca : '-');
                        // $('.act').eq(0).text(json.mobile.act ? json.mobile.act : '-');
                        // $('.register').eq(0).text(json.mobile.cgreg ? json.mobile.cgreg : '');
                        $('.cell').eq(0).text(json.mobile.cell_id ? json.mobile.cell_id : '-');
                        $('.Connected4G').css('color', '#26b167')
                        $(".mobiledataImg-disable").hide();
                    }
                    if (json.mobile.signal);
                    if (json.mobile.signal > 0 && json.mobile.signal <= 6) {
                        $img.eq(1).attr("src", 'images/' + MobileSignalArr[1]);
                    } else if (json.mobile.signal > 6 && json.mobile.signal <= 12) {
                        $img.eq(1).attr("src", 'images/' + MobileSignalArr[2]);
                    } else if (json.mobile.signal > 12 && json.mobile.signal <= 18) {
                        $img.eq(1).attr("src", 'images/' + MobileSignalArr[3]);
                    } else if (json.mobile.signal > 18 && json.mobile.signal <= 24) {
                        $img.eq(1).attr("src", 'images/' + MobileSignalArr[4]);
                    } else if (json.mobile.signal > 24 && json.mobile.signal <= 30) {
                        $img.eq(1).attr("src", 'images/' + MobileSignalArr[5]);
                    }
                }




                if (json.ap.status == 0) {
                    $('.Status').eq(0).text(arr[4]);
                    $('.Name').eq(0).text(json.ap.name);
                    $('.clg').css({
                        'color': 'red'
                    })
                    $('.r_06').attr("src", "images/r_06_gray.png");
                } else {
                    $('.Status').eq(0).text(arr[3]);
                    $('.Name').eq(0).text(json.ap.name);
                    $('.clg').css({
                        'color': '#26b167'
                    })
                }

                var wirelessLen = $('.Group2901').length;
                var EthernetLen = $('.Group2902').length;

                $('#WirelessConnections span').text('(' + json.dev.ap_num + ')');
                $('#EthernetConnections span').text('(' + json.dev.eth_num + ')');


                if (json.sta.status == 1) {
                    if (json.sta.signal);
                    signal = Math.abs(json.sta.signal);
                    if (100 > signal && signal >= 85) {
                        $img.eq(0).attr("src", 'images/' + WiFiSignalArr[1]);
                    } else if (85 > signal && signal >= 70) {
                        $img.eq(0).attr("src", 'images/' + WiFiSignalArr[2]);
                    } else if (70 > signal && signal >= 55) {
                        $img.eq(0).attr("src", 'images/' + WiFiSignalArr[3]);
                    } else if (55 > signal) {
                        $img.eq(0).attr("src", 'images/' + WiFiSignalArr[4]);
                    }

                }
            } else if (res.error) {
                layui.use(['layer'], function() {
                    var layer = layui.layer;
                    layer.msg("An error occurred：" + res.error.message);
                })
            }
        },
        error: function(jqXHR) {
            console.log("Error message", JSON.stringify(jqXHR))
            frequency1++;
            if (frequency1 > 2) {
                layer.close(loading);
                frequency1 = 0;
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication!</div>';
                promptMessage("Error message", tip);
            }
        }
    });
}
//Get cookie
function getCookie(name) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] == name)
            return arr[1];
    }
    return "";
}
//获取设备状态，有没有掉电
function getStatus() {
    var domain = window.location.host;
    var data = {
        "jsonrpc": "2.0",
        "method": "GetUpgradeStatusAndProgress",
        "params": {
            "status": 0
        },
        "id": "9.1"

    };
    data = JSON.stringify(data);
    $.ajax({
        type: "post",
        url: "/action/action?",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            if (res.result) {
                var data = res.result;
                if (data.status != "3") { //升级成功
                    $("#my-iframe", window.parent.document).attr("src", "flashops.html?status=" + data
                        .status + "&steps=" + data.steps + "&count=" + data.count + "&total=" + data.total);
                } else {
                    getInfoData();
                    progressTimer = setInterval(() => {
                        getInfoData();
                    }, 1000 * 10);
                }
            } else if (res.error) {
                setTimeout(() => {
                    getStatus();
                }, 10000);
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("An error occurred：" + res.error.message);
                })
            }

        },
        error: function(jqXHR) {
            setTimeout(() => {
                getStatus();
            }, 10000);
            console.log("Error message", JSON.stringify(jqXHR))
        }
    })
}
var progressI = 0;

function progressBar() {
    var tip =
        '<div class=""><p class="progress-text">Router is starting up...</p>' +
        '<div class="progress-out progress-container mt-20" id="div3">' +

        '<div class="progress-in"></div>' +
        '</div></div>'
    progress = parentTipMessage(tip);
    $(parent.document).find("#div3").myProgress({
        speed: 10,
        percent: ((progressI / 600) * 100).toFixed(0),
        width: "100%",
    });

    progressBarTimer = setInterval(() => {
        progressI = progressI + 1;
        if (progressI == 600) { //progressI=600进度条达到100%，时间达到1分钟
            clearInterval(progressBarTimer);
            return;
        }
        $(parent.document).find("#div3").myProgress({
            speed: 10,
            percent: ((progressI / 600) * 100).toFixed(0),
            width: "100%",
        });
    }, 100);
}
var progressInitFlag = false;

function getInfoData() {
    var data = {
        "jsonrpc": "2.0",
        "method": "GetHubInfo",
        "params": {

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
            if (res.result && res.result.ipq_ipaddr) {
                clearInterval(progressTimer);
                clearInterval(progressBarTimer);
                $(parent.document).find("#div3").myProgress({
                    speed: 10,
                    percent: 100,
                    width: "100%",
                });
                parent.layer.close(progress);

            } else {
                if (!progressInitFlag) {
                    progressInitFlag = true;
                    progressBar();
                }
            }
        },
        error: function(jqXHR) {
            console.log("Error message", JSON.stringify(jqXHR))
            if (progressFrequency < 7) {
                progressFrequency++
            } else {
                progressFrequency = 0;
                clearInterval(progressTimer);
                parent.layer.close(progress);
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication, please try again later!</div>';
                promptMessage("Error message", tip);
            }

        }
    });
}



function getCloud() {

    $.ajax({
        type: "post",
        url: "http://localhost:7777/status",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            console.log(res)

        },
        error: function(jqXHR) {
            console.log("Error message", JSON.stringify(jqXHR))
        }
    })
}

function getCnss() {

    $.ajax({
        type: "post",
        url: "http://localhost:4000",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            console.log(res)

        },
        error: function(jqXHR) {
            console.log("Error message", JSON.stringify(jqXHR))
        }
    })
}