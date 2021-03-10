$(function() {
    layui.use('layer', function() {
        var layer = layui.layer;
        var loading = layer.load(0, {
            shade: false
        });
        getData(layer, loading);
    });
    $("#eye").on("click", function() {
        var type = $("#pw").attr("type");
        if (type == "password") {
            $("#pw").attr("type", "text");
            $(this).text("HIDE");
        } else if (type == "text") {
            $("#pw").attr("type", "password");
            $(this).text("SHOW")
        }
    })

    $("#btn1").on("click", function() {
        APsave();
    })

    $('#pw').on("input", function() {
        var len = $(this).val().length;
        if (len <= 8) {

            $(".len-tip")
                .text('Please enter a password with more than 8 digits!')
        } else {
            $(".len-tip")
                .text(' ')
        }

    })


    layui.use(['form'], function() {
        var form = layui.form;
        form.on('switch(switchTest)', function(data) {
            var checked = data.elem.checked;
            var serverStatus = 1;

            var onoff = this.checked ? 1 : 0;

            if (this.checked == 1) {
                $("#content select,#content input,#content button,#btnGroup button").prop("disabled", false);
                $("#onoff").prop("checked", true);
                $("#btn1").removeAttr("disabled")
            } else if (this.checked == 0) {
                $("#content select,#content input").prop("disabled", true);
                $("#onoff").removeAttr("checked");
                $("#btn1").attr("disabled", true)
            }
            form.render();


            var data = {
                "jsonrpc": "2.0",
                "method": "SetWlanSettings",
                "params": {
                    "wifi_config": [{
                        //"phy_enable": Number($('.current input[type="checkbox"]').val()), //对于开关，0是关，1是开
                        "PhyEnable": onoff, //对于开关，0是关，1是开
                        // "hwmode": parseInt($(".hwmode option:selected").text()), //可变
                        "HtMode": Number($("#HTmode").val()), //固定
                        "Channel": parseInt($(".channel option:selected").text()), //可变
                        "vap_config": [{
                            "Ssid": $(".ssid").val(), //可变
                            "SecurityMode": Number($(".EncryptionType option:selected").val()), //可变
                            "WpaKey": $(".pwd").val(), //可变

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
                    // $(document).on("click", ".cancel", function() {
                    //     $("#content select,#content input,#content button").removeAttr("disabled");
                    //     $("#onoff").prop("checked", true);
                    //     var o = $(".layui-form-switch");
                    //     o.find("em").text("ON");
                    //     o.prop("class", "layui-unselect layui-form-switch layui-form-onswitch");

                    // })
                    // if (data == "true") {
                    //     //layer.msg("状态修改成功");
                    //     active.reload();
                    // } else {

                    // }

                },
                error: function(jqXHR) {
                    console.log(JSON.stringify(jqXHR))
                    var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication, please try again later!</div>';
                    promptMessage("Error message", tip);
                }
            });

        });
    });

    $("#cancel").on("click", function() {
        $('#success').hide(1000);
        layui.use('layer', function() {
            var layer = layui.layer;
            var loading = layer.load(0, {
                shade: false
            });
            getData(layer, loading);
        });
    });

});
var frequency = 0;

function getData(layer, loading) {
    var data = {
        "jsonrpc": "2.0",
        "method": "GetWlanSettings",
        "params": {},
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
                var json = res.result.wifi_config;
                var Hzstr = ''
                for (var index in json) {
                    $('.ssid').val(json[index].vap_config[index].Ssid);
                    $('.pwd').val(json[index].vap_config[index].WpaKey);
                    $('.pwd1').val(json[index].vap_config[index].WpaKey);
                    if (json[index].HtMode == 1) {
                        Hzstr += '<option value="1" selected>20MHz</option>';
                        Hzstr += '<option value="2">40MHz</option>'
                    } else if (json[index].HtMode == 2) {
                        Hzstr += '<option value="1">20MHz</option>';
                        Hzstr += '<option value="2" selected>40MHz</option>'
                    }
                }
                $("#HTmode").html(Hzstr);

                if (json == '' || json == undefined || json == null || json.length < 1) return;
                layui.use(['form'], function() {
                    var form = layui.form;

                    for (var i = 0; i < json.length; i++) {

                        if (json[i].PhyEnable == 0) {
                            $("#content select,#content input,#content button").prop("disabled", true);
                            $("#onoff").removeAttr("checked");
                        } else {
                            $("#content select,#content input,#content button").removeAttr("disabled");
                            $("#onoff").attr("checked", "checked");
                        }
                        form.render();
                        $("#onoffFlag").show();
                        //channel
                        var optionChannel = document.createElement("option");
                        $(optionChannel).val(json[index].Channel).attr("selected", "selected");
                        $(optionChannel).text(json[index].Channel);
                        var channelArr = ['0 auto', '1 (2.412 GHz)', '2 (2.417 GHz)', '3 (2.422 GHz)', '4 (2.427 GHz)', '5 (2.432 GHz)', '6 (2.437 GHz)', '7 (2.442 GHz)', '8 (2.447 GHz)', '9 (2.452 GHz)', '10 (2.457 GHz)', '11 (2.462 GHz)']
                        for (var i = 0; i < channelArr.length; i++) {
                            var channel = "<option value=" + i + ">" + channelArr[i] + "</option>";
                            $('.channel').append(channel);
                        }
                        var channelSelected = "<option value=" + i + " selected='selected' >" + json[index].Channel + " </option>"
                        $('.channel').prepend(channelSelected);

                        var oldVal = "";

                        $('.channel').change(function() {
                            if ($(this).find("option:selected")) {
                                var _thisVal = $(this).find('option:selected').val();
                                oldVal = $(this).attr("old", _thisVal);
                                $('.channel').find("option[value=" + _thisVal + "]").show();
                                $('.channel option[value=12]').hide();
                                $('.channel option[value=0]').show();

                            }
                        })
                        if (json[index].Channel == 11) {
                            $('.channel option:selected').text(channelArr[11]);
                            $('.channel option:selected').hide();
                            $('.channel option[value=11]').attr("selected", "selected");
                        }
                        if (json[index].Channel == 10) {
                            $('.channel option:selected').text(channelArr[10]);
                            $('.channel option:selected').hide();
                            $('.channel option[value=10]').attr("selected", "selected");
                        }
                        if (json[index].Channel == 9) {
                            $('.channel option:selected').text(channelArr[9]);
                            $('.channel option:selected').hide();
                            $('.channel option[value=9]').attr("selected", "selected");
                        }
                        if (json[index].Channel == 8) {
                            $('.channel option:selected').text(channelArr[8]);
                            $('.channel option:selected').hide();
                            $('.channel option[value=8]').attr("selected", "selected");
                        }
                        if (json[index].Channel == 7) {
                            $('.channel option:selected').text(channelArr[7]);
                            $('.channel option:selected').hide();
                            $('.channel option[value=7]').attr("selected", "selected");
                        }
                        if (json[index].Channel == 6) {
                            $('.channel option:selected').text(channelArr[6]);
                            $('.channel option:selected').hide();
                            $('.channel option[value=6]').attr("selected", "selected");
                        }
                        if (json[index].Channel == 5) {
                            $('.channel option:selected').text(channelArr[5]);
                            $('.channel option:selected').hide();
                            $('.channel option[value=5]').attr("selected", "selected");
                        }
                        if (json[index].Channel == 4) {
                            $('.channel option:selected').text(channelArr[4]);
                            $('.channel option:selected').hide();
                            $('.channel option[value=4]').attr("selected", "selected");
                        }
                        if (json[index].Channel == 3) {
                            $('.channel option:selected').text(channelArr[3]);
                            $('.channel option:selected').hide();
                            $('.channel option[value=3]').attr("selected", "selected");
                        }
                        if (json[index].Channel == 2) {
                            $('.channel option:selected').text(channelArr[2]);
                            $('.channel option:selected').hide();
                            $('.channel option[value=2]').attr("selected", "selected");
                        }
                        if (json[index].Channel == 1) {
                            $('.channel option:selected').text(channelArr[1]);
                            $('.channel option:selected').hide();
                            $('.channel option[value=1]').attr("selected", "selected");
                        }
                        if (json[index].Channel == 0) {
                            $('.channel option:selected').text(channelArr[0]);
                            $('.channel option:selected').hide();
                            $('.channel option[value=0]').attr("selected", "selected");
                        }
                        if (!json[index].Channel) {
                            $('.channel option:selected').text(channelArr[0]);
                            $('.channel option[value=0]').hide();
                        }


                        //hwmode
                        var optionHWMode = document.createElement("option");
                        $(optionHWMode).val(json[index].HtMode).attr("selected", "selected");
                        $(optionHWMode).text(json[index].HtMode);
                        var hwmodeArr = ['0 auto', '1 (802.11b)', '2 (802.11g)', '3 (802.11g+n)'];
                        for (var i = 0; i < hwmodeArr.length; i++) {
                            var hwmode = "<option value=" + i + ">" + hwmodeArr[i] + "</option>";
                            $('.hwmode').append(hwmode);
                        }
                        var hwmodeSelected = "<option value=" + i + " selected='selected'>" + json[index].HtMode + " </option>"
                        $('.hwmode').append(hwmodeSelected);

                        $('.hwmode').change(function() {
                            if ($(this).find("option:selected")) {
                                var _thisVal = $(this).find('option:selected').val();
                                oldVal = $(this).attr("old", _thisVal);
                                $('.hwmode').find("option[value=" + _thisVal + "]").show()
                                $('.hwmode option:last').hide();
                                $('.hwmode option[value=0]').show();
                            }
                        })

                        if (json[index].HtMode == 3) {
                            $('.hwmode option:selected').text(hwmodeArr[3]);
                            $('.hwmode option:selected').hide();
                            $('.hwmode option[value=3]').attr("selected", "selected");
                        }

                        if (json[index].HtMode == 2) {
                            $('.hwmode option:selected').text(hwmodeArr[2]);
                            $('.hwmode option:selected').hide();
                            $('.hwmode option[value=2]').attr("selected", "selected");
                        }

                        if (json[index].HtMode == 1) {
                            $('.hwmode option:selected').text(hwmodeArr[1]);
                            $('.hwmode option:selected').hide();
                            $('.hwmode option[value=1]').attr("selected", "selected");
                        }

                        if (json[index].HtMode == 0) {
                            $('.hwmode option:selected').text(hwmodeArr[0]);
                            $('.hwmode option:selected').hide();
                            $('.hwmode option[value=0]').attr("selected", "selected");
                        }

                        if (!json[index].HtMode) {
                            $('.hwmode option:selected').text(hwmodeArr[0]);
                            $('.hwmode option[value=0]').hide();
                        }

                        //EncryptionType
                        var optionEncryptionType = document.createElement("option");
                        $(optionEncryptionType).val(json[index].vap_config[index].SecurityMode).attr("selected", "selected");
                        $(optionEncryptionType).text(json[index].vap_config[index].SecurityMode);
                        var encryptionTypeArr = ['No Encryption', 'WPA-PSA', 'WPA2-PSA', 'WPA-PSK/WPA2-PSK Mixed'];
                        for (var i = 0; i < encryptionTypeArr.length; i++) {
                            var EncryptionType = "<option value=" + i + ">" + encryptionTypeArr[i] + "</option>";
                            $('.EncryptionType').append(EncryptionType);

                        }
                        var encryptionTypeSelected = "<option value=" + i + " selected='selected'>" + json[index].vap_config[index].SecurityMode + " </option>"
                        $('.EncryptionType').append(encryptionTypeSelected);

                        if (json[index].vap_config[index].SecurityMode == 4) {
                            $('.EncryptionType option:selected').text(encryptionTypeArr[3]);
                            $('.EncryptionType option:selected').hide();
                            $('.EncryptionType option[value=4]').attr("selected", "selected");
                        }
                        if (json[index].vap_config[index].SecurityMode == 3) {

                            $('.EncryptionType option:selected').hide();
                            $('.EncryptionType option[value=3]').attr("selected", "selected");
                        }
                        if (json[index].vap_config[index].SecurityMode == 2) {
                            $('.EncryptionType option:selected').text(encryptionTypeArr[2]);
                            $('.EncryptionType option:selected').hide();
                            $('.EncryptionType option[value=2]').attr("selected", "selected");
                        }
                        if (json[index].vap_config[index].SecurityMode == 1) {
                            $('.EncryptionType option:selected').text(encryptionTypeArr[1]);
                            $('.EncryptionType option:selected').hide();
                            $('.EncryptionType option[value=1]').attr("selected", "selected");
                        }
                        if (json[index].vap_config[index].SecurityMode == 0) {
                            $('.EncryptionType option:selected').text(encryptionTypeArr[0]);
                            $('.EncryptionType option:selected').hide();
                            $('.EncryptionType option[value=0]').attr("selected", "selected");
                        }


                    }
                });

                $("#content ul").eq(0).show();

                $('#EncryptionType').change(function() {

                    if (this.value == "4") {
                        $("#pwd").show();
                        //     //$(".pwd").val("");
                    } else if (this.value == "0") {
                        $("#pwd").hide();
                    } else {
                        $("#pwd").show();
                    }

                })

                if (json[index].vap_config[index].SecurityMode == "1") {
                    console.log($(".pwd1").val())

                    $("#pwd").show();
                    //$("#pwd1").show();
                    for (var index in json) {
                        $('.pwd').val(json[index].vap_config[index].WpaKey);
                    }
                    //$(".pwd").val("");
                }
                if (json[index].vap_config[index].SecurityMode == "2") {
                    $("#pwd").show();
                    $("#pwd1").hide();
                    $('.pwd').val(json[index].vap_config[index].WpaKey)
                    $(".pwd1").val("");
                    //console.log($('#EncryptionType option[value=2]').text())
                }
                if (json[index].vap_config[index].SecurityMode == "3") {
                    $("#pwd").show();
                    $("#pwd1").hide();
                    $('.pwd').val(json[index].vap_config[index].WpaKey)
                    $(".pwd1").val("");
                }
                if (json[index].vap_config[index].SecurityMode == "4") {
                    $("#pwd").show();
                    $("#pwd1").hide();
                    $('.pwd').val(json[index].vap_config[index].WpaKey)
                    $(".pwd1").val("");
                }
                if (json[index].vap_config[index].SecurityMode == "0") {
                    $("#pwd").hide();
                    $("#pwd1").hide();

                }

            } else {
                layer.msg("An error occurred：" + res.error.message);
            }
        },
        error: function(jqXHR) {
            console.log(JSON.stringify(jqXHR))
            frequency++;
            if (frequency < 3) {
                setTimeout(() => {
                    getData(layer, loading)
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

function APsave() {
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


    layui.use(['form'], function() {
        var form = layui.form;
        form.render();
    })
    var select = $("#EncryptionType").val();
    var WpaKey = $(".pwd").val();
    var len = $("#pw").val().length;
    if ($("#EncryptionType").val() != 0) {
        if (len <= 8) {
            $(".len-tip")
                .text('Please enter a password with more than 8 digits!')
            return;
        }
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
    $.ajax({
        type: "post",
        url: "/action/action",
        data: data,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function(res) {
            if (res.result) {
                ejectTip();
            } else {
                $("#error").text(res.error.message)
                $("#error").show(1000).delay(6000).hide(0);
            }

        },
        error: function(jqXHR) {
            console.log(JSON.stringify(jqXHR))
            var tip = '<div style="padding: 20px;text-align: center;word-wrap:break-word;">Abnormal communication, please try again later!</div>';
            promptMessage("Error message", tip);
        }
    });

}

function ejectTip() {

    var loading = parent.layer.msg('Waiting for changes to be applied...', {
        icon: 16,
        time: false,
        shade: [0.5, '#fff'],
        success: function(layero, index) {
            var msg = layero.text();
            console.log(msg)
            var i = 10;
            var timer = null;
            var fn = function() {
                layero.find(".layui-layer-content").html(
                    '<i class="layui-layer-ico layui-layer-ico16"></i>' + msg + '(' + i +
                    's)');
                if (!i) {
                    parent.layer.close(index);
                    clearInterval(timer);
                    $('#success').show(1000).delay(6000).hide(0);
                }
                i--;
            };
            timer = setInterval(fn, 1000);
            fn();
        },
    });

}