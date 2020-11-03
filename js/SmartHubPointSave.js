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
        $.ajax({
            type: "post",
            url: "/action/action",
            data: data,

            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function(res) {
                console.log(data);

            },
            error: function(jqXHR) {
                alert("An error occurred：" + jqXHR.status);
            }

        });

        // layui.use(['form'], function() {
        //     var form = layui.form;
        //     form.on('switch(switchTest)', function(data) {
        //         // if (this.checked) {
        //         //     $("#content select,#content input,#content button,#btnGroup button").prop("disabled", false);
        //         // } else {
        //         //     $("#content select,#content input,#content button,#btnGroup button").prop("disabled", true);
        //         // }
        //         var checked = data.elem.checked;
        //         var serverStatus = 1;
        //         var onoff = this.checked ? 1 : 0;
        //         if (this.checked == 0) {
        //             $("#content select,#content input,#content button,#btnGroup button").prop("disabled", true);
        //         }
        //         if (this.checked == 1) {
        //             $("#content").removeAttr("disabled");
        //             $("#content select,#content input,#content button,#btnGroup button").prop("disabled", false);
        //             var o = $(".layui-form-switch");
        //             o.find("em").text("OFF")
        //             o.prop("class", "layui-unselect layui-form-switch")
        //         }
        //         if (serverStatus) {
        //             data.elem.checked = checked;
        //         } else {
        //             data.elem.checked = !checked;
        //         }
        //         form.render();
        //         var data = {
        //             "jsonrpc": "2.0",

        //             "method": "SetWlanSettings",
        //             "params": {
        //                 "wifi_config": [{
        //                     //"phy_enable": Number($('.current input[type="checkbox"]').val()), //对于开关，0是关，1是开
        //                     "phy_enable": onoff, //对于开关，0是关，1是开
        //                     // "hwmode": parseInt($(".hwmode option:selected").text()), //可变
        //                     "htmode": 3, //固定
        //                     "Channel": parseInt($(".channel option:selected").text()), //可变
        //                     "CountryCode": $(".countryCode option:selected").val(), //可变
        //                     "vap_config": [{
        //                         "Ssid": $(".ssid").val(), //可变
        //                         "SecurityMode": Number($(".EncryptionType option:selected").val()), //可变
        //                         "WepType": 0, //可变
        //                         "WpaType": 2, //可变
        //                         "WepKey": $(".pwd1").val(), //可变
        //                         "WpaKey": $(".pwd").val(), //可变

        //                     }]
        //                 }]
        //             },


        //             "id": "9.1",

        //         };

        //         data = JSON.stringify(data);
        //         //console.log(data.wifi_config.phy_enable);
        //         //console.log(this.checked)
        //         $.ajax({
        //             type: "post",
        //             url: "/action/action",
        //             data: data,
        //             dataType: "json",
        //             contentType: "application/json;charset=utf-8",
        //             success: function(res) {
        //                 var json = res.result.wifi_config;
        //                 //console.log(json[0].phy_enable)
        //                 //onoff = this.checked ? 1 : 0;
        //                 //alert(111)
        //                 // for (var index in json) {
        //                 //     //console.log(json[index].phy_enable);
        //                 // if (this.checked) {
        //                 //     json[index].phy_enable == 1
        //                 //         //$("#content").show();
        //                 // } else if (!checked) {
        //                 //     //if (!checked);
        //                 //     //$("#content").hide();
        //                 // }

        //                 // }

        //             },
        //             error: function(jqXHR) {
        //                 alert("An error occurred：" + jqXHR.status);

        //             }
        //         });

        //     });
        // });
    }
});