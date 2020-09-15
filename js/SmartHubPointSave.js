$(function() {
    $(".pwd1").val("");
    save = function() {

        var data = {
            "jsonrpc": "2.0",
            "method": "SetWlanSettings",
            "params": {
                "wifi_config": [{
                    "phy_id": 2, //固定
                    "phy_name": "wifi2", //固定
                    "phy_enable": $('.current input[type="checkbox"]').val(), //对于开关
                    "hwmode": parseInt($(".hwmode option:selected").text()), //可变
                    "htmode": 3, //固定
                    "tx_power": 23, //固定
                    "Channel": parseInt($(".channel option:selected").text()), //可变
                    "country_code": $(".countryCode option:selected").val(), //可变
                    "vap_config": [{
                        "vap_id": 0, //固定
                        "vap_mode": "ap", //固定
                        "vap_enable": 0, //固定
                        "Ssid": $(".ssid").val(), //可变
                        "SsidHidden": 0, //固定
                        "SecurityMode": parseInt($(".EncryptionType option:selected").val()), //可变
                        "WepType": 0, //可变
                        "WpaType": 2, //可变
                        "WepKey": $(".pwd1").val(), //可变
                        "WpaKey": $(".pwd").val(), //可变
                        "ApIsolation": 0, //固定
                        "max_numsta": 15 //固定
                    }]
                }]
            },

            "id": "9.1",

        };



        data = JSON.stringify(data);
        $.ajax({
            type: "post",
            url: "/action/action",
            data: data,

            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function(res) {
                console.log(data);
                //console.log("data22222");
                //console.log($('.current input[type="checkbox"]').val());
                // $('#pwd').attr("disabled", true);
                // $('#btn1').attr("disabled", true);
                $("#content select,#content input,#content button").prop("disabled", true);
                $('#edit').attr("disabled", false);

                $('#pwd').attr("disabled", true);

            },
            error: function(jqXHR) {
                alert("An error occurred：" + jqXHR.status);
            }

        });
    }
});