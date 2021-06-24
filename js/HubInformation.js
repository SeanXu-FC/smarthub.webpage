var frequency = 0;
$(function() {
    document.body.style.zoom = localStorage.getItem("dpr");

    function timeConversion(millisec) {

        var seconds = (millisec / 1).toFixed(1);

        var minutes = (millisec / (1 * 60)).toFixed(1);

        var hours = (millisec / (1 * 60 * 60)).toFixed(1);

        var days = (millisec / (1 * 60 * 60 * 24)).toFixed(1);

        if (seconds < 60) {
            return seconds + " Sec";
        } else if (minutes < 60) {
            return minutes + " Min";
        } else if (hours < 24) {
            return hours + " Hrs";
        } else {
            return days + " Days"
        }
    }

    $("#btnSave").click(function() {
        //getFile();
        $(this).prop("disabled", "disabled");
        var domain = window.location.host;
        var url = ('https:' == document.location.protocol ? 'https://' : 'http://') + domain + "/action/down";
        downloadFile(url)
            //window.location.href = url;
    });


    function wd(m) {
        var h = 5 / 9.0 * (m - 32) + 273.15; //热力学温度T与人们惯用的摄氏温度t的关系是：T（K）=273.15+t(℃)。
        h = h.toFixed(2);
        return h;

    }
    layui.use('layer', function() {
        var layer = layui.layer;
        var loading = layer.load(0, {
            shade: false
        });
        getInfoData(layer, loading);
        getMobileInfo(layer);
        getLogNumber(layer);
    });

})

function getMobileInfo(layer) {
    var data = {
        "jsonrpc": "2.0",
        "method": "GetHomeStatus",
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
            frequency = 0;
            if (res.result.mobile) {
                if (res.result.mobile.simStatus == 1) {
                    $("#mobile_CSQ").html("--");
                    $("#mobile_RSRQ").html("--");
                    $("#mobile_RSRP").html("--");
                    $("#mobile_SINR").html("--");
                    $("#mobile_PLMN").html("--");
                    $("#Ceil_ID").html("--");
                    $("#Location_Area_Code").html("--");
                    $("#Connection_Type").html("--");
                    $("#Connection_Band").html("--");
                    $("#Network_provider").html("--")
                    $("#Cellular_signal").html("--");
                    $("#Sim_Card_Status").text("--");

                    switch (Number(res.result.mobile.simStatus)) {
                        case 0:
                            $("#Sim_Card_Status").text("Unknown");
                            break;
                        case 1:
                            $("#Sim_Card_Status").text("Not inserted");
                            break;
                        case 2:
                            $("#Sim_Card_Status").text("Ready");
                            break;
                        case 3:
                            $("#Sim_Card_Status").text("PIN Need");
                            break;
                        case 4:
                            $("#Sim_Card_Status").text("PUK Need");
                            break;
                        default:
                            $("#Sim_Card_Status").text("--");
                            break;
                    }
                } else {
                    $("#mobile_CSQ").html(res.result.mobile.csq ? res.result.mobile.csq : "--");
                    $("#mobile_RSRQ").html(res.result.mobile.rsrq ? res.result.mobile.rsrq + " dB" : "--");
                    $("#mobile_RSRP").html(res.result.mobile.rsrp ? res.result.mobile.rsrp + " dBm" : "--");
                    $("#mobile_SINR").html(res.result.mobile.sinr ? res.result.mobile.sinr + " dB" : "--");
                    $("#mobile_PLMN").html(res.result.mobile.plmn ? res.result.mobile.plmn : "--");
                    $("#Ceil_ID").html(res.result.mobile.cell_id ? res.result.mobile.cell_id : "--");
                    $("#Location_Area_Code").html(res.result.mobile.lac ? res.result.mobile.lac : "--");
                    $("#Connection_Type").html(res.result.mobile.act ? res.result.mobile.act : "--");
                    $("#Connection_Band").html(res.result.mobile.band ? res.result.mobile.band : "--");
                    $("#Network_provider").html(res.result.mobile.provider ? res.result.mobile.provider : "--")
                    if (res.result.mobile.qrssi == -444 || res.result.mobile.qrssi == "-444") {
                        $("#Cellular_signal").html("No network");
                    } else {
                        $("#Cellular_signal").html(res.result.mobile.qrssi + " dB");
                    }

                    switch (Number(res.result.mobile.cgreg)) {
                        case 0:
                            $("#Register_Status").text("Not registered");
                            break;
                        case 1:
                            $("#Register_Status").text("Registered, home network");
                            break;
                        case 2:
                            $("#Register_Status").text("Not registered");
                            break;
                        case 3:
                            $("#Register_Status").text("Registration denied");
                            break;
                        case 4:
                            $("#Register_Status").text("Unknown");
                            break;
                        case 5:
                            $("#Register_Status").text("Registered, roaming");
                            break;
                        default:
                            $("#Sim_Card_Status").text("--");
                            break;
                    }

                    switch (Number(res.result.mobile.simStatus)) {
                        case 0:
                            $("#Sim_Card_Status").text("Unknown");
                            break;
                        case 1:
                            $("#Sim_Card_Status").text("Not inserted");
                            break;
                        case 2:
                            $("#Sim_Card_Status").text("Ready");
                            break;
                        case 3:
                            $("#Sim_Card_Status").text("PIN Need");
                            break;
                        case 4:
                            $("#Sim_Card_Status").text("PUK Need");
                            break;
                        default:
                            $("#Sim_Card_Status").text("--");
                            break;
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
            console.log("Error message", JSON.stringify(jqXHR))
            $("#btnSave").prop("disabled", false);
            frequency++;
            if (frequency < 3) {
                setTimeout(() => {
                    getMobileInfo(layer);
                }, 5000);
            } else {

                frequency = 0;
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication!</div>';
                promptMessage("Error message", tip);
            }
        }
    });
}

function getInfoData(layer, loading) {
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
            layer.close(loading);
            frequency = 0;
            $("#btnSave").prop("disabled", false);
            if (res.result) {
                $("#model").html(res.result.Model);
                $("#model_number").html(res.result.ModelNum)
                    //$("#iv").html(res.result.ipq_version);
                    //$("#nv").html(res.result.nxp_version);
                $("#Application_version").html(res.result.TotalVersion);
                $("#sn").html(res.result.serial_num);
                $("#iMeiInfo").html(res.result.IMEI);
                $("#voltage").html(res.result.Voltage + " V");
                $("#cd").html(res.result.Current_draw + " A");
                var Temperature = (res.result.Temperature - 272.15).toFixed(0);
                $("#temperature").html(Temperature + " ℃");
                var hour = (res.result.Operating_hours / 3600).toFixed(0)
                $("#oh").html(hour + " hours");
                $("#macAddress1").html(res.result.imax_mac);
                $("#macAddress2").html(res.result.ipq_ether_mac);
                $("#aPma").html(res.result.ipq_wifi1_mac);
                $("#ipqAddress").html(res.result.ipq_ipaddr);
                $("#ipqAddress").attr("href", "http://" + res.result.ipq_ipaddr);
                $("#MAC6174").html(res.result.Qca6174Mac);
                $("#Platform_version").html(res.result.PlatformVersion ? res.result.PlatformVersion : "--");
                $("#Product_version").html(res.result.BundleVersion);


                if (res.result.AdminPwd) {
                    qrcode(res.result.AdminPwd);
                    $("#code_text").text(res.result.AdminPwd);
                }

            } else if (res.error) {
                layui.use(['form', 'layer'], function() {
                    var layer = layui.layer;
                    layer.msg("An error occurred：" + res.error.message);
                })
            }
        },
        error: function(jqXHR) {
            console.log("Error message", JSON.stringify(jqXHR))
            $("#btnSave").prop("disabled", false);
            frequency++;
            if (frequency < 3) {
                setTimeout(() => {
                    getInfoData(layer, loading);
                }, 5000);
            } else {

                frequency = 0;
                layer.close(loading);
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication!</div>';
                promptMessage("Error message", tip);
            }
        }
    });
}

function getFile() {
    var formData = new FormData();
    var xhr = new XMLHttpRequest();
    xhr.upload.onerror = function(error) {
        console.log("Upload fail！", error);
    }
    xhr.upload.onload = function() {
        console.log('上传成功');
    }
    xhr.open('post', '/action/down', true);
    //xhr.responseType = 'arraybuffer';
    xhr.responseType = 'blob'
    xhr.send();
    xhr.onreadystatechange = state_Change;

    function state_Change() {

        if (xhr.readyState == 4) { // 4 = "loaded"
            if (xhr.status == 200) { // 200 = OK

                let bufferArray = xhr.response;
                let uint8Array = new Uint8Array(bufferArray);　　　　　　
                for (var i = 0; i < bufferArray.length; ++i) {　　　　　　
                    uint8Array[i] = bufferArray[i];
                }
                let blob = new Blob([uint8Array], { type: 'application/x-tar' })

                // let blob = new Blob([xhr.response]);
                // console.log(blob)
                const url = window.URL.createObjectURL(blob);


            } else {
                console.log("Upload fail11！");
            }
        }
    }
}

function downloadFile(url) {
    setTimeout(function() {
        var net = window.open(url);
        net.addEventListener("beforeunload", (e) => {
            console.log("下载完成")
            $("#btnSave").prop("disabled", false)
            layui.use('layer', function() {
                var layer = layui.layer;
                getLogNumber(layer);
            });
        });
    }, 500)
}



function qrcode(str) {
    $('#code').qrcode({
        text: str,
        width: 178,
        height: 178,
        background: '#fff',
        foreground: '#000'
    });
}

function getLogNumber(layer) {

    $.ajax({
        url: "/action/criticalLog",
        type: "post",
        data: "mode=2",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function(res) {

            if (0 <= Number(res.code)) {
                $("#btnSave").text(res.msg)
            } else {
                $("#btnSave").text("Save system logs")
            }
        },
        error: function(jqXHR) {
            console.log("Error message", JSON.stringify(jqXHR))
            frequency++;
            if (frequency < 3) {
                setTimeout(() => {
                    getLogNumber(layer);
                }, 5000);
            } else {

                frequency = 0;
                var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication!</div>';
                promptMessage("Error message", tip);
            }
        }
    })
}