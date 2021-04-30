var frequency = 0;
$(function() {
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
        window.location.href = ('https:' == document.location.protocol ? 'https://' : 'http://') + domain + "/action/down";
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
        getLogNumber(layer);
    });

})

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
        console.log("xhr", xhr)
        if (xhr.readyState == 4) { // 4 = "loaded"
            if (xhr.status == 200) { // 200 = OK
                console.log(xhr.response)
                let bufferArray = xhr.response;
                let uint8Array = new Uint8Array(bufferArray);　　　　　　
                for (var i = 0; i < bufferArray.length; ++i) {　　　　　　
                    uint8Array[i] = bufferArray[i];
                }
                let blob = new Blob([uint8Array], { type: 'application/x-tar' })
                console.log(blob)
                    // let blob = new Blob([xhr.response]);
                    // console.log(blob)
                const url = window.URL.createObjectURL(blob);
                console.log(url)

            } else {
                console.log("Upload fail11！");
            }
        }
    }
}

function getFile1() {
    $.ajax({
        url: "/action/down",
        type: "post",
        dataType: "json",
        contentType: "application/octet-stream;charset=utf-8",
        success: function(res) {
            console.log("aaaaaa", res)

        },
        error: function(jqXHR) {
            console.log("bbbbb", JSON.stringify(jqXHR))
            console.log(jqXHR)
            let blob = new Blob([jqXHR.responseText]);
            console.log(blob)
            const url = window.URL.createObjectURL(blob);
            console.log(url)

        }
    })
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
                if (res.result.MobileSignalStrength == -444 || res.result.MobileSignalStrength == "-444") {
                    $("#Cellular_signal").html("No network");
                } else {
                    $("#Cellular_signal").html(res.result.MobileSignalStrength + " dB");
                }

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
        url: reqUrlProxy + "/action/criticalLog",
        type: "post",
        data: "mode=2",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function(res) {
            console.log(res)
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