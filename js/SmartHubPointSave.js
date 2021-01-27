$(function() {
    // $(".pwd1").val("");
    // $(".pwd").val("");



    save = function() {

        layui.use(['form'], function() {

            var form = layui.form;


            var serverStatus = 1;
            var onoff = serverStatus ? 1 : 0;
            if (serverStatus == 0) {
                //$("#content select,#content input,#content button,#btnGroup button").prop("disabled", true);
                $("#content select,#content input").prop("disabled", true);
            }
            if (serverStatus == 1) {
                $("#content").removeAttr("disabled");
                //$("#content select,#content input,#content button,#btnGroup button").prop("disabled", false);
                $("#content select,#content input").prop("disabled", false);
                $("#btnGroup").removeAttr("disabled");

            }



            form.render();
            var select = $("#EncryptionType").val();
            var WpaKey = $(".pwd").val();
            var len = $("#pw").val().length;
            if (len >= 8 && len <= 20 && $("#pw").val() != '') {} else {
                $(".pwd").siblings()
                    .find('span')
                    .text('Please enter a password with more than 8 digits!')
                    .removeClass('state1 state2 state4')
                    .addClass('state3');
                return;
            }
            var data = {
                "jsonrpc": "2.0",

                "method": "SetWlanSettings",
                "params": {
                    "wifi_config": [{
                        //"phy_enable": Number($('.current input[type="checkbox"]').val()), //对于开关，0是关，1是开
                        "PhyEnable": onoff, //对于开关，0是关，1是开
                        "HtMode": Number($("#HTmode").val()), //可变
                        "Channel": parseInt($(".channel option:selected").text()), //可变
                        //"CountryCode": $(".countryCode option:selected").val(), //可变
                        "vap_config": [{
                            "Ssid": $(".ssid").val(), //可变
                            "SecurityMode": Number($(".EncryptionType option:selected").val()), //可变
                            "WpaKey": WpaKey, //可变
                        }]
                    }]
                },


                "id": "9.1",

            };

            data = JSON.stringify(data);
            //console.log(data.wifi_config.phy_enable);
            //console.log(this.checked)
            console.log(data)
            $.ajax({
                type: "post",
                url: "/action/action",
                data: data,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function(res) {
                    if (res.result) {
                        $('#success').show(1000).delay(6000).hide(0);
                    } else {
                        layer.msg(res.error);
                    }

                },
                error: function(jqXHR) {
                    var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
                    promptMessage("Error message", tip);

                }
            });


        });

        // var data = {
        //     "jsonrpc": "2.0",
        //     "method": "SetWlanSettings",
        //     "params": {
        //         "wifi_config": [{
        //             "phy_enable": Number($('.current input[type="checkbox"]').val()), //对于开关，0是关，1是开
        //             // "hwmode": parseInt($(".hwmode option:selected").text()), //可变
        //             "htmode": 3, //固定
        //             "Channel": parseInt($(".channel option:selected").text()), //可变
        //             "CountryCode": $(".countryCode option:selected").val(), //可变
        //             "vap_config": [{
        //                 "Ssid": $(".ssid").val(), //可变
        //                 "SecurityMode": Number($(".EncryptionType option:selected").val()), //可变
        //                 "WepType": 0, //可变
        //                 "WpaType": 2, //可变
        //                 "WepKey": $(".pwd1").val(), //可变
        //                 "WpaKey": $(".pwd").val(), //可变

        //             }]
        //         }]
        //     },


        //     "id": "9.1",

        // };

        //console.log(data);

        // data = JSON.stringify(data);
        // var onoff = this.checked ? 1 : 0;
        // var data = {
        //     "jsonrpc": "2.0",

        //     "method": "SetWlanSettings",
        //     "params": {
        //         "wifi_config": [{
        //             //"phy_enable": Number($('.current input[type="checkbox"]').val()), //对于开关，0是关，1是开
        //             "phy_enable": onoff, //对于开关，0是关，1是开
        //             // "hwmode": parseInt($(".hwmode option:selected").text()), //可变
        //             "htmode": 3, //固定
        //             "Channel": parseInt($(".channel option:selected").text()), //可变
        //             "CountryCode": $(".countryCode option:selected").val(), //可变
        //             "vap_config": [{
        //                 "Ssid": $(".ssid").val(), //可变
        //                 "SecurityMode": Number($(".EncryptionType option:selected").val()), //可变
        //                 "WepType": 0, //可变
        //                 "WpaType": 2, //可变
        //                 "WepKey": $(".pwd1").val(), //可变
        //                 "WpaKey": $(".pwd").val(), //可变

        //             }]
        //         }]
        //     },


        //     "id": "9.1",

        // };

        // data = JSON.stringify(data);
        //console.log(data);
        // $.ajax({
        //     type: "post",
        //     url: "/action/action",
        //     data: data,

        //     dataType: "json",
        //     contentType: "application/json;charset=utf-8",
        //     success: function(res) {
        //         console.log(data);


        //     },
        //     error: function(jqXHR) {
        //         var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">' + JSON.stringify(jqXHR) + '</div>';
        //promptMessage("Error message", tip);
        //     }

        // });





    }
});