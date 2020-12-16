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

    // function getDuration(my_time) {
    //     var days = my_time / 1000 / 60 / 60 / 24;
    //     var daysRound = Math.floor(days);
    //     var hours = my_time / 1000 / 60 / 60 - (24 * daysRound);
    //     var hoursRound = Math.floor(hours);
    //     var minutes = my_time / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound);
    //     var minutesRound = Math.floor(minutes);
    //     var seconds = my_time / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
    //     console.log('转换时间:', daysRound + '天', hoursRound + '时', minutesRound + '分', seconds + '秒');
    //     var time = hoursRound + ':' + minutesRound + ':' + seconds
    //     return time;
    // }

    function wd(m) {
        var h = 5 / 9.0 * (m - 32) + 273.15; //热力学温度T与人们惯用的摄氏温度t的关系是：T（K）=273.15+t(℃)。
        h = h.toFixed(2);
        return h;

    }

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

            $("#model").html(res.result.Model);
            $("#iv").html(res.result.ipq_version);
            $("#nv").html(res.result.nxp_version);
            $("#stm8").html(res.result.stm8_version);
            $("#sn").html(res.result.serial_num);
            $("#iMeiInfo").html(res.result.IMEI);
            $("#voltage").html(res.result.Voltage + " V");
            $("#cd").html(res.result.Current_draw + " A");
            var Temperature = (res.result.Temperature - 272.15).toFixed(2);
            $("#temperature").html(Temperature + " ℃");
            var hour = (res.result.Operating_hours / 3600).toFixed(2)
            $("#oh").html(hour + " hours");
            $("#macAddress1").html(res.result.imax_mac);
            $("#macAddress2").html(res.result.ipq_ether_mac);
            $("#aPma").html(res.result.ipq_wifi1_mac);
            $("#ipqAddress").html(res.result.ipq_ipaddr);
            $("#ipqAddress").attr("href", "http://" + res.result.ipq_ipaddr);
            var domain = window.location.host;
            $("#btnSave").click(function() {
                // self.location.href = ('https:' == document.location.protocol ? 'https://' : 'http://') + domain + "/action/down";
                //console.log(self.location.href + "/action/down");
                //console.log(('https:' == document.location.protocol ? 'https://' : 'http://') + domain);
                //console.log(('https:' == document.location.protocol ? 'https://' : 'http://') + domain + "/action/down");
                window.location.href = ('https:' == document.location.protocol ? 'https://' : 'http://') + domain + "/action/down";
                //console.log(self.location.href = ('https:' == document.location.protocol ? 'https://' : 'http://') + domain + "/action/down")
                //window.open("http://198.18.248.1/action/down", "_self");
                //console.log(window.open("/action/down", "_self"))
            });
        },
        error: function(jqXHR) {
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
            promptMessage("Error message", tip);
        }
    });


})