$(function() {

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
            $("#model").html(res.result.Model);
            $("#sv").html(res.result.ipq_version);
            $("#sn").html(res.result.serial_number);
            $("#iMeiInfo").html(res.result.IMEI);
            $("#voltage").html(res.result.Voltage);
            $("#cd").html(res.result.Current_draw);
            $("#temperature").html(res.result.Temperature);
            $("#oh").html(res.result.Operating_hours);
            $("#macAddress1").html(res.result.imax_mac);
            $("#macAddress2").html(res.result.ipq_ether_mac);
            $("#aPma").html(res.result.ipq_wifi1_mac);
            $("#ipqAddress").html(res.result.ipq_ipaddr)
        },
        error: function(jqXHR) {
            alert("发生错误：" + jqXHR.status);

        }
    });


})