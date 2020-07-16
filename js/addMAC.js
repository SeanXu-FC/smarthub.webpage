$(function() {
    var data = {
        "jsonrpc": "2.0",
        "method": "setting_factory_info_req",
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
        success: function(data) {
            if (data.status == "0") {
                console.log(data.msg);
                $("#ipq_eth0").val(data.params.ipq_eth0);
                $("#ipq_eth1").val(data.params.ipq_eth1);
                $("#ipq_wif0").val(data.params.ipq_wif0);
                $("#ipq_wif1").val(data.params.ipq_wif1);
                $("#nxp_eth0").val(data.params.nxp_eth0);
                $("#dev_sn").val(data.params.dev_sn);
                // QcaWanMAC: $("#ipq_eth0").val(),
                // QCALanMAC: $("#ipq_eth1").val(),
                // QCAWiFi0: $("#ipq_wif0").val(),
                // QCAWiFi1: $("#ipq_wif1").val(),
                // aPma: $("#nxp_eth0").val(),
                // deviceSN: $("#dev_sn").val()
            } else {
                console.log("出现错误：" + data.msg);
            }
        },
        error: function(jqXHR) {
            alert("发生错误：" + jqXHR.status);

        }
    });

    $('#btnMAC').click(function() {
        var data = {
            "jsonrpc": "2.0",
            "method": "setting_factory_info",
            "params": {
                QcaWanMAC: $("#ipq_eth0").val(),
                QCALanMAC: $("#ipq_eth1").val(),
                QCAWiFi0: $("#ipq_wif0").val(),
                QCAWiFi1: $("#ipq_wif1").val(),
                aPma: $("#nxp_eth0").val(),
                deviceSN: $("#dev_sn").val()
            },
            "id": "9.1"
        };
        //console.log(data);
        data = JSON.stringify(data);
        $.ajax({
            type: "post",
            url: "/action/action",
            data: data,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function(data) {
                if (data.status == "0") {
                    console.log(data.msg);
                } else {
                    console.log("出现错误：" + data.msg);
                }
            },
            error: function(jqXHR) {
                alert("发生错误：" + jqXHR.status);

            }
        });

    });
})