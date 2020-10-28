$(function() {
    // $(".pwd1").val("");
    // $(".pwd").val("");

    save = function() {

        var data = {
            "jsonrpc": "2.0",
            "method": "SetWlanSettings",
            "params": {
                "wifi_config": [{
                    "phy_enable": Number($('.current input[type="checkbox"]').val()), //对于开关，0是关，1是开
                    // "hwmode": parseInt($(".hwmode option:selected").text()), //可变
                    "htmode": 3, //固定
                    "Channel": parseInt($(".channel option:selected").text()), //可变
                    "CountryCode": $(".countryCode option:selected").val(), //可变
                    "vap_config": [{
                        "Ssid": $(".ssid").val(), //可变
                        "SecurityMode": Number($(".EncryptionType option:selected").val()), //可变
                        "WepType": 0, //可变
                        "WpaType": 2, //可变
                        "WepKey": $(".pwd1").val(), //可变
                        "WpaKey": $(".pwd").val(), //可变

                    }]
                }]
            },


            "id": "9.1",

        };

        //console.log(data);

        data = JSON.stringify(data);
        $.ajax({
            type: "post",
            url: "/action/action",
            data: data,

            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function(res) {
                console.log(data);

                //console.log($('.current input[type="checkbox"]').val())
                //console.log("data22222");
                //console.log($('.current input[type="checkbox"]').val());
                // $('#pwd').attr("disabled", true);
                // $('#btn1').attr("disabled", true);
                // $("#content select,#content input,#content button").prop("disabled", true);
                // $('#edit').attr("disabled", false);

                // $('#pwd').attr("disabled", true);

            },
            error: function(jqXHR) {
                alert("An error occurred：" + jqXHR.status);
            }

        });

        layui.use(['form'], function() {
            var form = layui.form;
            form.on('switch(switchTest)', function(data) {
                var checked = data.elem.checked;
                var serverStatus = 1;

                if (serverStatus) {
                    data.elem.checked = checked;
                } else {
                    data.elem.checked = !checked;
                }
                form.render();
                //console.log(data.value);
                var data = {
                    "jsonrpc": "2.0",
                    "method": "SetWlanSettings",
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
                        var json = res.result.wifi_config;

                        for (var index in json) {
                            //console.log(json[index].phy_enable);
                            if (checked && json[index].phy_enable == 1) {
                                $("#content").show();
                                //$('.onoff').prop("value", json[index].phy_enable);

                                serverStatus = 1;
                                //json[index].phy_enable == serverStatus;
                                //json[index].phy_enable == '0';
                                $('.current input[type="checkbox"]').val(serverStatus)
                                    //$('.onoff').prop("value", 0);
                                    //serverStatus = 0;
                                console.log(serverStatus);
                                //console.log("a" + serverStatus);
                                //console.log(serverStatus);
                            } else if (!checked) {
                                //if (!checked);
                                $("#content").hide();
                                //console.log(json[index].phy_enable);

                                serverStatus = 1;
                                //json[index].phy_enable == serverStatus;
                                console.log(serverStatus);
                                $('.current input[type="checkbox"]').val(serverStatus)

                                //$('.onoff').prop("value", [index].phy_enable);


                                //$('.onoff').prop("value", 1);
                                //$('.onoff').prop("checked", "");
                                //console.log("b" + serverStatus);
                                //console.log(!serverStatus);
                            }

                        }
                    },
                    error: function(jqXHR) {
                        alert("An error occurred：" + jqXHR.status);

                    }
                });

            });
        });
    }
});