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
        var domain = window.location.host;
        // self.location.href = ('https:' == document.location.protocol ? 'https://' : 'http://') + domain + "/action/down";
        //console.log(self.location.href + "/action/down");
        //console.log(('https:' == document.location.protocol ? 'https://' : 'http://') + domain);
        //console.log(('https:' == document.location.protocol ? 'https://' : 'http://') + domain + "/action/down");
        window.location.href = ('https:' == document.location.protocol ? 'https://' : 'http://') + domain + "/action/down";
        //console.log(self.location.href = ('https:' == document.location.protocol ? 'https://' : 'http://') + domain + "/action/down")
        //window.open("http://198.18.248.1/action/down", "_self");
        //console.log(window.open("/action/down", "_self"))
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
    });

})

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
            if (res.result) {
                $("#model").html(res.result.Model);
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
                $("#Cellular_signal").html(res.result.MobileSignalStrength + " dB");
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