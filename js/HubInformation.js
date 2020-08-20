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
        "method": "hub_infor",
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
            var str = "";
            str += `
            <table class="table table-hover table-responsive">
            <tr>
                <td colspan="2">
                    <h4 style="color:#333">Product info</h4>
                </td>
            </tr>
            <tr>
                <td width="30%">Model:</td>
                <td><span id="model" class="title">${res.result.Model}</span></td>
            </tr>
            <tr>
                <td>ipq version:</td>
                <td><span id="iv" class="title">${res.result.ipq_version}</span></td>
            </tr>
            <tr>
                <td>nxp version:</td>
                <td><span id="nv" class="title">${res.result.nxp_version}</span></td>
            </tr>
            <tr>
                <td>Serial number:</td>
                <td><span id="sn" class="title">${res.result.serial_number}</span></td>
            </tr>

            <tr>
                <td>IMEI:</td>
                <td><span id="iMeiInfo" class="title">${res.result.IMEI}</span></td>
            </tr>
            <tr>
                <td>Voltage:</td>
                <td><span id="voltage" class="title">${res.result.Voltage}</span></td>
            </tr>
            <tr>
                <td>Current draw:</td>
                <td><span id="cd" class="title">${res.result.Current_draw}</span></td>
            </tr>
            <tr>
                <td>Temperature:</td>
                <td><span id="temperature" class="title">${wd(res.result.Temperature)}℃</span></td>
            </tr>
            <tr>
                <td>Operating hours:</td>
                <td><span id="oh" class="title">${timeConversion(res.result.Operating_hours)}</span></td>
            </tr>

        </table>
        <table class="table table-hover table-responsive">

            <tr>
                <td colspan="2">
                    <h4 style="color:#333">Network info</h4>
                </td>
            </tr>
            <tr>
                <td width="30%">MAC address 1:</td>
                <td><span id="macAddress1" class="title">${res.result.imax_mac}</span></td>
            </tr>
            <tr>
                <td>MAC address 2:</td>
                <td><span id="macAddress2" class="title">${res.result.ipq_ether_mac}</span></td>
            </tr>
            <tr>
                <td>Access point MAC address:</td>
                <td><span id="aPma" class="title">${res.result.ipq_wifi1_mac}</span></td>
            </tr>
            <tr>
                <td>IPQ address:</td>
                <td>
                    <a id="ipqAddress" class="title" href="http://10.88.11.179" target="_blank">${res.result.ipq_ipaddr}</a>
                </td>
            </tr>
        </table>
            
            `
            $("#main").html(str);
            // $("#model").html(res.result.Model);
            // $("#iv").html(res.result.ipq_version);
            // $("#nv").html(res.result.nxp_version);
            // $("#sn").html(res.result.serial_number);
            // $("#iMeiInfo").html(res.result.IMEI);
            // $("#voltage").html(res.result.Voltage);
            // $("#cd").html(res.result.Current_draw);
            // $("#temperature").html(res.result.Temperature);
            // $("#oh").html(res.result.Operating_hours);
            // $("#macAddress1").html(res.result.imax_mac);
            // $("#macAddress2").html(res.result.ipq_ether_mac);
            // $("#aPma").html(res.result.ipq_wifi1_mac);
            // $("#ipqAddress").html(res.result.ipq_ipaddr)
        },
        error: function(jqXHR) {
            alert("An error occurred：" + jqXHR.status);

        }
    });


})