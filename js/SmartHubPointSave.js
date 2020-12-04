$(function() {
    // $(".pwd1").val("");
    // $(".pwd").val("");



    save = function() {

        layui.use(['form'], function() {

            var form = layui.form;


            // if (this.checked) {
            //     $("#content select,#content input,#content button,#btnGroup button").prop("disabled", false);
            // } else {
            //     $("#content select,#content input,#content button,#btnGroup button").prop("disabled", true);
            // }
            //var checked = data.elem.checked;
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
                //$('#edit').prop("disabled", false);
                //$('#cancel').attr("disabled", false);
                // var o = $(".layui-form-switch");
                // o.find("em").text("OFF")
                // o.prop("class", "layui-unselect layui-form-switch")
            }


            // if (serverStatus) {
            //     data.elem.checked = checked;
            // } else {
            //     data.elem.checked = !checked;
            // }
            form.render();
            var select = $("#EncryptionType").val();
            console.log(select)
            var WpaKey = $(".pwd").val();
            // if(select==1){
            //     WpaKey=$(".pwd1").val()
            // }else {
            //     WpaKey=$(".pwd").val(); 
            // }

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
                url: req + "/action/action",
                data: data,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function(res) {
                    if (data == "true") {
                        //layer.msg("状态修改成功");
                        $("#onoff").prop("checked", false);
                        var o = $(".layui-form-switch");
                        o.find("em").text("OFF");
                        o.prop("class", "layui-unselect layui-form-switch");
                        active.reload();
                    } else {
                        //layer.msg(data);
                        $("#onoff").prop("checked", true);
                        var o = $(".layui-form-switch");
                        o.find("em").text("ON");
                        o.prop("class", "layui-unselect layui-form-switch layui-form-onswitch");
                    }

                },
                error: function(jqXHR) {
                    alert("An error occurred：" + jqXHR.status);

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
        //         alert("An error occurred：" + jqXHR.status);
        //     }

        // });





    }
});